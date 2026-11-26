// MoodBoard: the creative-minimal DockLayout example.
//
// What it shows: a mood board of three panels. Each panel has a like button; the likes appear as a badge on its tab.
// Drag the tabs to rearrange the board: onto a side of a group makes a new split, onto the centre joins its tabs.
// When to use this pattern: the smallest DockLayout: panels plus a starting `layout`. No persistence, no api.
// Keyboard: Ctrl+Shift+arrows move the focused tab inside its group; Shift+F10 opens the panel menu.
import { DockLayout, Button, row, col, tabs } from "march/ui"
import { sun, moon, coffee } from "march/icons"

// The content of one panel: an emoji, a line of text and a like button.
const Board = (props: { emoji: string; text: string; onLike: () => void }) => <div sx={{ p: 3, flex: "col", gap: 2 }}>
  <span sx={{ text: "2xl" }}>{props.emoji}</span>
  <span>{props.text}</span>
  <Button size="sm" variant="secondary" on:click={props.onLike}>Beğen</Button>
</div>

// One counter per panel.
export function MoodBoard() {
  let $sun = 0
  let $moon = 0
  let $coffee = 0
  // badge is a getter returning the count, or null to hide the badge while it is 0. `content` is a function, so each
  // panel is built when it is shown.
  const panels = [
    { id: "sun", title: "Sabah", icon: sun, badge: () => $sun || null, content: () => <Board emoji="🌅" text="Güne erken başla" onLike={() => $sun++} /> },
    { id: "coffee", title: "Öğle", icon: coffee, badge: () => $coffee || null, content: () => <Board emoji="☕" text="Bir mola ver" onLike={() => $coffee++} /> },
    { id: "moon", title: "Gece", icon: moon, badge: () => $moon || null, content: () => <Board emoji="🌙" text="Yıldızları say" onLike={() => $moon++} /> },
  ]
  return <div style={{ height: "18rem" }}>
    {/* layout is the starting tree: a row with the first panel on the left (half the width) and a column on the right
            holding the other two. The numbers are weights; tabs("id") makes a tab group with one panel. commands={false}
            turns off the palette commands; label is the accessible name of the workspace. */}
    <DockLayout panels={panels} layout={row([0.5, tabs("sun")], [0.5, col([0.5, tabs("coffee")], [0.5, tabs("moon")])])} commands={false} label="Ruh hâli panosu" />
  </div>
}
