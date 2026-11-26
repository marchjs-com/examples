// CornerMarkLab: the full-featured CornerMark example; it uses every prop at least once.
//
// Props shown here: corner (four corners), icon or children, size, variant (scrim / surface / solid), ring, show (always
// / hover), overlap, label (without it the mark is decoration), class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CornerMarkLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CornerMark, Picture, Card } from "march/ui"
import { video, arrowUpRight, plus } from "march/icons"

const corners = ["top-start", "top-end", "bottom-start", "bottom-end"] as const
const variants = ["scrim", "surface", "solid"] as const

// A photo tile that hosts marks. The parent of a CornerMark must be positioned; the class m-corner-host does that and
// also makes show="hover" work (the mark appears while the host is hovered or has focus inside). tabindex="0" makes
// the tile focusable, so keyboard users can reveal hover-only marks too.
const Tile = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1, w: "sm" }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div class="m-corner-host" tabindex="0" aria-label="Odakla: köşe işareti görünür" sx={{ radius: 3 }}>
    <Picture src="/media/dusk.jpg" alt="" fit="cover" />
    {props.children}
  </div>
</div>

export function CornerMarkLab() {
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {/* corner: top-start, top-end (the default), bottom-start, bottom-end; "start" and "end" are logical, so they
        mirror in right-to-left text. size: sm / md / lg. A `label` makes the mark an image (role="img") with that
        accessible name. */}
    <Tile title="Dört köşe, üç boyut">
      {corners.map((c, i) => <CornerMark corner={c} icon={video} size={(["sm", "md", "lg", "md"] as const)[i]} label={`Video (${c})`} />)}
    </Tile>
    {/* variant: scrim (dark glass for photos, the default), surface (card colour with a shadow) or solid (filled).
        m:color (a common prop) sets the colour token. */}
    <Tile title="Üç görünüm">
      {variants.map((v, i) => <CornerMark corner={corners[i]} icon={plus} variant={v} m:color="brand-orange" label={`Ekle (${v})`} />)}
    </Tile>
    {/* show="hover": visible only while the host is hovered or focused (always visible on touch screens). Children
        instead of `icon`: any content, here a text. Without `label` the mark is decoration (hidden from screen
        readers), so use that only for marks that repeat what the page already says. */}
    <Tile title="Üstüne gelince (show=hover), metin içerik">
      <CornerMark show="hover" variant="surface" icon={arrowUpRight} label="Aç" class="lab-hover" />
      <CornerMark corner="bottom-start" variant="solid" m:color="brand-blue">4K</CornerMark>
    </Tile>
    {/* ring: a ring in the surface colour that cuts the mark out of what is behind it; overlap: half outside the
        corner, like a badge. class lets a test find this one. m:theme="night" draws the card in the dark theme. */}
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
