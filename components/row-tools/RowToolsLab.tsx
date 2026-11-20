import { RowTools, Button, Card } from "march/ui"
import { chevronUp, chevronDown, trash } from "march/icons"

// RowTools'un bütün özellikleri bir arada: index / count (uçlarda oklar kapalı), onUp / onDown / onRemove, onAction,
// onReorder (sürükleyerek sırala; araçlar drag, up, down, remove olur),
// actions (alt küme, kendi sıram, ad metni "up down"), disabled (hepsi ya da bazıları), labels (grup adı dahil),
// icons (ikon ya da metin), size, danger, sınıf ve koyu zemin
const START = ["Elma", "Armut", "Kiraz"]
const sizes = ["xs", "sm", "md", "lg"] as const

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function RowToolsLab() {
  let $list = START
  let $last = "yok"
  let $locked = false
  const move = (i: number, d: number) => { const n = [...$list]; [n[i], n[i + d]] = [n[i + d]!, n[i]!]; $list = n }
  const remove = (i: number) => { $list = $list.filter((_, j) => j !== i) }
  const reorder = (from: number, to: number) => { const n = [...$list]; const [x] = n.splice(from, 1); n.splice(to, 0, x!); $list = n }
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Liste: index / count, olaylar, son satır silinemez, kilit">
      <ol sx={{ flex: "col", gap: 1 }}>
        {$list.map((name, i) => <li sx={{ flex: ["row", "between", "center"], gap: 2 }}>
          <span>{name}</span>
          <RowTools index={i} count={$list.length} onReorder={reorder} danger class="lab-row" disabled={$locked ? true : { remove: $list.length <= 1 }}
            labels={{ up: `${name} yukarı`, down: `${name} aşağı`, remove: `${name} sil`, group: `${name} araçları` }}
            onUp={() => move(i, -1)} onDown={() => move(i, 1)} onRemove={() => remove(i)} onAction={(a: string) => { $last = a }} />
        </li>)}
      </ol>
    </Row>
    <span>Sıra: {$list.join(", ")} · Son araç: {$last}</span>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" variant="secondary" on:click={() => { $locked = !$locked }}>{$locked ? "Kilidi aç" : "Kilitle"}</Button>
      <Button size="sm" variant="ghost" on:click={() => { $list = START }}>Geri yükle</Button>
    </div>
    <Row title="Kendi sıram (sil, yukarı) ve ad metniyle yalnız taşıma">
      <RowTools actions={["remove", "up"]} class="lab-order" labels={{ remove: "Sil", up: "Yukarı", group: "Ters sıra" }} />
      <RowTools actions="up down" class="lab-move" labels={{ up: "Taşı yukarı", down: "Taşı aşağı", group: "Yalnız taşıma" }} />
    </Row>
    <Row title="Kendi ikonlarım ve metin">
      <RowTools icons={{ up: chevronUp, down: chevronDown, remove: trash }} labels={{ group: "İkonlar" }} />
      <RowTools actions={["remove"]} icons={{ remove: "Kaldır" }} labels={{ remove: "Metinle kaldır" }} />
    </Row>
    <Row title="Boyut">{sizes.map((s) => <RowTools size={s} labels={{ group: `Boyut ${s}` }} />)}</Row>
    <Row title="Hepsi kapalı">
      <RowTools disabled class="lab-off" labels={{ group: "Kapalı araçlar" }} />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <RowTools danger icons={{ remove: trash }} labels={{ group: "Koyuda araçlar" }} />
      </Row>
    </Card>
  </div>
}
