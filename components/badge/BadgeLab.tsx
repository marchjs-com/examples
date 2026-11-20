import { Badge, Card } from "march/ui"
import { heart, Icon } from "march/icons"

// Badge'in bütün özellikleri bir arada: tone, variant, size, count (max, showZero, label, format), dot (hazır / kendi),
// dotColor, pulse, onClick + pressed + disabled, ariaLabel, class ve içerik (children)
const tones = ["neutral", "info", "success", "warn", "danger"] as const

// bir sıra rozet ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function BadgeLab() {
  let $n = 0
  let $on = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Ton (hafif / tam renk)">
      {tones.map((t) => <Badge tone={t}>{t}</Badge>)}
      {tones.map((t) => <Badge tone={t} variant="solid">{t}</Badge>)}
    </Row>
    <Row title="Sayı">
      <Badge count={() => $n} label="yeni" class="lab-count" />
      <Badge count={0} showZero />
      <Badge count={120} />
      <Badge count={12} max={9} size="xs" />
      <Badge count={5} format={(n: number) => `${n} yeni`} tone="info" />
    </Row>
    <Row title="Nokta">
      <Badge tone="warn" dot>Bekliyor</Badge>
      <Badge dot dotColor="brand-purple">Mor nokta</Badge>
      <Badge tone="danger" pulse>Canlı</Badge>
      <Badge tone="success" pulse="blink">Kayıt</Badge>
      <Badge dot={<Icon of={heart} /> as Node}>Favori</Badge>
    </Row>
    <Row title="Basılabilir">
      <Badge tone="info" onClick={() => $n++}>+1 ekle</Badge>
      <Badge tone="primary" pressed={() => $on} onClick={() => $on = !$on} ariaLabel="Sürüm iki filtresi">v2</Badge>
      <Badge disabled onClick={() => $n++}>kapalı</Badge>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">{tones.map((t) => <Badge tone={t} dot>{t}</Badge>)}</Row>
    </Card>
  </div>
}
