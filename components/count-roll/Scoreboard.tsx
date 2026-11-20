import { CountRoll, Button, Card } from "march/ui"

// skor tabelası: iki takım, her gol yalnız değişen basamağı döndürür
export function Scoreboard() {
  let $home = 9
  let $away = 19
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "center"], gap: 4, text: ["2xl", "bold"] }}>
      <CountRoll value={$home} /> <span>:</span> <CountRoll value={$away} />
    </div>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $home++}>Ev sahibi gol</Button>
      <Button size="sm" on:click={() => $away++}>Konuk gol</Button>
    </div>
  </Card>
}
