// PostPhotos: the real-life MediaGrid example.
//
// What it shows: the photos of a social post. A segmented control picks how many photos the post has (1, 2, 3, 4 or 6) and
// the grid lays them out the way a social app would: one photo in its own shape, two side by side, one large and two
// stacked, a 2x2 grid, and from five up the last tile shows "+N".
// When to use this pattern: posts, product galleries, message attachments. MediaGrid chooses the layout from the number of
// items, so you only pass the list; add onOpen to open a lightbox when a tile is tapped.
//
// Accessibility: the grid is a group named "N photos", and every tile is a button named by its alt text. Animation: a
// placeholder shimmers until the image arrives, then the image fades in.
import { MediaGrid, Segmented } from "march/ui"

// Six photos made from names. alt is set to the name (in a real post use a real description).
const all = ["sunset", "sea", "forest", "city", "coffee", "ride"].map((n) => ({ src: `/media/social/${n}.svg`, alt: n }))

export function PostPhotos() {
  // The chosen number of photos, a signal (Segmented values are strings).
  let $n = "3"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* One-way binding: value shows $n and onChange writes the new choice back. */}
    <Segmented aria-label="Fotoğraf" value={$n} options={["1", "2", "3", "4", "6"]} onChange={(v: string) => $n = v} />
    {/* The grid sits in a live region that reads $n, so it is built again with the first N photos when the choice
        changes. Only `items` is given: layout, tile names and the "+N" tile all come from the defaults. */}
    {() => <MediaGrid items={all.slice(0, Number($n))} />}
  </div>
}
