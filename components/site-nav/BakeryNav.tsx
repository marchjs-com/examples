import { SiteNav } from "march/landing"
import { Button, toast } from "march/ui"
import { coffee, shoppingBag } from "march/icons"

// bir fırının sitesi: üstte yüzen menü, altta bölümler; bağlantılar bölüme kayar, geçerli bölüm işaretli
const SECTIONS = [
  { id: "firin-menu", label: "Menü", text: "Simit, poğaça, ekşi mayalı ekmek: her sabah 06.00'da fırından." },
  { id: "firin-subeler", label: "Şubeler", text: "Moda, Kadıköy ve Cihangir'de." },
  { id: "firin-hakkimizda", label: "Hakkımızda", text: "1974'ten beri aynı taş fırın." },
]

export function BakeryNav() {
  let $at = "#firin-menu"
  return <div sx={{ flex: "col", gap: 4 }}>
    <SiteNav mode="floating" brand={{ name: "Fırın Kemal", mark: coffee, sub: "1974" }} pillColor="brand-orange"
      links={SECTIONS.map((s) => ({ label: s.label, href: `#${s.id}`, active: () => $at === `#${s.id}` }))}
      onNavigate={(href: string) => $at = href}
      actions={<><Button variant="ghost" size="sm">Giriş</Button><Button size="sm" icon={shoppingBag} on:click={() => toast("Sepet açıldı")}>Sipariş ver</Button></>} />
    {SECTIONS.map((s) => <section id={s.id} sx={{ p: 4 }}>
      <h3>{s.label}</h3>
      <p sx={{ color: "muted" }}>{s.text}</p>
    </section>)}
  </div>
}
