import { StatusDot, Card, Button } from "march/ui"
import { Icon, check } from "march/icons"

// StatusDot'un bütün özellikleri bir arada: tone, pulse (halka, yanıp sönme, durgun), size, label (erişilebilir ad
// ya da süs), hollow (+ içinde işaret: children), class, diğer öznitelikler (title, data-*) ve m:color
const tones = ["neutral", "primary", "info", "success", "warn", "danger"] as const
const sizes = ["xs", "sm", "md", "lg"] as const

// bir sıra nokta ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function StatusDotLab() {
  let $live = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Ton">{tones.map((t) => <StatusDot tone={t} label={`Ton ${t}`} />)}</Row>
    <Row title="Boyut">{sizes.map((s) => <StatusDot size={s} label={`Boyut ${s}`} />)}</Row>
    <Row title="Hareket">
      <StatusDot pulse label="Halka (true)" />
      <StatusDot pulse="ring" tone="info" label="Halka" />
      <StatusDot pulse="blink" tone="warn" label="Yanıp sönme" />
      <StatusDot pulse={() => ($live ? "ring" : false)} tone={() => ($live ? "success" : "neutral")} label={() => ($live ? "Yayında" : "Durdu")} class="lab-live" />
      <Button size="sm" on:click={() => $live = !$live}>{() => ($live ? "Yayını durdur" : "Yayını başlat")}</Button>
    </Row>
    <Row title="Halka ve içinde işaret">
      <StatusDot hollow tone="success" size="lg" label="Tamam"><Icon of={check} /></StatusDot>
      <StatusDot hollow tone="danger" size="lg" label="Boş halka" />
    </Row>
    <Row title="Süs, renk, sınıf, öznitelik">
      <StatusDot m:color="brand-orange" class="lab-dot" title="Turuncu süs" data-state="decor" />
      <StatusDot m:color="cat-5" label="Kategori 5" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">{tones.map((t) => <StatusDot tone={t} pulse="ring" />)}</Row>
    </Card>
  </div>
}
