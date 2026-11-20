import { MediaGrid, Segmented } from "march/ui"

// gönderi fotoğrafları: sayı seçilir, 1, 2, 3 ve 4+ için ayrı yerleşim; fazlası +N
const all = ["sunset", "sea", "forest", "city", "coffee", "ride"].map((n) => ({ src: `/media/social/${n}.svg`, alt: n }))

export function PostPhotos() {
  let $n = "3"
  return <div sx={{ flex: "col", gap: 2 }}>
    <Segmented aria-label="Fotoğraf" value={$n} options={["1", "2", "3", "4", "6"]} onChange={(v: string) => $n = v} />
    {() => <MediaGrid items={all.slice(0, Number($n))} />}
  </div>
}
