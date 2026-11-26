// TripAlbum: the creative-minimal MediaGrid example.
//
// What it shows: a trip album of four photos in a square grid on a dark card; tapping a photo writes which one was
// opened under the grid.
// When to use this pattern: any small gallery where tapping a photo should do something of yours (open a lightbox, show
// details). `onOpen(index)` tells you which tile; here we use it to look up the photo's description.
//
// Accessibility: each tile is a button named by its alt text, and Enter or Space opens it. Animation: a placeholder
// shimmers until each image arrives, then the image fades in.
import { MediaGrid, Card } from "march/ui"

// Four photos made from names; alt is set to the name (in a real album use a real description).
const photos = ["sunset", "sea", "forest", "city"].map((n) => ({ src: `/media/social/${n}.svg`, alt: n }))

export function TripAlbum() {
  // The name of the photo opened last, a signal.
  let $open = "—"
  // m:theme="night" (a common prop that works on every element) draws the card and its content in the dark theme.
  return <Card m:theme="night">
    {/* gap="gap": the widest of the three spacings ("none", "thin" and "gap"). onOpen(i): called with the index of the
        tile that was tapped. */}
    <MediaGrid items={photos} gap="gap" onOpen={(i: number) => $open = photos[i]!.alt} />
    <span sx={{ text: "sm", color: "muted" }}>Açılan: {$open}</span>
  </Card>
}
