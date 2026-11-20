import { CornerMark, Avatar, Card } from "march/ui"
import { check, plus } from "march/icons"

// ekip listesi: avatarın köşesinde rozet (halkalı, taşan); çevrimiçi olana onay, davet edilmemişe artı
const team = [
  { name: "Ayşe Yılmaz", online: true },
  { name: "Mehmet Kaya", online: false },
  { name: "Deniz Ak", online: true },
]

// avatar ve köşedeki rozet
const Member = (props: { name: string; online: boolean }) => <span sx={{ flex: "col", gap: 1, text: "center" }}>
  <span class="m-corner-host" sx={{ display: "inline-block" }}>
    <Avatar name={props.name} size="lg" />
    <CornerMark corner="bottom-end" icon={props.online ? check : plus} variant="solid" m:color={props.online ? "success" : "neutral"} size="sm" ring overlap
      label={props.online ? `${props.name} çevrimiçi` : `${props.name} davet et`} />
  </span>
  <span sx={{ text: "xs" }}>{props.name}</span>
</span>

export function TeamAvatars() {
  return <Card title="Ekip">
    <div sx={{ flex: ["row", "wrap"], gap: 4 }}>{team.map((m) => <Member name={m.name} online={m.online} />)}</div>
  </Card>
}
