import { Pagination, Avatar, Card } from "march/ui"

// topluluk üyeleri: üstte "1–8 / 57 üye" ve sayfa boyutu, altta numaralı sayfalar; ikisi aynı sayfayı paylaşır
const FIRST = ["Ada", "Can", "Deniz", "Ece", "Mert", "Zeynep", "Kerem", "Elif", "Bora", "Selin"]
const LAST = ["Yılmaz", "Kaya", "Demir", "Şahin", "Çelik", "Aydın"]
const MEMBERS = Array.from({ length: 57 }, (_, i) => ({ id: i + 1, name: `${FIRST[i % FIRST.length]} ${LAST[i % LAST.length]}`, city: ["İstanbul", "İzmir", "Ankara"][i % 3] }))

// bir üye satırı
const Member = (props: { name: string; city: string }) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
  <Avatar name={props.name} size="sm" />
  <span sx={{ text: "bold" }}>{props.name}</span>
  <span sx={{ text: "sm", color: "muted" }}>{props.city}</span>
</div>

export function MemberList() {
  let $page = 1
  let $size = 8
  const $rows = MEMBERS.slice(($page - 1) * $size, $page * $size)
  return <Card title="Üyeler">
    <div sx={{ flex: "col", gap: 2 }}>
      <Pagination variant="simple" bind:page={$page} total={MEMBERS.length} size={$size} sizes={[8, 16, 32]}
        onSize={(n: number) => { $size = n; $page = 1 }} info={(r: { from: number; to: number; total: number }) => `${r.from}–${r.to} / ${r.total} üye`} status={false} controls={false}
        labels={{ sizes: "Sayfa başına üye" }} />
      {$rows.map((m) => <Member name={m.name} city={m.city} />)}
      <Pagination bind:page={$page} total={MEMBERS.length} size={$size} label="Üye sayfaları" m:color="brand-green" />
    </div>
  </Card>
}
