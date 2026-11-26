import { BarList } from "march/charts"
import { Card, Segmented } from "march/ui"

// A website's most visited pages: a real-life BarList in an analytics card.
// A period switch (today / this week) swaps the data; the list shows the top five, and a click on a row "opens" that
// page (here it just writes its path under the list).
// Use a BarList like this for any "top N" panel: pages, referrers, products, search terms. Long labels such as blog
// URLs scroll into view when they do not fit, so you never have to shorten them yourself.

// Visits per page for each period: yol = path, ziyaret = visits. Six pages each, so `limit={5}` has one to cut.
// Replace them with your own analytics rows.
const PAGES = {
  today: [{ yol: "/", ziyaret: 1840 }, { yol: "/fiyatlar", ziyaret: 920 }, { yol: "/blog/sinyaller-nedir-ve-neden-hizlidir", ziyaret: 610 }, { yol: "/iletisim", ziyaret: 240 }, { yol: "/kariyer", ziyaret: 120 }, { yol: "/yardim", ziyaret: 95 }],
  week: [{ yol: "/", ziyaret: 12400 }, { yol: "/blog/sinyaller-nedir-ve-neden-hizlidir", ziyaret: 8100 }, { yol: "/fiyatlar", ziyaret: 6300 }, { yol: "/yardim", ziyaret: 2100 }, { yol: "/iletisim", ziyaret: 1500 }, { yol: "/kariyer", ziyaret: 900 }],
}

export function TopPages() {
  let $range: "today" | "week" = "today"  // the selected period, bound to the Segmented control
  let $open = "—"                          // the last clicked page, written by onSelect
  // The Segmented control goes into the Card's `actions` slot, so the period switch sits in the card header next to
  // the title; `aria-label` names the control for screen readers.
  //
  // BarList props:
  // - data={() => PAGES[$range]}: a function reading the signal, so switching the period swaps the rows.
  // - x="yol" y="ziyaret": the label key and the value key of each row.
  // - limit={5}: only the top five after sorting (largest first, the default).
  // - format="compact": a pipe name, so 12400 is written in a short form (about "12K") and the values stay short.
  // - color={1}: palette slot 1 instead of the first color.
  // - title: the accessible name of the list.
  // - onSelect: makes rows buttons and receives { label, value, rank, datum }; a real app would navigate to r.label.
  // Motion: no `animate` prop, so the default spring applies: on a switch the bars morph, rows that changed rank glide
  // to their place, and a row that falls out of the top five shrinks away. animate={false} jumps; reduced motion is
  // honoured automatically.
  // Keyboard: Tab reaches each row button, Enter / Space opens it.
  return <Card title="En çok ziyaret edilenler" actions={[<Segmented size="sm" bind:value={$range} aria-label="Dönem" options={[{ value: "today", label: "Bugün" }, { value: "week", label: "Bu hafta" }]} />]}>
    <BarList data={() => PAGES[$range]} x="yol" y="ziyaret" limit={5} format="compact" color={1} title="Sayfalar" onSelect={(r: { label: string; value: number; rank: number }) => { $open = r.label }} />
    {/* A function child, so only this text updates when a row is clicked. */}
    <p sx={{ text: "sm", color: "muted" }}>Açılan: {() => $open}</p>
  </Card>
}
