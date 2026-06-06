# Ashrif & Hina Nikah Invitation

A premium animated Muslim Nikah invitation website built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Replaceable Assets

Place the final background music at:

```text
public/assets/bgm.mp3
```

The included placeholder music is:

```text
Autumn Sunset by Jason Shaw / Audionautix
Source: https://commons.wikimedia.org/wiki/File:Audionautix-com-ccby-autumnsunset.mp3
License: Creative Commons Attribution 3.0 Unported
Required credit: music by audionautix.com
```

Place the final printed-invitation QR image at:

```text
public/assets/qr-code.png
```

Replace the individual couple photo placeholders at:

```text
public/assets/groom-placeholder.svg
public/assets/bride-placeholder.svg
```

For real photos, you can either overwrite those files with optimized JPG/WebP images and update the extensions in `src/data/invitationData.ts`, or add new files such as `groom-photo.webp` and `bride-photo.webp` and point the `photo` fields to them.

The included `pattern.svg`, `floral-left.svg`, and `floral-right.svg` are custom local SVG assets. If you replace them with external open-source artwork, keep the files in `public/assets/` and add attribution comments near the usage or in this README.

## Editing Invitation Text

All ceremony copy, names, date, venue, RSVP text, and links are centralized in:

```text
src/data/invitationData.ts
```

## Notes

Browsers block autoplay, so the music starts only after the guest clicks **Open Invitation**. The floating music button then controls play and pause.

The RSVP form is frontend-only and saves the guest name to `localStorage`. It is ready to connect to an API later if needed.
