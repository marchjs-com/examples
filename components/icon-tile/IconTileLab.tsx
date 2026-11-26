// IconTileLab: the full-featured IconTile example; it uses every prop at least once.
//
// Props shown here: icon, tone (all nine), size, variant, shape, label (an accessible name), class, m:color (any theme
// colour) and children (your own content instead of the icon).
// Use it as a reference when you need one option: find the prop below and copy the line.
// IconTileLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { IconTile, Card } from "march/ui"
import { heart, star, check, bell } from "march/icons"

// The nine named tones and the three variants.
const tones = ["primary", "neutral", "success", "warn", "danger", "info", "violet", "pink", "teal"] as const
const variants = ["soft", "outline", "solid"] as const

// A row of tiles with a caption above. It only organises the lab.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function IconTileLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* tone: one of the nine named tints. */}
    <Row title="Tonlar">{tones.map((t) => <IconTile icon={star} tone={t} />)}</Row>
    {/* variant: "soft" (tinted ground), "outline" (framed plain ground), "solid" (filled), each in the square and the round shape. */}
    <Row title="Görünüm × biçim">
      {variants.map((v) => <IconTile icon={heart} tone="pink" variant={v} />)}
      {variants.map((v) => <IconTile icon={heart} tone="pink" variant={v} shape="round" />)}
    </Row>
    {/* size: sm, md, lg. */}
    <Row title="Boyut">
      <IconTile icon={bell} size="sm" /><IconTile icon={bell} size="md" /><IconTile icon={bell} size="lg" />
    </Row>
    {/* label makes the tile role="img" with that name (without it the tile is decorative); class is a hook for tests and CSS;
        m:color takes any theme colour token instead of a tone; children replace the icon with your own content. */}
    <Row title="Ad, sınıf, tema rengi, kendi içerik">
      <IconTile icon={check} tone="success" label="Tamamlandı" class="lab-named" />
      <IconTile icon={star} m:color="brand-orange" variant="solid" />
      <IconTile tone="info" class="lab-own">AB</IconTile>
    </Row>
    {/* On a dark surface (m:theme="night") the tones keep their contrast, because colours come from theme tokens. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">{variants.map((v) => <IconTile icon={star} tone="warn" variant={v} />)}</Row>
    </Card>
  </div>
}
