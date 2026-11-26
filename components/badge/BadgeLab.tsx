// BadgeLab: the full-featured Badge example; it uses every prop at least once.
//
// Props shown here: tone, variant, size, count (with max, showZero, label, format), dot (built-in or your own mark),
// dotColor, pulse, onClick with pressed and disabled, ariaLabel, class and the content (children).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// BadgeLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Badge, Card } from "march/ui"
import { heart, Icon } from "march/icons"

// The tone names: each is a colour family (neutral grey, info, success, warn, danger).
const tones = ["neutral", "info", "success", "warn", "danger"] as const

// A titled row of badges, so each group below has a small caption.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function BadgeLab() {
  // $n is the live count of the first count badge (the "+1 ekle" badge raises it); $on is the pressed state of the
  // toggle badge. Plain `let $x` variables are reactive state.
  let $n = 0
  let $on = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Tones: the same five tones twice, as a soft (light) badge and as variant="solid" (the tone's full colour). */}
    <Row title="Ton (hafif / tam renk)">
      {tones.map((t) => <Badge tone={t}>{t}</Badge>)}
      {tones.map((t) => <Badge tone={t} variant="solid">{t}</Badge>)}
    </Row>
    {/* Counts. count as a function stays live and the badge hides itself at 0; `label` is read after the number by
        screen readers ("1 yeni"). showZero keeps 0 visible. A count above `max` (default 99) shows "99+". size="xs" is
        the mini badge for the corner of an icon button. `format` writes your own text for the number. */}
    <Row title="Sayı">
      <Badge count={() => $n} label="yeni" class="lab-count" />
      <Badge count={0} showZero />
      <Badge count={120} />
      <Badge count={12} max={9} size="xs" />
      <Badge count={5} format={(n: number) => `${n} yeni`} tone="info" />
    </Row>
    {/* Dots. dot draws a coloured dot before the text; dotColor recolours it. pulse draws a pulsing status dot by
        itself ("blink" is the other style); the pulse is part of the component's motion and follows reduced motion and
        the global speed / "Stop all" settings. dot also takes your own node, such as an icon. */}
    <Row title="Nokta">
      <Badge tone="warn" dot>Bekliyor</Badge>
      <Badge dot dotColor="brand-purple">Mor nokta</Badge>
      <Badge tone="danger" pulse>Canlı</Badge>
      <Badge tone="success" pulse="blink">Kayıt</Badge>
      <Badge dot={<Icon of={heart} /> as Node}>Favori</Badge>
    </Row>
    {/* Pressable badges. onClick turns the badge into a real <button>. With `pressed` it is a toggle (aria-pressed);
        ariaLabel gives the accessible name when the short text ("v2") does not say enough; disabled blocks presses. */}
    <Row title="Basılabilir">
      <Badge tone="info" onClick={() => $n++}>+1 ekle</Badge>
      <Badge tone="primary" pressed={() => $on} onClick={() => $on = !$on} ariaLabel="Sürüm iki filtresi">v2</Badge>
      <Badge disabled onClick={() => $n++}>kapalı</Badge>
    </Row>
    {/* m:theme="night" on the Card shows the badges on a dark surface. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">{tones.map((t) => <Badge tone={t} dot>{t}</Badge>)}</Row>
    </Card>
  </div>
}
