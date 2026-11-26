import { ChordChart } from "march/charts"
import { Button } from "march/ui"

// Who texts whom in a group of friends: a playful, minimal ChordChart.
// Each friend's arc on the rim is as long as their messages sent and received; ribbons join the friends who text each
// other, as wide as the messages going that way. A button makes that friend text one of the others at random, and the
// arcs and ribbons turn to their new angles. Use a chord chart when the story is "who exchanges with whom", for
// example messages, migrations between cities, or calls between services.

// The names double as group labels round the rim; the emoji make each friend easy to spot.
const FRIENDS = ["Ece 🦊", "Can 🐼", "Deniz 🐬", "Mert 🦁"]

export function FriendChat() {
  // The message matrix: $msgs[i][j] is how many messages friend i sent friend j, in the order of FRIENDS. The diagonal
  // is 0 (nobody texts themselves).
  let $msgs = [[0, 3, 1, 2], [2, 0, 4, 1], [1, 3, 0, 2], [2, 1, 1, 0]]
  // Friend i texts a random other friend j (never i itself). The matrix is replaced, not mutated, so the signal
  // notices the change and the chart redraws.
  const send = (i: number) => {
    const j = (i + 1 + Math.floor(Math.random() * 3)) % 4
    $msgs = $msgs.map((row, r) => row.map((n, c) => (r === i && c === j ? n + 1 : n)))
  }
  // ChordChart props:
  // - matrix / names: the square matrix and the group names in its order.
  // - directed: each direction its own ribbon with an arrow at the receiver, so "Ece → Can" and "Can → Ece" differ.
  // - padAngle={0.08}: a wider gap between friends than the default 0.04; thickness={10}: slimmer arcs.
  // - format: the value text in tooltip and table ("mesaj" = messages).
  // - animate={{ easing: "spring-wobbly" }}: a bouncy spring that suits the playful theme; arcs and ribbons wobble
  //   into their new angles. animate={false} switches motion off; reduced motion is honoured automatically.
  // Accessibility: title names the SVG, a hidden table lists every flow, and Tab + the arrow keys walk the friends and
  // then the ribbons.
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* One button per friend, built from the same list, so adding a friend to FRIENDS (and a row and column to the
          matrix) adds a button too. */}
      {FRIENDS.map((f, i) => <Button size="sm" variant="secondary" on:click={() => send(i)}>{f} yazsın 💬</Button>)}
    </div>
    <ChordChart matrix={$msgs} names={FRIENDS} directed padAngle={0.08} thickness={10} format={(n: number) => `${n} mesaj`}
      animate={{ easing: "spring-wobbly" }} title="Kim kime yazıyor" height={300} />
  </div>
}
