import { Sparkline } from "march/charts"
import { Button, Card } from "march/ui"

// Sparkline'ın bütün özellikleri: data (sayılar ya da nesneler, sinyal), y, width, height, format, zero, area, dot,
// color, colors, title, empty
const visits = [{ gun: 1, ziyaret: 40 }, { gun: 2, ziyaret: 55 }, { gun: 3, ziyaret: 48 }, { gun: 4, ziyaret: 70 }]

export function SparklineLab() {
  let $nums = [3, 5, 4, 8, 6, 9]
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-add" size="sm" on:click={() => { $nums = [...$nums, ($nums.length * 7) % 11] }}>Değer ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      <span class="lab-nums"><Sparkline data={() => ($empty ? [] : $nums)} width={180} height={48} zero area format={(v: number) => `${v} adet`} title="Satış" empty="Satış yok" /></span>
      <span class="lab-obj"><Sparkline data={visits} y="ziyaret" dot={false} color={2} width={120} height={32} title="Ziyaret" /></span>
      <Sparkline data={[1, 4, 2, 5]} colors={["#f2801f"]} title="Turuncu" />
    </div>
    <Card m:theme="night">
      <Sparkline data={() => $nums} width={240} height={56} area color={3} title="Koyu zeminde" />
    </Card>
  </div>
}
