// PaginationLab: the full-featured Pagination example; it uses every prop at least once.
//
// Pagination shows numbered pages with gaps (the first and last page, the current one and `siblings` on each side stay
// visible), or, with variant="simple", only Previous / Next. Pages are 1-based. Props shown here: page (bind:page = page +
// setPage), pages, onPage, siblings, variant, total, size, sizes, onSize, hasPrev, hasNext, onPrev, onNext, info, status,
// label, labels (previous, next, page, sizes), controls, prev, next, gap, class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PaginationLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Pagination, Card } from "march/ui"
import { arrowLeft, arrowRight } from "march/icons"

// One example of the Lab: a small muted title and the example under it. Plain composition, no Pagination feature.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PaginationLab() {
  // Reactive state: one page number per example, the last chosen page, the rows per page and the cursor "batch".
  let $page = 1
  let $last = "—"
  let $mini = 3
  let $rowsPage = 2
  let $size = 20
  let $batch = 1
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Numaralı: kendi adları, metinleri, boşluk işareti, renk">
      {/* Numbered pages.
          - bind:page: two-way binding of the current page; onPage also reports every chosen page (shown below).
          - pages={20}: the page count. siblings={2}: pages shown on each side of the current one (the default is 1).
          - prev / next: your own content for the Previous / Next buttons (short text or an icon). gap: the mark where
            pages are left out (the default is dots).
          - label: the accessible name of the <nav>. labels: the accessible names of the buttons; `page` is a function
            that names each number button. The current page has aria-current="page"; Previous / Next are disabled at the
            ends.
          - m:color: the colour token (a common prop). class: for CSS or tests. */}
      <Pagination bind:page={$page} pages={20} siblings={2} onPage={(p: number) => $last = String(p)} prev="‹ Geri" next="İleri ›" gap="·"
        label="Sonuç sayfaları" labels={{ previous: "Önceki sayfa", next: "Sonraki sayfa", page: (n: number) => `Sayfa ${n}` }}
        m:color="brand-blue" class="lab-numbers" />
      <span>{"Son seçilen: " + $last}</span>
    </Row>
    <Row title="Yalnız numaralar (controls ve gap kapalı); total + size ile sayfa sayısı">
      {/* controls={false}: no Previous / Next buttons. gap={false}: no mark for left-out pages. The second one gives
          `total` (rows) and `size` (rows per page) instead of `pages`: 45 rows at 10 per page make 5 pages. `page` without
          bind: shows a fixed page. */}
      <Pagination bind:page={$mini} pages={5} controls={false} gap={false} class="lab-bare" />
      <Pagination page={3} total={45} size={10} class="lab-total" />
    </Row>
    <Row title="Yalın: aralık metni, sayfa metni, sayfa boyutu">
      {/* variant="simple": only Previous / Next, with the texts between them.
          - total + size: the range ("21-40 of 134") and the page count come from them. sizes + onSize: a "rows per
            page" select; onSize also returns to page 1.
          - info: a function that builds the range text from { from, to, total }. status: a function that builds the
            "page n of N" text. (Both can be false to hide them.)
          - labels.previous / next / sizes: accessible names of the two buttons and the select. The range text is a polite
            live region, so a screen reader announces changes. */}
      <Pagination variant="simple" bind:page={$rowsPage} total={134} size={$size} sizes={[20, 50]} onSize={(n: number) => { $size = n; $rowsPage = 1 }}
        info={(r: { from: number; to: number; total: number }) => `${r.from}–${r.to} / ${r.total} satır`} status={(p: number, n: number) => `Sayfa ${p} / ${n}`}
        labels={{ previous: "Önceki", next: "Sonraki", sizes: "Satır sayısı" }} class="lab-simple" />
    </Row>
    {/* m:theme="night" on the Card makes the card and everything inside use the dark theme tokens. */}
    <Card m:theme="night">
      <Row title="İmleç kipi: sayfa sayısı bilinmiyor">
        {/* Cursor mode: there is no page count (for example an API that only gives "older" and "newer" batches).
            hasPrev / hasNext say whether a previous / next batch exists; onPrev / onNext are called instead of onPage.
            prev / next take icons here (their accessible names come from labels). */}
        <Pagination variant="simple" hasPrev={$batch > 1} hasNext={$batch < 4} onPrev={() => $batch--} onNext={() => $batch++}
          prev={arrowLeft} next={arrowRight} labels={{ previous: "Daha yeni", next: "Daha eski" }} class="lab-cursor" />
        <span>{"Yığın " + $batch}</span>
      </Row>
    </Card>
  </div>
}
