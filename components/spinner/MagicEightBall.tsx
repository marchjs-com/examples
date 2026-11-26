// MagicEightBall: the creative-minimal Spinner example.
//
// What it shows: a magic ball. When you ask a question the ball "thinks" for a moment (a turning ring), then it gives an answer.
// When to use this pattern: a short wait where the result replaces the spinner in the same place. The ring says "something is
// happening", and the button is disabled meanwhile so the question cannot be asked twice.
import { Spinner, Button, Card } from "march/ui"

// The possible answers.
const ANSWERS = ["Kesinlikle evet ✨", "Pek sanmam 🤔", "Yıldızlar öyle diyor 🌟", "Sonra tekrar sor 🔮"]

export function MagicEightBall() {
  // `let $name` variables are March signals: writing one redraws whatever reads it. $thinking is true while the ball thinks,
  // $answer holds the last answer.
  let $thinking = false
  let $answer = "Bir soru düşünün ve sorun."
  // Starts the "thinking": after 1.2 seconds a random answer is chosen. A real page would await a request here instead of the timer.
  const ask = () => {
    $thinking = true
    setTimeout(() => { $answer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)]!; $thinking = false }, 1200)
  }
  // m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme.
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3, p: 3 }}>
      {/* A function child is drawn again whenever the signal it reads changes: the Spinner while thinking, the answer after.
          Spinner options used here:
          - size="lg": the large ring (sm, md, lg, or em for text size).
          - colors="brand": the ring carries the brand colours (the default follows the theme).
          - label: the accessible name. The ring is a role="status" element, so a screen reader hears what is loading.
          The ring keeps turning slowly under reduced motion (a still ring would read as "stuck"). */}
      {() => $thinking ? <Spinner size="lg" colors="brand" label="Küre düşünüyor" /> : <span sx={{ text: "lg" }}>{$answer}</span>}
      {/* disabled={() => $thinking}: the button cannot be pressed again while the ball is thinking. */}
      <Button variant="primary" disabled={() => $thinking} on:click={ask}>Küreye sor</Button>
    </div>
  </Card>
}
