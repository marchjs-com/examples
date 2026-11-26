// ColorDiary: the creative-minimal StoryViewer example.
//
// What it shows: a "colours of the day" story. One button opens a full-screen viewer with four colour pictures (dawn, noon,
// sunset, night), two seconds each. When the last one ends, the viewer closes by itself.
// When to use this pattern: a single self-contained story from a button, with the extras switched off: no arrows, no avatar
// and no time. `groups` is a list of people ({ id, name, items }); each item has an id, a picture `src`, an optional caption
// and an optional own `duration`.
//
// Animation: the progress bars fill on March's motion engine as an "essential" animation (they keep time even under the
// visitor's reduced-motion preference); "pause all" and the global speed still apply. A press and hold pauses, a swipe
// moves between people and dragging down closes.
// Accessibility: the viewer is a modal dialog: focus stays inside, Esc closes it and focus returns to the button that opened
// it. ← / → move between stories (mirrored in RTL) and Space pauses; a polite live region announces the position.
import { StoryViewer, Button } from "march/ui"

// The pictures: 2×2 pixel PNGs (the browser blends the four colours softly when it scales them up).
const PHOTOS = {
  sea: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGOoOfZCv34Hw+ebS17sqAAANsYIGXUpO/0AAAAASUVORK5CYII=",
  dawn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGP4f7nrf382w/eVR/qzbwAAPqoIjEiz040AAAAASUVORK5CYII=",
  city: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOQ1Y7Ktl/AwC9h+mCBFQAYjgQDFgLe2AAAAABJRU5ErkJggg==",
  sunset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4vznmf3Y0wyHHKm+tbAAzQwYxpZcJIQAAAABJRU5ErkJggg==",
}
// One group (one "person") with four items, shown in order.
const DAY = [{
  id: "day", name: "Renk günlüğü", items: [
    { id: "dawn", src: PHOTOS.dawn, caption: "06:40 · şafak pembesi" },
    { id: "sea", src: PHOTOS.sea, caption: "12:15 · öğle mavisi" },
    { id: "sunset", src: PHOTOS.sunset, caption: "18:50 · gün batımı" },
    { id: "city", src: PHOTOS.city, caption: "23:30 · şehir gecesi" },
  ],
}]

export function ColorDiary() {
  // Reactive state: whether the viewer is open.
  let $open = false
  return <div sx={{ flex: ["row", "center"], gap: 2 }}>
    {/* The button that opens the viewer. m:color tints it with a colour token. */}
    <Button variant="primary" m:color="brand-pink" on:click={() => $open = true}>🎨 Günün renklerini aç</Button>
    {/* open and onClose: the viewer is controlled by $open (Esc, the close button and dragging down call onClose).
        duration: 2000 ms per story. arrows={false}: no previous / next buttons (taps, swipes and the arrow keys still
        move). avatar={false} and time={false}: no avatar and no relative time in the header. */}
    <StoryViewer open={$open} onClose={() => $open = false} groups={DAY} duration={2000} arrows={false} avatar={false} time={false} />
  </div>
}
