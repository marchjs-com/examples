import { SearchBox, Card, Badge } from "march/ui"

// ekip yönetimi: üye listesinde arama; "/" tuşu kutuya odaklar, yazı 250 ms durunca süzülür,
// ad, e-posta ya da rol eşleşir; sonuç yoksa ne arandığı söylenir
interface Member { name: string; mail: string; role: "Yönetici" | "Editör" | "Okur" }

const MEMBERS: Member[] = [
  { name: "Ayşe Kaya", mail: "ayse@hadisosyal.com", role: "Yönetici" },
  { name: "Mehmet Demir", mail: "mehmet@hadisosyal.com", role: "Editör" },
  { name: "Zeynep Arslan", mail: "zeynep@hadisosyal.com", role: "Editör" },
  { name: "Can Öztürk", mail: "can@hadisosyal.com", role: "Okur" },
  { name: "Elif Şahin", mail: "elif@hadisosyal.com", role: "Okur" },
]
const TONES = { "Yönetici": "danger", "Editör": "info", "Okur": "neutral" } as const

export function MemberSearch() {
  let $q = ""
  const $needle = $q.trim().toLocaleLowerCase("tr")
  const $rows = MEMBERS.filter((m) => `${m.name} ${m.mail} ${m.role}`.toLocaleLowerCase("tr").includes($needle))
  return <Card title="Ekip üyeleri" subtitle={`${$rows.length} / ${MEMBERS.length} üye`}>
    <SearchBox bind:value={$q} shortcut placeholder="Ad, e-posta ya da rol…" label="Üye ara" />
    <ul sx={{ flex: "col", gap: 2, p: 0 }}>
      {$rows.length ? $rows.map((m) => <li sx={{ flex: ["row", "between"], gap: 2 }}>
        <span>{m.name} <span sx={{ text: "sm", color: "muted" }}>{m.mail}</span></span>
        <Badge tone={TONES[m.role]}>{m.role}</Badge>
      </li>) : <li sx={{ color: "muted" }}>"{$q}" ile eşleşen üye yok</li>}
    </ul>
  </Card>
}
