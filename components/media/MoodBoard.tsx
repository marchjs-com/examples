// MoodBoard: the creative-minimal Media example.
//
// What it shows: a mood board with one slot that shows a picture, a video, or (for the last mood) a file that is missing,
// depending on the chosen mood. The same Media element handles all three because it guesses the kind from the file
// extension.
// When to use this pattern: a place where the file can change at runtime and its kind is not known up front. `src` and
// `alt` can be functions, so the slot follows a signal.
//
// Accessibility: for an image, `alt` is its text alternative; a video keeps its native controls; a failed load is
// announced as a status message and shows the `fallback` text. Animation: the video loops and is muted.
import { Media, Card, Segmented } from "march/ui"

// The moods: a value, a label and the file shown for it. The last file does not exist on purpose, to show the fallback.
const moods = [
  { value: "calm", label: "Sakin", src: "/media/dusk.jpg" },
  { value: "flow", label: "Akış", src: "/media/hadi-waves.webm" },
  { value: "lost", label: "Kayıp", src: "/media/yok.jpg" },
]

export function MoodBoard() {
  // The chosen mood, a signal. `now` finds its entry (falling back to the first one).
  let $mood = "calm"
  const now = () => moods.find((m) => m.value === $mood) ?? moods[0]!
  return <Card title="Bugünün havası">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* The Segmented control picks the mood; its aria-label names it because it has no visible caption. */}
      <Segmented aria-label="Hava" options={moods.map((m) => ({ value: m.value, label: m.label }))} bind:value={$mood} />
      {/* The Media props:
          - src and alt are functions of the chosen mood, so the slot changes with the choice.
          - kind="auto": the kind (image or video) comes from the extension of the file.
          - poster: the picture a video shows before it plays. muted + loop: a video that plays silently and repeats.
          - fallback: the text shown when the file cannot be loaded, as with the missing file of the third mood. */}
      <Media src={() => now().src} kind="auto" alt={() => now().label} poster="/media/hadi-waves.jpg" muted loop fallback="Bu hava kaybolmuş, başka birini seçin" />
    </div>
  </Card>
}
