import { Card, Kbd, SectionLabel } from "march/ui"

// bir uygulamanın "Klavye kısayolları" penceresi: bölümler, her satırda ne yaptığı ve tuşları
interface Shortcut { what: string; keys?: string; text?: string }

const groups: { title: string; items: Shortcut[] }[] = [
  { title: "Genel", items: [{ what: "Komut paleti", keys: "mod+k" }, { what: "Ara", keys: "mod+f" }, { what: "Pencereyi kapat", text: "Esc" }] },
  { title: "Düzenleme", items: [{ what: "Geri al", keys: "mod+z" }, { what: "Yinele", keys: "mod+shift+z" }, { what: "Kaydet", keys: "mod+s" }] },
]

// tek satır: solda açıklama, sağda tuş (kısayol dizisi ya da düz metin)
const Row = (props: { item: Shortcut }) => <div sx={{ flex: ["row", "between"], py: 1 }}>
  <span>{props.item.what}</span>
  {props.item.keys ? <Kbd keys={props.item.keys} /> : <Kbd>{props.item.text}</Kbd>}
</div>

export function ShortcutSheet() {
  return <Card title="Klavye kısayolları">
    <div sx={{ flex: "col", gap: 2 }}>
      {groups.map((g) => <div>
        <SectionLabel count={g.items.length}>{g.title}</SectionLabel>
        {g.items.map((it) => <Row item={it} />)}
      </div>)}
    </div>
  </Card>
}
