import { MapPin, Navigation } from "lucide-react";
import { invitationData } from "../data/invitationData";
import { SectionShell } from "./SectionShell";

export function VenueSection() {
  return (
    <SectionShell id="venue" label={invitationData.venue.label}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="text-center lg:text-left">
          <h2 className="font-display text-3xl font-semibold tracking-[0.16em] text-emerald sm:text-5xl">
            {invitationData.venue.name}
          </h2>
          <p className="mt-5 font-serif text-3xl text-ink-brown">
            {invitationData.venue.floor}
          </p>
          <p className="mt-2 font-body text-lg text-ink-brown/75">
            {invitationData.venue.area}
          </p>
          <a
            href={invitationData.venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold/60 bg-emerald px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-ivory shadow-gold transition hover:-translate-y-0.5 hover:bg-ink-brown focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
            aria-label="Open venue location in Google Maps"
          >
            <Navigation size={17} aria-hidden="true" />
            Open in Google Maps
          </a>
        </div>

        <div className="map-card" aria-label="Stylized map for Lee Meridien Banquet Hall">
          <div className="map-grid" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-emerald text-gold shadow-[0_0_0_14px_rgba(201,162,77,0.16)]">
            <MapPin size={30} fill="currentColor" aria-hidden="true" />
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-md border border-gold/30 bg-ivory/90 p-4 text-left shadow-glow backdrop-blur">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-deep-gold">
              Lee Meridien Banquet Hall
            </p>
            <p className="mt-1 font-body text-sm text-ink-brown/75">
              Ground Floor · Sainthamaruthu
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
