import { invitationData } from "../data/invitationData";
import { SectionShell } from "./SectionShell";

export function FamiliesSection() {
  return (
    <SectionShell id="families" label={invitationData.families.label}>
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <FamilyCard
          title={invitationData.families.groomTitle}
          members={invitationData.families.groomMembers}
        />
        <div className="hidden w-px bg-gradient-to-b from-transparent via-gold to-transparent lg:block" aria-hidden="true" />
        <FamilyCard
          title={invitationData.families.brideTitle}
          members={invitationData.families.brideMembers}
        />
      </div>
    </SectionShell>
  );
}

function FamilyCard({ title, members }: { title: string; members: string[] }) {
  return (
    <article className="lux-card relative min-h-64 overflow-hidden text-center">
      <div className="corner-ornament left-4 top-4" aria-hidden="true" />
      <div className="corner-ornament bottom-4 right-4 rotate-180" aria-hidden="true" />
      <p className="panel-kicker">{title}</p>
      <div className="mt-8 space-y-4">
        {members.map((member) => (
          <p key={member} className="font-serif text-3xl text-ink-brown">
            {member}
          </p>
        ))}
      </div>
    </article>
  );
}
