import { Sparkline } from "march/charts"
import { Card, ListRow, Badge } from "march/ui"

// borsa izleme listesi: her satırda hisse, 30 günlük eğilim, son fiyat ve değişim rozeti
const STOCKS = [
  { kod: "HADI", fiyat: [41, 42, 44, 43, 46, 48, 47, 50, 52, 51, 54] },
  { kod: "MRCH", fiyat: [88, 86, 87, 84, 82, 83, 80, 78, 79, 76, 75] },
  { kod: "KAHV", fiyat: [12, 12.4, 12.1, 12.6, 12.5, 12.9, 13.1, 12.8, 13.3, 13.2, 13.4] },
]

export function StockWatch() {
  return <Card title="İzleme listesi">
    {STOCKS.map((s) => {
      const first = s.fiyat[0], last = s.fiyat[s.fiyat.length - 1], ch = (last - first) / first
      return <ListRow title={s.kod} sub={`₺${last}`}
        trail={<div sx={{ flex: ["row", "center"], gap: 2 }}>
          <Sparkline data={s.fiyat} color={ch >= 0 ? 2 : 4} width={96} height={28} title={s.kod} />
          <Badge tone={ch >= 0 ? "success" : "danger"}>{`${ch >= 0 ? "+" : ""}${(ch * 100).toFixed(1)}%`}</Badge>
        </div>} />
    })}
  </Card>
}
