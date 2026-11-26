// MemberList: the real-life Pagination example.
//
// A list of community members with two paginations that share one page number: a compact one on top (the range text
// "1-8 of 57 members" and a rows-per-page choice) and a numbered one below. Use this pattern for any list that is cut
// into pages on the client: one `page` state drives the visible rows and every pagination you place.
import { Pagination, Avatar, Card } from "march/ui"

// Fake data: 57 members built from name lists.
const FIRST = ["Ada", "Can", "Deniz", "Ece", "Mert", "Zeynep", "Kerem", "Elif", "Bora", "Selin"]
const LAST = ["Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Aydın"]
const MEMBERS = Array.from({ length: 57 }, (_, i) => ({ id: i + 1, name: `${FIRST[i % FIRST.length]} ${LAST[i % LAST.length]}`, city: ["İstanbul", "İzmir", "Ankara"][i % 3] }))

// One member row.
const Member = (props: { name: string; city: string }) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
  <Avatar name={props.name} size="sm" />
  <span sx={{ text: "bold" }}>{props.name}</span>
  <span sx={{ text: "sm", color: "muted" }}>{props.city}</span>
</div>

export function MemberList() {
  // The current page (1-based) and the rows per page. $rows is derived from both, so it is recalculated when either
  // changes.
  let $page = 1
  let $size = 8
  const $rows = MEMBERS.slice(($page - 1) * $size, $page * $size)
  return <Card title="Üyeler">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* The top bar, variant="simple": only the range text, the rows-per-page select and nothing else.
          - bind:page: the page is shared with the second pagination below. total + size: from them the component
            works out the page count and the range.
          - sizes + onSize: show a "rows per page" select; onSize gets the new size, and we also go back to page 1
            (the old page might not exist any more).
          - info: a function that builds the range text from { from, to, total }. status={false}: hide the "page n of N"
            text; controls={false}: hide the Previous / Next buttons, because the numbered pagination below has them.
          - labels.sizes: the accessible name of the select. */}
      <Pagination variant="simple" bind:page={$page} total={MEMBERS.length} size={$size} sizes={[8, 16, 32]}
        onSize={(n: number) => { $size = n; $page = 1 }} info={(r: { from: number; to: number; total: number }) => `${r.from}–${r.to} / ${r.total} üye`} status={false} controls={false}
        labels={{ sizes: "Sayfa başına üye" }} />
      {$rows.map((m) => <Member name={m.name} city={m.city} />)}
      {/* The numbered pagination: the same page state. label is the accessible name of the <nav>; the current page has
          aria-current="page" and Previous / Next are disabled at the ends. m:color is the common colour token prop. */}
      <Pagination bind:page={$page} total={MEMBERS.length} size={$size} label="Üye sayfaları" m:color="brand-green" />
    </div>
  </Card>
}
