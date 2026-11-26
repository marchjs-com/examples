import { StreamGraph } from "march/charts"
import { Button } from "march/ui"

// MoodRiver: a creative, minimal StreamGraph. A week of moods flows like a river: every day adds a little of each
// feeling and the layers swell or thin. "Yeni hafta" draws a new week, and the layers morph to it.
// Use a stream graph when the overall shape over time matters more than exact values (those are in the tooltip).

const MOODS = { mutlu: "😊 Mutlu", sakin: "😌 Sakin", yorgun: "😴 Yorgun", heyecanli: "🤩 Heyecanlı" }
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
// Deterministic "random" amounts per week number k, so the example looks the same on every run.
const week = (k: number) => DAYS.map((gun, i) => ({
  gun, mutlu: 3 + ((i * 7 + k * 3) % 6), sakin: 2 + ((i * 5 + k * 7) % 5), yorgun: 1 + ((i * 3 + k * 5) % 4), heyecanli: 1 + ((i * 11 + k) % 5),
}))

export function MoodRiver() {
  // One number of state; the data function below re-runs when it changes, and the chart animates the difference.
  let $k = 1
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button on:click={() => { $k++ }}>Yeni hafta</Button>
    {/*
      y lists the layers, `series` names them (legend, tooltip, hidden table). The default baseline "wiggle" keeps the
      edges of the layers as calm as possible; the curve is smooth by default. Click a legend item to hide a mood: its
      layer closes up and the others flow together. animate={false} would make every change jump.
    */}
    <StreamGraph data={() => week($k)} x="gun" y={Object.keys(MOODS)} series={MOODS} title="Haftanın ruh hali" height={220} />
  </div>
}
