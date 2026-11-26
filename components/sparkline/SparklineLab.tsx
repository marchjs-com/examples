// SparklineLab: the full-featured Sparkline example; it uses every prop at least once.
//
// Props shown here: data (numbers or objects, as an array, a signal or a function), y, width, height, format, zero, area, dot,
// color, colors, title and empty.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SparklineLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Sparkline } from "march/charts"
import { Button, Card } from "march/ui"

// Rows as objects: the Sparkline reads one value from each through its `y` prop.
const visits = [{ gun: 1, ziyaret: 40 }, { gun: 2, ziyaret: 55 }, { gun: 3, ziyaret: 48 }, { gun: 4, ziyaret: 70 }]

export function SparklineLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it. $nums is the data of the first line;
  // $empty empties it.
  let $nums = [3, 5, 4, 8, 6, 9]
  let $empty = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Two buttons change the data of the first line: one appends a value, the other empties it and brings it back. The
        classes let the tests find them. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-add" size="sm" on:click={() => { $nums = [...$nums, ($nums.length * 7) % 11] }}>Değer ekle</Button>
      <Button class="lab-empty" size="sm" variant="ghost" on:click={() => { $empty = !$empty }}>Boşalt / geri getir</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* The first line:
          - data as a function: the line follows the signals it reads (here the values and the empty switch).
          - width and height: the size in px (the default is 120 by 32).
          - zero: includes 0 in the value range.
          - area: fills under the line. format: how a value is written in the accessible summary (here with a unit).
          - title: the accessible name, read before the summary. empty: the text used when there is no data (default
            "No data").
          The span around it only gives the tests a handle. */}
      <span class="lab-nums"><Sparkline data={() => ($empty ? [] : $nums)} width={180} height={48} zero area format={(v: number) => `${v} adet`} title="Satış" empty="Satış yok" /></span>
      {/* Objects as data: y="ziyaret" names the field to read from each row (it may also be a getter function). dot={false}
          removes the marker on the last point (it is on by default). color={2} picks slot 2 of the chart palette. */}
      <span class="lab-obj"><Sparkline data={visits} y="ziyaret" dot={false} color={2} width={120} height={32} title="Ziyaret" /></span>
      {/* colors overrides the palette with your own colours (here one hex colour). */}
      <Sparkline data={[1, 4, 2, 5]} colors={["#f2801f"]} title="Turuncu" />
    </div>
    {/* m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme. */}
    <Card m:theme="night">
      <Sparkline data={() => $nums} width={240} height={56} area color={3} title="Koyu zeminde" />
    </Card>
  </div>
}
