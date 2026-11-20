import { Chip, Card } from "march/ui"
import { star, heart, trash, sparkles, bell } from "march/icons"

// Chip'in bütün özellikleri: tone (altı ton), size, icon, selected + onClick (aç / kapa), selectedIcon (true, false,
// kendi ikonun), onRemove, removeLabel, removeIcon, class, children (uzun yazı kayarak okunur) ve ortak m:color, m:theme
const tones = ["neutral", "primary", "success", "warn", "danger", "info"] as const

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function ChipLab() {
  let $on = new Set(["Yıldızlı"])
  let $tags = ["Tasarım", "Ürün", "Pazarlama"]
  let $clicks = 0
  const toggle = (x: string) => { const n = new Set($on); if (n.has(x)) n.delete(x); else n.add(x); $on = n }
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Ton">{tones.map((t) => <Chip tone={t}>{t}</Chip>)}</Row>
    <Row title="Boyut ve ikon">
      <Chip size="sm" icon={star}>Küçük</Chip>
      <Chip icon={sparkles} class="lab-new">Yeni</Chip>
      <Chip onClick={() => $clicks++}>{`Tıklandı: ${$clicks}`}</Chip>
    </Row>
    <Row title="Aç / kapa: tik, kendi ikonun, ikon kalsın">
      <Chip selected={$on.has("Yıldızlı")} onClick={() => toggle("Yıldızlı")}>Yıldızlı</Chip>
      <Chip selected={$on.has("Beğenilen")} selectedIcon={heart} m:color="brand-pink" onClick={() => toggle("Beğenilen")}>Beğenilen</Chip>
      <Chip selected={$on.has("Bildirimli")} selectedIcon={false} icon={bell} m:color="brand-blue" onClick={() => toggle("Bildirimli")}>Bildirimli</Chip>
    </Row>
    <Row title="Kaldırılabilir: kendi adın ve ikonun">
      {$tags.map((t) => <Chip tone="primary" removeLabel={`${t} etiketini sil`} removeIcon={trash} onRemove={() => $tags = $tags.filter((x) => x !== t)}>{t}</Chip>)}
      <Chip onRemove={() => $tags = ["Tasarım", "Ürün", "Pazarlama"]}>Varsayılan × ile sıfırla</Chip>
    </Row>
    <Row title="Uzun yazı">
      <Chip icon={star}>Çok uzun bir etiket adı sığmayınca kayarak okunur</Chip>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Chip tone="success" selected onClick={() => {}}>Seçili</Chip>
        <Chip tone="info" icon={bell}>Bilgi</Chip>
      </Row>
    </Card>
  </div>
}
