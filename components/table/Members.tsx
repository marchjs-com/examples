import { Table } from "march/table"
import { Avatar, Badge, Rating, action } from "march/ui"
import { mail, trash } from "march/icons"

// üye yönetimi: 10.000 satır sanal kaydırmayla akar; sırala (Shift ile çoklu), şehre ve duruma göre süz, seç,
// toplu davet / askıya alma, CSV indir
const FIRST = ["Elif", "Mert", "Zeynep", "Can", "Ayşe", "Emre", "Selin", "Burak", "Ece", "Kerem", "Derya", "Onur"]
const LAST = ["Yılmaz", "Demir", "Kaya", "Arslan", "Çelik", "Şahin", "Aydın", "Öztürk", "Koç", "Polat"]
const CITY = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya"]
const STATUS = ["active", "invited", "suspended"] as const
const LABEL: Record<string, string> = { active: "Etkin", invited: "Davetli", suspended: "Askıda" }
const TONE: Record<string, "success" | "info" | "warn"> = { active: "success", invited: "info", suspended: "warn" }
const rnd = (i: number, m: number) => ((i * 2654435761) >>> 0) % m
const ROWS = Array.from({ length: 10_000 }, (_, i) => ({
  id: i + 1, name: `${FIRST[rnd(i, FIRST.length)]} ${LAST[rnd(i * 7 + 3, LAST.length)]}`, city: CITY[rnd(i * 13 + 5, CITY.length)],
  status: STATUS[rnd(i * 7 + 2, 10) < 6 ? 0 : rnd(i * 5 + 1, 10) < 6 ? 1 : 2], score: 1 + rnd(i * 11, 5), joined: Date.UTC(2024, 0, 1) + rnd(i * 17, 680) * 864e5,
}))

export function Members() {
  const invite = action("Davet gönder", async () => { await new Promise((r) => setTimeout(r, 300)) }, { icon: mail, success: "Davet gönderildi" })
  const suspend = action("Askıya al", async () => { await new Promise((r) => setTimeout(r, 300)) }, { icon: trash, danger: true, confirm: "Seçilenler askıya alınsın mı?", success: "Askıya alındı" })
  return <Table rows={ROWS} rowKey="id" virtual height={420} rowHeight={48} paging={false} selectable bulkActions={[invite, suspend]} filename="uyeler" caption="Üyeler"
    columns={[
      { key: "id", label: "#", align: "end", width: 64 },
      { key: "name", label: "Üye", width: 220, render: (r: typeof ROWS[number]) => <span sx={{ flex: "row", gap: 2 }}><Avatar name={r.name} size="sm" />{r.name}</span> },
      { key: "city", label: "Şehir", filter: "select", options: CITY },
      { key: "status", label: "Durum", filter: "select", options: STATUS.map((value) => ({ value, label: LABEL[value]! })), render: (r: typeof ROWS[number]) => <Badge tone={TONE[r.status]} dot>{LABEL[r.status]}</Badge> },
      { key: "score", label: "Puan", render: (r: typeof ROWS[number]) => <Rating value={r.score} readonly size="sm" /> },
      { key: "joined", label: "Katılım", format: "date" },
    ]} />
}
