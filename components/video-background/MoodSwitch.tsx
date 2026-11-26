// MoodSwitch: the creative-minimal VideoBackground example.
//
// What it shows: a button that cycles the colour layer over the video (dark, light, brand colour) and the text on it,
// so the same footage gets a different mood each time.
// When to use this pattern: when one video should serve several moods or themes. The tint is a cheap way to restyle
// it: no second video file is needed.
import { VideoBackground } from "march/landing"
import { Button } from "march/ui"

// The three moods. `as const` keeps `tint` typed as one of the allowed tint words (dark, light, brand; none removes the
// layer).
const MOODS = [
  { tint: "dark", text: "Gece modu 🌙" },
  { tint: "light", text: "Sabah serinliği ☀️" },
  { tint: "brand", text: "Parti zamanı 🎉" },
] as const

export function MoodSwitch() {
  // The index of the current mood (a signal).
  let $mood = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $mood = ($mood + 1) % MOODS.length}>Ruh hâlini değiştir</Button>
    {/* A function child is a live region: it reads $mood, so a new mood draws the VideoBackground again with the new
        tint and text. tintOpacity={0.55} sets how strong the layer is (0 to 1). The text colour follows the tint, and
        the poster and the video are the same for every mood. */}
    {() => {
      const m = MOODS[$mood]!
      return <VideoBackground src="/media/hadi-waves.webm" poster="/media/hadi-waves.jpg" tint={m.tint} tintOpacity={0.55}>
        <div sx={{ p: 6, text: "2xl" }}><strong>{m.text}</strong></div>
      </VideoBackground>
    }}
  </div>
}
