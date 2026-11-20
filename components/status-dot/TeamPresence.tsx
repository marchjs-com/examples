import { StatusDot, Card } from "march/ui"

// bir ekip listesi: herkesin yanında durumunu söyleyen nokta; çevrimiçi olanınki halkayla nefes alır
const TEAM = [
  { name: "Ayşe", state: "success", text: "Çevrimiçi" },
  { name: "Mert", state: "warn", text: "Toplantıda" },
  { name: "Deniz", state: "danger", text: "Rahatsız etmeyin" },
  { name: "Can", state: "neutral", text: "Çevrimdışı" },
] as const

// bir satır: nokta süs, yanındaki metin aynı şeyi söylüyor
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
