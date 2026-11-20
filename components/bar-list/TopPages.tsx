import { BarList } from "march/charts"
import { Card, Segmented } from "march/ui"

// bir sitenin en çok ziyaret edilen sayfaları: dönem seçilir, ilk beşi gösterilir; satıra tıklamak sayfayı açar gibi
const PAGES = {
  today: [{ yol: "/", ziyaret: 1840 }, { yol: "/fiyatlar", ziyaret: 920 }, { yol: "/blog/sinyaller-nedir-ve-neden-hizlidir", ziyaret: 610 }, { yol: "/iletisim", ziyaret: 240 }, { yol: "/kariyer", ziyaret: 120 }, { yol: "/yardim", ziyaret: 95 }],
  week: [{ yol: "/", ziyaret: 12400 }, { yol: "/blog/sinyaller-nedir-ve-neden-hizlidir", ziyaret: 8100 }, { yol: "/fiyatlar", ziyaret: 6300 }, { yol: "/yardim", ziyaret: 2100 }, { yol: "/iletisim", ziyaret: 1500 }, { yol: "/kariyer", ziyaret: 900 }],
}

export function TopPages() {
  let $range: "today" | "week" = "today"
  let $open = "—"
  return <Card title="En çok ziyaret edilenler" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "today", label: "Bugün" }, { value: "week", label: "Bu hafta" }]} />]}>
    <BarList data={() => PAGES[$range]} x="yol" y="ziyaret" limit={5} format="compact" color={1} title="Sayfalar" onSelect={(r: { label: string; value: number; rank: number }) => { $open = r.label }} />
    <p sx={{ text: "sm", color: "muted" }}>Açılan: {() => $open}</p>
  </Card>
}
