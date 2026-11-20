import { ProgressRing } from "march/charts"
import { Card, ListRow } from "march/ui"

// bir eğitim platformunda derslerin ilerlemesi: her satırın başında halka, düzeye göre renk
const COURSES = [
  { ad: "TypeScript'e giriş", bitti: 18, toplam: 20 },
  { ad: "Sinyallerle durum", bitti: 9, toplam: 14 },
  { ad: "Erişilebilir formlar", bitti: 2, toplam: 12 },
]

export function CourseProgress() {
  return <Card title="Derslerim">
    {COURSES.map((c) => <ListRow title={c.ad} sub={`${c.bitti} / ${c.toplam} bölüm`}
      lead={<ProgressRing value={c.bitti} max={c.toplam} size={44} thickness={5} label={c.ad} format={(v: number) => `${Math.round((v / c.toplam) * 100)}`} />} />)}
  </Card>
}
