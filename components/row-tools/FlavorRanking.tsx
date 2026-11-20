import { RowTools, Card } from "march/ui"

// dondurma sıralaman: tatları tutamaktan sürükleyerek ya da oklarla sırala; birinci altın renginde ve büyük yazılır
export function FlavorRanking() {
  let $list = ["Fıstıklı", "Vişneli", "Limonlu", "Karamelli"]
  const move = (i: number, d: number) => { const n = [...$list]; [n[i], n[i + d]] = [n[i + d]!, n[i]!]; $list = n }
  const reorder = (from: number, to: number) => { const n = [...$list]; const [x] = n.splice(from, 1); n.splice(to, 0, x!); $list = n }
  return <Card m:theme="night" title="Dondurma sıralaman">
    <ol sx={{ flex: "col", gap: 2 }}>
      {$list.map((name, i) => <li sx={{ flex: ["row", "between", "center"], gap: 2 }}>
        <span sx={{ text: i === 0 ? "xl" : "md", color: i === 0 ? "brand-gold" : "muted" }}>{i + 1}. {name}</span>
        <RowTools actions={["drag", "up", "down"]} onReorder={reorder} index={i} count={$list.length} size="sm"
          labels={{ up: `${name} yukarı`, down: `${name} aşağı` }} onUp={() => move(i, -1)} onDown={() => move(i, 1)} />
      </li>)}
    </ol>
  </Card>
}
