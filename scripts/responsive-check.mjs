import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9333;
const appUrl = process.env.APP_URL || "http://127.0.0.1:5173/";
const profileDir = mkdtempSync(join(tmpdir(), "nikah-invite-chrome-"));

const viewports = [
  { name: "mobile", width: 390, height: 844, scale: 2 },
  { name: "tablet", width: 768, height: 1024, scale: 1 },
  { name: "desktop", width: 1440, height: 900, scale: 1 },
];

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profileDir}`,
    `--remote-debugging-port=${port}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(path, init) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`, init);
  if (!response.ok) {
    throw new Error(`Chrome debugging endpoint failed: ${response.status}`);
  }
  return response.json();
}

async function waitForChrome() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      await getJson("/json/version");
      return;
    } catch {
      await wait(250);
    }
  }

  throw new Error("Chrome did not expose the debugging endpoint in time.");
}

function createClient(socketUrl) {
  const socket = new WebSocket(socketUrl);
  let id = 0;
  const pending = new Map();
  const eventWaiters = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }

    if (message.method && eventWaiters.has(message.method)) {
      const waiters = eventWaiters.get(message.method);
      eventWaiters.delete(message.method);
      waiters.forEach((resolve) => resolve(message.params));
    }
  });

  const opened = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  return {
    async send(method, params = {}) {
      await opened;
      const messageId = (id += 1);
      socket.send(JSON.stringify({ id: messageId, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(messageId, { resolve, reject });
      });
    },
    waitForEvent(method) {
      return new Promise((resolve) => {
        const waiters = eventWaiters.get(method) || [];
        waiters.push(resolve);
        eventWaiters.set(method, waiters);
      });
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });

  return result.result.value;
}

async function runViewport(viewport) {
  let tab;
  try {
    tab = await getJson(`/json/new?${encodeURIComponent(appUrl)}`, {
      method: "PUT",
    });
  } catch {
    tab = await getJson(`/json/new?${encodeURIComponent(appUrl)}`);
  }

  const client = createClient(tab.webSocketDebuggerUrl);
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.scale,
    mobile: viewport.name === "mobile",
  });

  const loaded = client.waitForEvent("Page.loadEventFired");
  await client.send("Page.navigate", { url: appUrl });
  await loaded;
  await wait(700);

  const opening = await evaluate(
    client,
    `(() => ({
      width: innerWidth,
      height: innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      bodyOverflow: getComputedStyle(document.body).overflow,
      hasMain: Boolean(document.querySelector('main')),
      hasOpenButton: Boolean(document.querySelector('button[aria-label="Open the Nikah invitation"]'))
    }))()`,
  );

  if (opening.hasMain) {
    throw new Error(`${viewport.name}: invitation content rendered behind opening screen.`);
  }

  if (opening.bodyOverflow !== "hidden") {
    throw new Error(`${viewport.name}: body scroll is not locked on opening screen.`);
  }

  if (opening.scrollWidth > opening.width) {
    throw new Error(`${viewport.name}: opening screen has horizontal overflow.`);
  }

  if (!opening.hasOpenButton) {
    throw new Error(`${viewport.name}: opening button is missing.`);
  }

  await evaluate(
    client,
    `document.querySelector('button[aria-label="Open the Nikah invitation"]').click()`,
  );
  await wait(2200);

  const invitation = await evaluate(
    client,
    `(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyOverflow: getComputedStyle(document.body).overflow,
      hasMain: Boolean(document.querySelector('main')),
      portraitCount: document.querySelectorAll('.portrait-frame img, img[src*="placeholder"]').length,
      floralCount: document.querySelectorAll('img[src*="jasmine-spray"], img[src*="floral-corner"]').length,
      hasMusicToggle: Boolean(document.querySelector('button[aria-label*="background music"]'))
    }))()`,
  );

  if (!invitation.hasMain) {
    throw new Error(`${viewport.name}: invitation content did not render after opening.`);
  }

  if (invitation.scrollWidth > invitation.width) {
    throw new Error(`${viewport.name}: invitation has horizontal overflow.`);
  }

  if (invitation.portraitCount !== 0) {
    throw new Error(`${viewport.name}: couple portrait placeholders should not render.`);
  }

  if (invitation.floralCount < 2) {
    throw new Error(`${viewport.name}: floral ornaments are missing after opening.`);
  }

  if (invitation.hasMusicToggle === false) {
    throw new Error(`${viewport.name}: music toggle is missing after opening.`);
  }

  client.close();
  return { viewport: viewport.name, opening, invitation };
}

try {
  await waitForChrome();
  const results = [];

  for (const viewport of viewports) {
    results.push(await runViewport(viewport));
  }

  console.table(
    results.map((result) => ({
      viewport: result.viewport,
      openingScrollWidth: result.opening.scrollWidth,
      invitationScrollWidth: result.invitation.scrollWidth,
      width: result.invitation.width,
      portraits: result.invitation.portraitCount,
      florals: result.invitation.floralCount,
    })),
  );
} finally {
  try {
    chrome.kill();
  } catch {
    // Chrome may already be closed when the checks finish.
  }

  await wait(750);

  try {
    rmSync(profileDir, { recursive: true, force: true });
  } catch {
    // Windows can keep profile files locked briefly after headless Chrome exits.
  }
}
