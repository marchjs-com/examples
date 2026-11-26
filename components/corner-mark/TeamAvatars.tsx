// TeamAvatars: the real-life CornerMark example.
//
// What it shows: a team list. Each avatar has a badge in its bottom corner: a green check for people who are online, a
// grey plus for people who have not been invited yet. The badge has a ring that cuts it out of the avatar and sits half
// outside the corner.
// When to use this pattern: status badges on avatars, story rings or cards. ring + overlap is the badge look; variant
// "solid" with a colour token makes the status readable at a glance.
// Accessibility: colour is never the only signal: every badge has a `label` ("online" / "invite"), so screen readers
// get the same information as sighted users.
import { CornerMark, Avatar, Card } from "march/ui"
import { check, plus } from "march/icons"

const team = [
  { name: "Ayşe Yılmaz", online: true },
  { name: "Mehmet Kaya", online: false },
  { name: "Deniz Ak", online: true },
]

// An avatar with its badge. The class m-corner-host positions the wrapper so the badge can sit in the corner.
// m:color is a common prop that sets the colour token; size="sm" keeps the badge small next to a large avatar.
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
