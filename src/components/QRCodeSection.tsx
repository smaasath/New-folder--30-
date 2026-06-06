import { useState } from "react";
import { invitationData } from "../data/invitationData";
import { SectionShell } from "./SectionShell";

export function QRCodeSection() {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <SectionShell id="qr" label={invitationData.qr.label} className="bg-cream/35">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-serif text-2xl leading-relaxed text-ink-brown">
          {invitationData.qr.text}
        </p>
        <div className="mx-auto mt-9 grid h-64 w-64 place-items-center rounded-lg border border-gold/55 bg-ivory p-5 shadow-gold">
          {imageMissing ? (
            <div className="grid h-full w-full place-items-center rounded-md border border-dashed border-gold/60 bg-[linear-gradient(45deg,rgba(201,162,77,0.14)_25%,transparent_25%,transparent_75%,rgba(201,162,77,0.14)_75%),linear-gradient(45deg,rgba(201,162,77,0.14)_25%,transparent_25%,transparent_75%,rgba(201,162,77,0.14)_75%)] bg-[length:26px_26px] bg-[position:0_0,13px_13px] font-display text-sm font-semibold uppercase tracking-[0.22em] text-deep-gold">
              QR Code
            </div>
          ) : (
            <img
              src={invitationData.qr.imagePath}
              alt="QR code for this Nikah invitation"
              className="h-full w-full object-contain"
              loading="lazy"
              onError={() => setImageMissing(true)}
            />
          )}
        </div>
      </div>
    </SectionShell>
  );
}
