// TopPages: the real-life BarList example.
//
// The most visited pages of a site: choose the period, the top five are shown, and clicking a row acts like opening
// that page. Use this pattern for analytics panels: a Card with a period switch in its header and a ranked list of
// long labels (BarList scrolls a label into view when it does not fit).
import { BarList } from "march/charts"
import { Card, Segmented } from "march/ui"

// Demo data per period: a page path and its visits. Six rows each, so `limit` has something to cut. One path is
// deliberately long to show how long labels are handled.
const PAGES = {
  today: [{ yol: "/", ziyaret: 1840 }, { yol: "/fiyatlar", ziyaret: 920 }, { yol: "/blog/sinyaller-nedir-ve-neden-hizlidir", ziyaret: 610 }, { yol: "/iletisim", ziyaret: 240 }, { yol: "/kariyer", ziyaret: 120 }, { yol: "/yardim", ziyaret: 95 }],
  week: [{ yol: "/", ziyaret: 12400 }, { yol: "/blog/sinyaller-nedir-ve-neden-hizlidir", ziyaret: 8100 }, { yol: "/fiyatlar", ziyaret: 6300 }, { yol: "/yardim", ziyaret: 2100 }, { yol: "/iletisim", ziyaret: 1500 }, { yol: "/kariyer", ziyaret: 900 }],
}

export function TopPages() {
  // The selected period and the label of the last clicked row (reactive state).
  let $range: "today" | "week" = "today"
  let $open = "—"
  // The Segmented control in the Card's `actions` slot switches the period (bind:value; aria-label names the group).
  return <Card title="En çok ziyaret edilenler" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "today", label: "Bugün" }, { value: "week", label: "Bu hafta" }]} />]}>
    {/* data is a function of $range, so the list changes with the period. x and y name the label and value keys.
        limit={5} cuts the sorted list to five rows. format="compact" writes large numbers short (for example 12K).
        color={1} picks the second palette slot. onSelect makes the rows buttons; here it just records the label, where
        a real app would navigate. */}
    <BarList data={() => PAGES[$range]} x="yol" y="ziyaret" limit={5} format="compact" color={1} title="Sayfalar" onSelect={(r: { label: string; value: number; rank: number }) => { $open = r.label }} />
    <p sx={{ text: "sm", color: "muted" }}>Açılan: {() => $open}</p>
  </Card>
}
