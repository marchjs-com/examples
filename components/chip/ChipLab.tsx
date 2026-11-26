// ChipLab: the full-featured Chip example; it uses every prop at least once.
//
// Props shown here: tone (six tones), size, icon, selected + onClick (a toggle), selectedIcon (true, false or your own
// icon), onRemove, removeLabel, removeIcon, class, children (a long label scrolls to be read) and the common props
// m:color and m:theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ChipLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Chip, Card } from "march/ui"
import { star, heart, trash, sparkles, bell } from "march/icons"

const tones = ["neutral", "primary", "success", "warn", "danger", "info"] as const

// A layout helper: a caption above, the chips below in a wrapping row. Only the Lab uses it.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function ChipLab() {
  // $on: the names of the selected toggle chips (a Set, replaced with a new Set so the view updates);
  // $tags: the removable tags; $clicks: how often the plain button chip was pressed.
  let $on = new Set(["Yıldızlı"])
  let $tags = ["Tasarım", "Ürün", "Pazarlama"]
  let $clicks = 0
  const toggle = (x: string) => { const n = new Set($on); if (n.has(x)) n.delete(x); else n.add(x); $on = n }
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* tone: the colour family: neutral (default), primary, success, warn, danger, info. */}
    <Row title="Ton">{tones.map((t) => <Chip tone={t}>{t}</Chip>)}</Row>
    {/* size="sm" is the small chip (the default is md); icon is a leading icon; class is added to the chip element.
        A chip with onClick but no `selected` is a plain button: it is announced as a button and runs the handler. */}
    <Row title="Boyut ve ikon">
      <Chip size="sm" icon={star}>Küçük</Chip>
      <Chip icon={sparkles} class="lab-new">Yeni</Chip>
      <Chip onClick={() => $clicks++}>{`Tıklandı: ${$clicks}`}</Chip>
    </Row>
    {/* selected + onClick: a toggle chip (a filter) announced with aria-pressed. While selected, a tick replaces the
        icon. selectedIcon={heart} uses your own mark instead of the tick; selectedIcon={false} keeps `icon` as it is.
        m:color is the common prop that sets the colour token of the chip. */}
    <Row title="Aç / kapa: tik, kendi ikonun, ikon kalsın">
      <Chip selected={$on.has("Yıldızlı")} onClick={() => toggle("Yıldızlı")}>Yıldızlı</Chip>
      <Chip selected={$on.has("Beğenilen")} selectedIcon={heart} m:color="brand-pink" onClick={() => toggle("Beğenilen")}>Beğenilen</Chip>
      <Chip selected={$on.has("Bildirimli")} selectedIcon={false} icon={bell} m:color="brand-blue" onClick={() => toggle("Bildirimli")}>Bildirimli</Chip>
    </Row>
    {/* onRemove adds a separate remove button. removeLabel is its accessible name (the default is "Remove"; give each
        tag its own so a screen reader says what will be removed) and removeIcon replaces the × mark. */}
    <Row title="Kaldırılabilir: kendi adın ve ikonun">
      {$tags.map((t) => <Chip tone="primary" removeLabel={`${t} etiketini sil`} removeIcon={trash} onRemove={() => $tags = $tags.filter((x) => x !== t)}>{t}</Chip>)}
      <Chip onRemove={() => $tags = ["Tasarım", "Ürün", "Pazarlama"]}>Varsayılan × ile sıfırla</Chip>
    </Row>
    {/* A long label never wraps: it scrolls so it can be read in full. */}
    <Row title="Uzun yazı">
      <Chip icon={star}>Çok uzun bir etiket adı sığmayınca kayarak okunur</Chip>
    </Row>
    {/* m:theme="night" draws this card in the dark theme whatever the page theme is. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Chip tone="success" selected onClick={() => {}}>Seçili</Chip>
        <Chip tone="info" icon={bell}>Bilgi</Chip>
      </Row>
    </Card>
  </div>
}
