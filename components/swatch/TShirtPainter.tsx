// TShirtPainter: the creative-minimal Swatch example.
//
// What it shows: a T-shirt painter. Small round swatches are the paints; the big square swatch is the shirt and takes the
// chosen colour, with the word on it staying the same (a Swatch can hold content as children).
// When to use this pattern: a live preview of a colour choice. The same state ($color) feeds both the selected ring of the
// small swatches and the `color` of the big one, so they never disagree.
//
// Animation: the hover motion of a swatch stops under the visitor's reduced-motion preference; nothing else moves.
// Accessibility: the small swatches are buttons whose `label` is the colour's name (colour alone says nothing to a screen
// reader) and `selected` is announced as pressed. The big swatch has a label, so it is an image with that name.
import { Swatch } from "march/ui"

// The paints: [colour, name] pairs.
const colors: [string, string][] = [["#f2801f", "Turuncu"], ["#1d9ad6", "Gök mavisi"], ["#78be3a", "Çimen"], ["#a3338c", "Mürdüm"], ["#111827", "Gece"]]

export function TShirtPainter() {
  // Reactive state: the chosen colour (the CSS value itself).
  let $color = "#f2801f"
  return <div sx={{ flex: ["row", "center"], gap: 4 }}>
    {/* The preview. color follows the state; size="lg" and shape="square" make it a big square; checker={false} removes
        the checkerboard (the colours are solid, so it is not needed); the text between the tags is drawn over the colour. */}
    <Swatch color={$color} size="lg" shape="square" checker={false} label="Tişört önizlemesi">HADİ</Swatch>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* The paints. onClick makes each swatch a button that sets the colour; selected draws the ring and mark (a tick)
          shows it on the chosen one. */}
      {colors.map(([c, name]) => <Swatch color={c} label={name} shape="circle" mark
        selected={$color === c} onClick={() => $color = c} />)}
    </div>
  </div>
}
