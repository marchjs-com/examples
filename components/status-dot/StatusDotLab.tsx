// StatusDotLab: the full-featured StatusDot example.
//
// What it shows: every StatusDot option: tone, pulse (ring, blink or still), size, label (an accessible name, or none
// for decoration), hollow (a ring, with a mark inside as children), class, other attributes (title, data-*) and m:color.
// Use it as a catalogue: copy the row you need.
//
// Animation: the pulse stops under the visitor's reduced-motion preference. Switch it off for
// one dot with `pulse={false}` (or leave it out); the "Hareket" row has a dot whose pulse is a function, so a button
// can stop and restart it.
// Accessibility: with `label` the dot is role="img" with that name; without it the dot is aria-hidden, so put the
// state in the text beside it, never in the colour alone.
import { StatusDot, Card, Button } from "march/ui"
import { Icon, check } from "march/icons"

// The allowed tones and sizes, in order, to draw one dot for each.
const tones = ["neutral", "primary", "info", "success", "warn", "danger"] as const
const sizes = ["xs", "sm", "md", "lg"] as const

// A small layout helper: a caption above a wrapping row of dots, so each group of options has a name on the page.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function StatusDotLab() {
  // Reactive state: whether the "live" dot is running.
  let $live = true
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* tone: neutral / primary / info / success / warn / danger. The label gives each dot an accessible name. */}
    <Row title="Ton">{tones.map((t) => <StatusDot tone={t} label={`Ton ${t}`} />)}</Row>
    {/* size: xs / sm / md / lg. */}
    <Row title="Boyut">{sizes.map((s) => <StatusDot size={s} label={`Boyut ${s}`} />)}</Row>
    <Row title="Hareket">
      {/* pulse (true) and pulse="ring" are the same breathing ring; pulse="blink" fades the dot instead. */}
      <StatusDot pulse label="Halka (true)" />
      <StatusDot pulse="ring" tone="info" label="Halka" />
      <StatusDot pulse="blink" tone="warn" label="Yanıp sönme" />
      {/* tone, pulse and label are functions of $live, so the dot's colour, motion and name change together. */}
      <StatusDot pulse={() => ($live ? "ring" : false)} tone={() => ($live ? "success" : "neutral")} label={() => ($live ? "Yayında" : "Durdu")} class="lab-live" />
      <Button size="sm" on:click={() => $live = !$live}>{() => ($live ? "Yayını durdur" : "Yayını başlat")}</Button>
    </Row>
    <Row title="Halka ve içinde işaret">
      {/* hollow draws a ring instead of a filled dot (a timeline point); children (an icon) sit inside it. */}
      <StatusDot hollow tone="success" size="lg" label="Tamam"><Icon of={check} /></StatusDot>
      <StatusDot hollow tone="danger" size="lg" label="Boş halka" />
    </Row>
    <Row title="Süs, renk, sınıf, öznitelik">
      {/* No label: a decorative dot (aria-hidden). m:color tints it with a colour token instead of a tone; `class`,
          `title` and `data-*` go to the dot itself. */}
      <StatusDot m:color="brand-orange" class="lab-dot" title="Turuncu süs" data-state="decor" />
      <StatusDot m:color="cat-5" label="Kategori 5" />
    </Row>
    {/* m:theme="night" draws this subtree in the dark theme, to check the dots on a dark ground. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">{tones.map((t) => <StatusDot tone={t} pulse="ring" />)}</Row>
    </Card>
  </div>
}
