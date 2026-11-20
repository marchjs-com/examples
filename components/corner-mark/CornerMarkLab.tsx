import { CornerMark, Picture, Card } from "march/ui"
import { video, arrowUpRight, plus } from "march/icons"

// CornerMark'ın bütün özellikleri bir arada: corner (dört köşe), icon ya da children, size, variant (scrim / surface /
// solid), ring, show (always / hover), overlap, label (yoksa süs), class ve m:color
const corners = ["top-start", "top-end", "bottom-start", "bottom-end"] as const
const variants = ["scrim", "surface", "solid"] as const

// köşeli bir fotoğraf karosu
const Tile = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1, w: "sm" }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div class="m-corner-host" tabindex="0" aria-label="Odakla: köşe işareti görünür" sx={{ radius: 3 }}>
    <Picture src="/media/dusk.jpg" alt="" fit="cover" />
    {props.children}
  </div>
</div>

export function CornerMarkLab() {
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    <Tile title="Dört köşe, üç boyut">
      {corners.map((c, i) => <CornerMark corner={c} icon={video} size={(["sm", "md", "lg", "md"] as const)[i]} label={`Video (${c})`} />)}
    </Tile>
    <Tile title="Üç görünüm">
      {variants.map((v, i) => <CornerMark corner={corners[i]} icon={plus} variant={v} m:color="brand-orange" label={`Ekle (${v})`} />)}
    </Tile>
    <Tile title="Üstüne gelince (show=hover), metin içerik">
      <CornerMark show="hover" variant="surface" icon={arrowUpRight} label="Aç" class="lab-hover" />
      <CornerMark corner="bottom-start" variant="solid" m:color="brand-blue">4K</CornerMark>
    </Tile>
    <Card m:theme="night">
      <div sx={{ flex: "col", gap: 1 }}>
        <span sx={{ text: "xs", color: "muted" }}>Halka ve taşma (koyu zemin), süs</span>
        <span class="m-corner-host" sx={{ display: "inline-block", p: 4, radius: 4, shadow: 1 }}>
          <strong>HADİ</strong>
          <CornerMark corner="top-end" icon={plus} variant="solid" m:color="success" size="sm" ring overlap class="lab-badge" />
        </span>
      </div>
    </Card>
  </div>
}
