// BakeryNav: the real-life SiteNav example.
//
// What it shows: a bakery's site with a floating glass menu bar at the top and three sections below. In-page links
// scroll to their section, and the link of the section you chose is marked as the current one.
// When to use this pattern: a one-page marketing site. Below 860 px the links move into a Drawer opened by a menu
// button, so the same code covers phones.
import { SiteNav } from "march/landing"
import { Button, toast } from "march/ui"
import { coffee, shoppingBag } from "march/icons"

// The sections: the id is the anchor the link points to. In-page links (#id) scroll to their section themselves.
const SECTIONS = [
  { id: "firin-menu", label: "Menü", text: "Simit, poğaça, ekşi mayalı ekmek: her sabah 06.00'da fırından." },
  { id: "firin-subeler", label: "Şubeler", text: "Moda, Kadıköy ve Cihangir'de." },
  { id: "firin-hakkimizda", label: "Hakkımızda", text: "1974'ten beri aynı taş fırın." },
]

export function BakeryNav() {
  // `let $at` is a March signal holding the href of the current link; onNavigate writes it.
  let $at = "#firin-menu"
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* SiteNav options used here:
        - mode="floating": a centred glass pill instead of a full-width bar ("solid" is the default, "transparent" starts
          see-through over a hero).
        - brand: { name, mark, sub }: the name, an icon and a small line.
        - pillColor: the colour token of the pill that slides under the hovered link and rests on the current one.
        - links: { label, href, active } objects. `active` is a function: the link it returns true for gets
          aria-current="page" and the pill rests on it.
        - onNavigate(href): called when a link is chosen; here it records the choice for `active`.
        - actions: any nodes shown at the end of the bar (and in the drawer on narrow screens).
        The bar is a header with a nav named "Main"; the menu button is labelled and opens a Drawer (focus trapped, Escape
        closes it). Shrinking and the pill's slide run on the motion engine and follow reduced motion. */}
    <SiteNav mode="floating" brand={{ name: "Fırın Kemal", mark: coffee, sub: "1974" }} pillColor="brand-orange"
      links={SECTIONS.map((s) => ({ label: s.label, href: `#${s.id}`, active: () => $at === `#${s.id}` }))}
      onNavigate={(href: string) => $at = href}
      actions={<><Button variant="ghost" size="sm">Giriş</Button><Button size="sm" icon={shoppingBag} on:click={() => toast("Sepet açıldı")}>Sipariş ver</Button></>} />
    {/* The sections the links point to; each id matches a link's href. */}
    {SECTIONS.map((s) => <section id={s.id} sx={{ p: 4 }}>
      <h3>{s.label}</h3>
      <p sx={{ color: "muted" }}>{s.text}</p>
    </section>)}
  </div>
}
