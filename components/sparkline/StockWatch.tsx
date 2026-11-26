// StockWatch: the real-life Sparkline example.
//
// What it shows: a stock watch list. Each row has the ticker, the last price, a small trend line and a badge with the change
// over the period. A rising stock is drawn in one colour and green, a falling one in another colour and red.
// When to use this pattern: a trend that must fit in a table cell or a list row, where a full chart would be too much. Put the
// numbers next to the line (here the price and the change), because a Sparkline has no axes and cannot be focused.
import { Sparkline } from "march/charts"
import { Card, ListRow, Badge } from "march/ui"

// Made-up data: a ticker (kod) and its recent prices (fiyat).
const STOCKS = [
  { kod: "HADI", fiyat: [41, 42, 44, 43, 46, 48, 47, 50, 52, 51, 54] },
  { kod: "MRCH", fiyat: [88, 86, 87, 84, 82, 83, 80, 78, 79, 76, 75] },
  { kod: "KAHV", fiyat: [12, 12.4, 12.1, 12.6, 12.5, 12.9, 13.1, 12.8, 13.3, 13.2, 13.4] },
]

export function StockWatch() {
  return <Card title="İzleme listesi">
    {STOCKS.map((s) => {
      // The change over the period as a ratio: (last - first) / first.
      const first = s.fiyat[0], last = s.fiyat[s.fiyat.length - 1], ch = (last - first) / first
      // ListRow shows the ticker (title), the last price (sub) and whatever is passed in `trail` at its end.
      return <ListRow title={s.kod} sub={`₺${last}`}
        trail={<div sx={{ flex: ["row", "center"], gap: 2 }}>
          {/* Sparkline options used here: data (a plain array), color (a palette slot: 2 for a rise, 4 for a fall), a small
              size in px, and title, the accessible name (the label is the title plus a summary of the values). */}
          <Sparkline data={s.fiyat} color={ch >= 0 ? 2 : 4} width={96} height={28} title={s.kod} />
          {/* The badge repeats the change as text, so the information does not depend on the line or on colour alone. */}
          <Badge tone={ch >= 0 ? "success" : "danger"}>{`${ch >= 0 ? "+" : ""}${(ch * 100).toFixed(1)}%`}</Badge>
        </div>} />
    })}
  </Card>
}
