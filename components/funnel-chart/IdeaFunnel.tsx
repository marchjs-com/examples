import { FunnelChart } from "march/charts"
import { Button } from "march/ui"

// The idea funnel: a playful, minimal FunnelChart.
// A company-wide idea box: every new idea enters at the top, but only a few make it out: half become drafts, a quarter
// prototypes, a tenth ship. "Yeni fikirler" (new ideas) brings in 400 more, and you watch the stages widen as the flow
// passes through.
// Use a funnel whenever a flow loses people (or things) step by step and the question is where they drop off.
export function IdeaFunnel() {
  // The number of ideas at the top; every lower stage is derived from it.
  let $ideas = 1200
  // Rows use FunnelChart's default keys (label, value), so no x / y props are needed. Math.max(1, …) keeps at least one
  // idea in the last stage, so it never disappears.
  const data = () => [
    { label: "Fikir 💡", value: $ideas },
    { label: "Taslak ✏️", value: Math.round($ideas * 0.5) },
    { label: "Prototip 🛠️", value: Math.round($ideas * 0.25) },
    { label: "Yayında 🚀", value: Math.max(1, Math.round($ideas * 0.1)) },
  ]
  // FunnelChart props:
  // - color="brand-purple": one hue for every stage, fading stage by stage, instead of one palette color per stage.
  // - Each stage shows its value, its share of the first stage (showShare) and the step conversion between stages
  //   (showConversion); set any of them to {false} to keep a stage quieter.
  // - format="compact" would shorten the values (1,2 B instead of 1.200); any pipe name, [pipe, ...args] or a function
  //   works, and the tooltip and data table use it too.
  // - No `animate` prop: the default spring, so stages pour in one after another on the first draw and widths morph
  //   to the new values on every click. animate={false} draws in place, "out" glides without overshoot; reduced
  //   motion is honoured automatically.
  // Accessibility: title names the SVG, a hidden table lists stage, value, share and conversion, and Tab + ↑ ↓ walk
  // the stages.
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button size="sm" on:click={() => { $ideas += 400 }}>Yeni fikirler 💡</Button>
    <FunnelChart data={data} color="brand-purple" title="Fikir hunisi" height={240} />
  </div>
}
