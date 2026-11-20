import { BeforeAfter } from "march/landing"
import { Segmented, Picture } from "march/ui"

// bir fotoğraf düzenleyicinin önizlemesi: aynı fotoğraf, filtresiz ve seçilen filtreyle
const FILTERS = { canlı: "saturate(1.6) contrast(1.1)", sıcak: "sepia(.45) saturate(1.3)", "siyah-beyaz": "grayscale(1) contrast(1.2)" } as const

export function PhotoFilter() {
  let $filter: keyof typeof FILTERS = "canlı"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Segmented aria-label="Filtre" options={Object.keys(FILTERS)} bind:value={$filter} />
    <BeforeAfter ratio="16 / 9" label="Filtre karşılaştırması" beforeLabel="Orijinal" afterLabel={() => $filter}
      before={<Picture src="/media/dusk.jpg" alt="Gün batımı, orijinal" width={1280} height={720} />}
      after={<Picture src="/media/dusk.jpg" alt="Gün batımı, filtreli" width={1280} height={720} style={{ filter: FILTERS[$filter] }} />} />
  </div>
}
