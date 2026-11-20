import { IconTile, Card } from "march/ui"
import { heart, star, check, bell } from "march/icons"

// IconTile'ın bütün özellikleri bir arada: icon, tone (dokuz ton), size, variant, shape, label (erişilebilir ad),
// class, m:color (herhangi bir tema rengi) ve ikon yerine kendi içerik (children)
const tones = ["primary", "neutral", "success", "warn", "danger", "info", "violet", "pink", "teal"] as const
const variants = ["soft", "outline", "solid"] as const

// bir sıra karo ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function IconTileLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Tonlar">{tones.map((t) => <IconTile icon={star} tone={t} />)}</Row>
    <Row title="Görünüm × biçim">
      {variants.map((v) => <IconTile icon={heart} tone="pink" variant={v} />)}
      {variants.map((v) => <IconTile icon={heart} tone="pink" variant={v} shape="round" />)}
    </Row>
    <Row title="Boyut">
      <IconTile icon={bell} size="sm" /><IconTile icon={bell} size="md" /><IconTile icon={bell} size="lg" />
    </Row>
    <Row title="Ad, sınıf, tema rengi, kendi içerik">
      <IconTile icon={check} tone="success" label="Tamamlandı" class="lab-named" />
      <IconTile icon={star} m:color="brand-orange" variant="solid" />
      <IconTile tone="info" class="lab-own">AB</IconTile>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">{variants.map((v) => <IconTile icon={star} tone="warn" variant={v} />)}</Row>
    </Card>
  </div>
}
