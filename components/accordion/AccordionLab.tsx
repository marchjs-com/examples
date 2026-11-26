// AccordionLab: the full-featured Accordion example; it uses every prop at least once.
//
// Props shown here: items (id, title, subtitle, icon, content, disabled), multiple, open, variant, chevron (your own
// mark, a function, or none), animated, onToggle, class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// AccordionLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Accordion } from "march/ui"
import { Icon, user, bell, lock, plus, minus } from "march/icons"

export function AccordionLab() {
  // The last onToggle event as text, so you can see the callback fire.
  let $log = "henüz yok"
  // Items of a settings page. `id` is what open={[…]} and onToggle use; without it they use the index.
  // `disabled: true` keeps the header visible but not clickable (the test checks this).
  const items = [
    { id: "profil", title: "Profil", subtitle: "Ad, fotoğraf", icon: user, content: "Adınızı ve fotoğrafınızı değiştirin." },
    { id: "bildirim", title: "Bildirimler", subtitle: "E-posta, anlık", icon: bell, content: "Hangi olaylarda haber verilsin?" },
    { id: "guvenlik", title: "Güvenlik", icon: lock, content: "İki adımlı doğrulama", disabled: true },
  ]
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* The first Accordion:
        - multiple: several sections may stay open (without it, opening one closes the others).
        - open={["profil", "bildirim"]}: both start open, given by id.
        - variant="contained": one framed list instead of separate cards.
        - class="lab-acc": added to the root (.m-accordion), so your CSS or a test can find this instance; the parts
          have their own classes (.m-acc-btn, .m-acc-body, .m-acc-chev…).
        - chevron as a function: you draw the header's mark yourself. `open` is an accessor (call it: open()), so the
          inner function child redraws the icon when the section opens or closes: here a plus / minus instead of the
          default turning arrow. chevron={plus} would use an icon that turns; chevron={false} draws nothing.
        - onToggle(key, open): called on every open / close with the item's id (or index). */}
    <Accordion items={items} multiple open={["profil", "bildirim"]} variant="contained" class="lab-acc"
      chevron={(open: () => boolean) => <span>{() => <Icon of={open() ? minus : plus} />}</span>}
      onToggle={(k: string | number, open: boolean) => $log = `${k} ${open ? "açıldı" : "kapandı"}`} />
    <span sx={{ text: "sm", color: "muted" }}>Son olay: {$log}</span>
    {/* The second Accordion shows the "off" switches:
        - chevron={false}: no mark at the end of the headers.
        - animated={false}: panels open at once, nothing moves. You rarely need this: with animation on, the motion
          engine already honours reduced motion and the global speed / pause settings. Use it where motion is never
          wanted (dense admin screens, print views).
        - m:color="brand-purple": a common prop (it works on every component) that sets the colour token of the
          component and everything inside it. */}
    <Accordion items={items.slice(0, 2)} chevron={false} animated={false} m:color="brand-purple" />
  </div>
}
