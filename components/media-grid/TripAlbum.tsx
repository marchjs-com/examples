import { MediaGrid, Card } from "march/ui"

// gezi albümü: dört fotoğraf kare ızgarada; dokununca hangisi açıldı yazılır
const photos = ["sunset", "sea", "forest", "city"].map((n) => ({ src: `/media/social/${n}.svg`, alt: n }))

export function TripAlbum() {
  let $open = "—"
  return <Card m:theme="night">
    <MediaGrid items={photos} gap="gap" onOpen={(i: number) => $open = photos[i]!.alt} />
    <span sx={{ text: "sm", color: "muted" }}>Açılan: {$open}</span>
  </Card>
}
