// TeamPresence: the real-life StatusDot example.
//
// What it shows: a team list where each person has a small dot beside their name showing their state: online,
// in a meeting, do not disturb, offline. Only the online dot breathes.
// When to use this pattern: presence in a chat, a member list or a dashboard. The dot is decoration here (no `label`),
// because the text next to it already says the same thing in words: state is never told by colour alone.
//
// Animation: pulse draws a breathing ring and stops under the visitor's reduced-motion preference; pulse={false} (the
// default) leaves a dot still.
// Accessibility: a StatusDot without `label` is hidden from assistive technology, so the text beside it carries the
// meaning for screen readers. Give a dot a `label` only when nothing near it says the state.
import { StatusDot, Card } from "march/ui"

// The data: who, which tone, and the words that say it. `as const` keeps the tones as literal types for the prop.
const TEAM = [
  { name: "Ayşe", state: "success", text: "Çevrimiçi" },
  { name: "Mert", state: "warn", text: "Toplantıda" },
  { name: "Deniz", state: "danger", text: "Rahatsız etmeyin" },
  { name: "Can", state: "neutral", text: "Çevrimdışı" },
] as const

// One row: a decorative dot, the name and the state in words. tone picks the colour by meaning (success, warn, danger,
// neutral); pulse is only true for the online person; size="sm" keeps the dot small next to text.
const Person = (p: { name: string; state: "success" | "warn" | "danger" | "neutral"; text: string }) =>
  <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <StatusDot tone={p.state} pulse={p.state === "success"} size="sm" />
    <span sx={{ text: "bold" }}>{p.name}</span>
    <span sx={{ color: "muted", text: "sm" }}>{p.text}</span>
  </div>

export function TeamPresence() {
  return <Card title="Ekip">
    <div sx={{ flex: "col", gap: 2 }}>{TEAM.map((m) => <Person name={m.name} state={m.state} text={m.text} />)}</div>
  </Card>
}
