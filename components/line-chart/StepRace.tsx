import { LineChart } from "march/charts"
import { Button } from "march/ui"

// iki arkadaşın adım yarışı: "Yürü" ikisine de rastgele adım ekler, çizgiler büyür; önde olan başlıkta
export function StepRace() {
  let $days = [{ gun: 1, ayse: 6200, mert: 5400 }]
  const walk = () => {
    const last = $days[$days.length - 1]
    if ($days.length >= 14) return
    $days = [...$days, { gun: last.gun + 1, ayse: last.ayse + 3000 + ($days.length * 977) % 5000, mert: last.mert + 2500 + ($days.length * 1361) % 6000 }]
  }
  const lead = () => { const l = $days[$days.length - 1]; return l.ayse >= l.mert ? "Ayşe önde 🏃‍♀️" : "Mert önde 🏃" }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button on:click={walk} disabled={() => $days.length >= 14}>Yürü</Button>
      <strong>{lead}</strong>
    </div>
    <LineChart data={() => $days} x="gun" y={["ayse", "mert"]} series={{ ayse: "Ayşe", mert: "Mert" }} xLabel="Gün" title="Adım yarışı" height={220} />
  </div>
}
