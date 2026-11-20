import { DockLayout, Button, row, col, tabs } from "march/ui"
import { sun, moon, coffee } from "march/icons"

// ruh hâli panosu: üç pano; her birinin beğeni sayısı sekmede rozet olur. Sekmeleri sürükleyip panoyu yeniden diz.
const Board = (props: { emoji: string; text: string; onLike: () => void }) => <div sx={{ p: 3, flex: "col", gap: 2 }}>
  <span sx={{ text: "2xl" }}>{props.emoji}</span>
  <span>{props.text}</span>
  <Button size="sm" variant="secondary" on:click={props.onLike}>Beğen</Button>
</div>

export function MoodBoard() {
  let $sun = 0
  let $moon = 0
  let $coffee = 0
  const panels = [
    { id: "sun", title: "Sabah", icon: sun, badge: () => $sun || null, content: () => <Board emoji="🌅" text="Güne erken başla" onLike={() => $sun++} /> },
    { id: "coffee", title: "Öğle", icon: coffee, badge: () => $coffee || null, content: () => <Board emoji="☕" text="Bir mola ver" onLike={() => $coffee++} /> },
    { id: "moon", title: "Gece", icon: moon, badge: () => $moon || null, content: () => <Board emoji="🌙" text="Yıldızları say" onLike={() => $moon++} /> },
  ]
  return <div style={{ height: "18rem" }}>
    <DockLayout panels={panels} layout={row([0.5, tabs("sun")], [0.5, col([0.5, tabs("coffee")], [0.5, tabs("moon")])])} commands={false} label="Ruh hâli panosu" />
  </div>
}
