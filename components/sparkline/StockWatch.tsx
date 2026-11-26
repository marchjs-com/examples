import { Sparkline } from "march/charts"
import { Card, ListRow, Badge } from "march/ui"

// A stock watchlist: a real-life Sparkline.
// Every row shows a ticker, its last price, a tiny trend line and a badge with the change since the first price.
// The line's color and the badge's tone follow the direction, so rising and falling stocks are told apart at a glance.
// Use sparklines like this inside list rows or table cells, where a full chart per row would be far too big.

// Ticker code (kod) and price history (fiyat). Replace with your own rows; each list becomes one line.
const STOCKS = [
  { kod: "HADI", fiyat: [41, 42, 44, 43, 46, 48, 47, 50, 52, 51, 54] },
  { kod: "MRCH", fiyat: [88, 86, 87, 84, 82, 83, 80, 78, 79, 76, 75] },
  { kod: "KAHV", fiyat: [12, 12.4, 12.1, 12.6, 12.5, 12.9, 13.1, 12.8, 13.3, 13.2, 13.4] },
]

export function StockWatch() {
  // The data is static, so a plain .map() builds the rows once; no signals are needed.
  return <Card title="İzleme listesi">
    {STOCKS.map((s) => {
      // First and last price and the relative change (0.1 = +10 %).
      const first = s.fiyat[0], last = s.fiyat[s.fiyat.length - 1], ch = (last - first) / first
      // Composition: ListRow lays out the title (ticker), the sub line (last price) and the `trail` slot on the right,
      // where the sparkline and the badge sit side by side.
      // Sparkline props:
      // - data={s.fiyat}: a plain number list; Sparkline reads numbers directly, no `y` prop needed.
      // - color: palette slot 2 for a rise, 4 for a fall, so the line agrees with the badge's tone.
      // - width / height: 96 × 28 px, small enough for a list row.
      // - title={s.kod}: the accessible name, read before the summary (first, last, min, max), so each line is
      //   announced with its ticker.
      // - No `animate` prop: the line rises from its baseline on the first draw (a spring); animate={false} draws it at
      //   once, and reduced motion is honoured automatically.
      // Accessibility: a sparkline has nothing to focus, which is why the price and the change are also written as text.
      return <ListRow title={s.kod} sub={`₺${last}`}
        trail={<div sx={{ flex: ["row", "center"], gap: 2 }}>
          <Sparkline data={s.fiyat} color={ch >= 0 ? 2 : 4} width={96} height={28} title={s.kod} />
          <Badge tone={ch >= 0 ? "success" : "danger"}>{`${ch >= 0 ? "+" : ""}${(ch * 100).toFixed(1)}%`}</Badge>
        </div>} />
    })}
  </Card>
}
