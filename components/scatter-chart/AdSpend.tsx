import { ScatterChart } from "march/charts"
import { Card, Segmented } from "march/ui"

// Ad spend vs. sales: a real-life ScatterChart.
// Every point is one campaign: how much was spent (x) against how much it sold (y). The points are colored by channel
// (search, social, e-mail), each channel gets its own trend line, and a target line marks the sales goal.
// Picking another quarter swaps the data and every campaign glides to its new position.
// Use a scatter chart like this when you want to see whether two numbers move together (does more spend bring more
// sales?) and which items break the pattern: a campaign far above its channel's trend line is a cheap winner.

// Campaigns per quarter (amounts in thousands of TRY). The same campaign names appear in both quarters, so on a switch
// each point keeps its identity and moves instead of disappearing and reappearing. Replace this with your own rows.
const CAMPAIGNS: Record<string, { name: string; channel: string; spend: number; sales: number }[]> = {
  q1: [
    { name: "Kış indirimi", channel: "Arama", spend: 42, sales: 310 }, { name: "Marka", channel: "Arama", spend: 18, sales: 150 },
    { name: "Yeni yıl", channel: "Sosyal", spend: 35, sales: 190 }, { name: "Hikâyeler", channel: "Sosyal", spend: 22, sales: 120 },
    { name: "Bülten", channel: "E-posta", spend: 6, sales: 95 }, { name: "Sepet hatırlatma", channel: "E-posta", spend: 4, sales: 80 },
    { name: "Ürün videoları", channel: "Sosyal", spend: 48, sales: 230 }, { name: "Rakip kelimeler", channel: "Arama", spend: 30, sales: 240 },
  ],
  q2: [
    { name: "Kış indirimi", channel: "Arama", spend: 25, sales: 210 }, { name: "Marka", channel: "Arama", spend: 20, sales: 170 },
    { name: "Yeni yıl", channel: "Sosyal", spend: 12, sales: 70 }, { name: "Hikâyeler", channel: "Sosyal", spend: 38, sales: 205 },
    { name: "Bülten", channel: "E-posta", spend: 8, sales: 120 }, { name: "Sepet hatırlatma", channel: "E-posta", spend: 5, sales: 105 },
    { name: "Ürün videoları", channel: "Sosyal", spend: 55, sales: 290 }, { name: "Rakip kelimeler", channel: "Arama", spend: 44, sales: 330 },
  ],
}

export function AdSpend() {
  // `$q` is a signal: reading it inside `data={() => …}` makes the chart re-run the function whenever it changes.
  let $q = "q1"
  // The text under the chart; onSelect overwrites it with the clicked campaign.
  let $pick = "Bir kampanyaya tıkla"
  // The Segmented control sits in the Card's `actions` slot, so the quarter switch is in the card header next to the
  // title. `aria-label` names the control for screen readers.
  //
  // ScatterChart props:
  // - x / y: the keys of the two numbers each point is placed by (spend across, sales up).
  // - group="channel": one series per channel, each with its own color, symbol and legend toggle.
  // - label="name": the campaign's name in the tooltip, the hidden data table and onSelect. With no `key` prop the
  //   label is also the point's identity, which is what lets a campaign glide between quarters.
  // - shape="auto": every series takes the next symbol in turn, so channels differ by shape as well as by color
  //   (important for color-blind readers and for black-and-white prints).
  // - trend="linear": a least-squares line per channel, labelled with its r² (how well the line fits).
  // - marks: a horizontal target line at 200; color "success" shows it as a goal, the label names it.
  // - format / xFormat: y as money in TRY, x as "N bin ₺" (thousands); used by axes, tooltip and table alike.
  // - xTitle / yTitle: axis titles; xLabel / yLabel: the names of x and y in the tooltip and the data table.
  // - xMin={0} yMin={0}: both axes start at zero, so distances from the origin are honest.
  // - animate="out": an easing name instead of the default spring, so on a quarter switch the points glide without
  //   overshoot and the trend lines swing to their new slope. animate={false} makes them jump; {{ duration: 400,
  //   easing: "out", stagger: 30 }} sweeps them one after another. Reduced motion is honoured automatically.
  // - legend="bottom": channel toggles under the chart; hiding a channel shrinks its points away.
  // - onSelect: called on click or Enter with the point ({ x, y, size, group, label, datum }).
  // Keyboard: Tab focuses the plot, ← → walk the campaigns in x order, Home / End jump to the ends, Enter selects,
  // Escape clears; the tooltip and guide lines to both axes follow the keyboard point.
  // To adapt: point `data` at your rows and set x, y, group and label to your keys.
  return <Card title="Reklam harcaması ve satış (bin ₺)" actions={[<Segmented size="sm" bind:value={$q} aria-label="Çeyrek" options={[{ value: "q1", label: "1. çeyrek" }, { value: "q2", label: "2. çeyrek" }]} />]}>
    <ScatterChart data={() => CAMPAIGNS[$q]} x="spend" y="sales" group="channel" label="name" shape="auto" trend="linear"
      marks={[{ y: 200, label: "Hedef satış", color: "success" }]} format={["money", "TRY"]} xFormat={(v: number) => `${v} bin ₺`}
      xTitle="Harcama" yTitle="Satış" xLabel="Harcama" yLabel="Satış" xMin={0} yMin={0} animate="out" legend="bottom"
      onSelect={(p) => { $pick = `${p.label} (${p.group}): ${p.x} bin ₺ harcandı` }} title="Kampanyalar" height={300} />
    {/* The last selection, read reactively through a function child so only this text updates. */}
    <p sx={{ text: "sm", color: "muted" }}>{() => $pick}</p>
  </Card>
}
