// PhotoFilter: the real-life BeforeAfter example.
//
// The preview of a photo editor: the same photo, unfiltered on one side and with the chosen filter on the other. Use
// this pattern to let people judge an edit: it needs no extra image, because the "after" layer applies a CSS filter
// to the same file.
import { BeforeAfter } from "march/landing"
import { Segmented, Picture } from "march/ui"

// The available filters as CSS filter strings, keyed by the name shown in the control.
const FILTERS = { canlı: "saturate(1.6) contrast(1.1)", sıcak: "sepia(.45) saturate(1.3)", "siyah-beyaz": "grayscale(1) contrast(1.2)" } as const

export function PhotoFilter() {
  // The selected filter name (reactive state).
  let $filter: keyof typeof FILTERS = "canlı"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Segmented aria-label="Filtre" options={Object.keys(FILTERS)} bind:value={$filter} />
    {/* ratio="16 / 9" gives the area its shape (the pictures are 1280 x 720). label is the slider's accessible name.
        beforeLabel is fixed text, while afterLabel is a function, so the corner chip always names the current filter.
        Both layers are Pictures of the same file; the second gets the chosen CSS filter in its style. Each picture has its own alt text,
        which is what screen readers use: the corner labels are hidden from them. */}
    <BeforeAfter ratio="16 / 9" label="Filtre karşılaştırması" beforeLabel="Orijinal" afterLabel={() => $filter}
      before={<Picture src="/media/dusk.jpg" alt="Gün batımı, orijinal" width={1280} height={720} />}
      after={<Picture src="/media/dusk.jpg" alt="Gün batımı, filtreli" width={1280} height={720} style={{ filter: FILTERS[$filter] }} />} />
  </div>
}
