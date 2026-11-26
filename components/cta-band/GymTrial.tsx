// GymTrial: the real-life CtaBand example.
//
// What it shows: the call to action at the end of a gym's page: a free first month, a primary action that signs up, a
// second action that calls the gym, and a short note with the small print.
// When to use this pattern: the last block of a landing page. Keep one primary action first (the first action is the
// primary one) and a quieter secondary one; `note` carries what removes the visitor's doubts (no card, branches).
// Animation: the panel scales in when it scrolls into view, on the motion engine (reduced motion, the global speed
// and "Stop all" apply); pass reveal="none" to turn the entrance off.
import { CtaBand } from "march/landing"
import { toast } from "march/ui"
import { arrowRight, phone } from "march/icons"

export function GymTrial() {
  // variant="gradient" is the default look (brand colours). Each action is an object: label, an icon at the start (icon) or
  // the end (iconEnd), href for a link (here a phone link, tel:), variant for its weight, onClick for a handler.
  return <CtaBand variant="gradient" title="İlk ay bizden"
    lead="Ekipman, grup dersleri ve havuz dahil. Sözleşme yok, istediğin an bırak."
    actions={[
      { label: "Ücretsiz dene", iconEnd: arrowRight, onClick: () => toast("Deneme üyeliğin oluşturuldu") },
      { label: "Bizi ara", icon: phone, href: "tel:+902120000000", variant: "secondary" },
    ]}
    note="Kart bilgisi istemiyoruz · Kadıköy ve Beşiktaş şubeleri" />
}
