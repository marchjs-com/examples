import { ReactionPicker, Card } from "march/ui"

// günün havası: kendi emojilerin, seçilen büyük yazılır
export function MoodMeter() {
  let $mood = ""
  return <Card m:theme="night">
    <ReactionPicker emojis={["☀️", "⛅", "🌧️", "⛈️", "❄️"]} selected={$mood} onPick={(e: string) => $mood = e} m:color="brand-orange" label="Hava" />
    <span sx={{ text: "2xl" }}>{$mood || "?"}</span>
  </Card>
}
