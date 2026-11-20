import { StatusBar, Card } from "march/ui"
import { heart, star, zap } from "march/icons"

// oyun göstergesi: can, puan, enerji; puan düğmesi puanı artırır
export function GameHud() {
  let $score = 120
  let $lives = 3
  return <Card m:theme="night">
    <StatusBar label="Oyun durumu" items={[
      { id: "lives", icon: heart, text: () => `${$lives}`, tone: () => ($lives > 1 ? "success" : "danger"), onSelect: () => $lives = Math.max(0, $lives - 1), title: "Can kaybet" },
      { id: "score", icon: star, text: () => `${$score} puan`, onSelect: () => $score += 10, title: "Puan kazan" },
      { id: "energy", side: "end", icon: zap, text: "Enerji dolu", tone: "busy" },
    ]} />
  </Card>
}
