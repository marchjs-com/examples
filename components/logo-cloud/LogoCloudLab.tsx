// LogoCloudLab: the full-featured LogoCloud example; it uses every prop at least once.
//
// Props shown here: logos (name, src, width, height, node, href), variant (grid or marquee), title (can be a function),
// mono (one muted tone), speed (marquee), reveal (entrance motion of the grid) and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LogoCloudLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Animation: the marquee fades at its edges, stops while off screen and stays still under reduced motion. reveal="none"
// below shows the grid cells at once, with no entrance motion (the other values are the Reveal effects, for example "up").
// Accessibility: each logo is named by its `name` (alt text for an image, aria-label for an inline node).
import { LogoCloud } from "march/landing"
import { Card, Segmented, Toggle, Button } from "march/ui"

// A small inline-SVG logo: a coloured dot and a label. It is hidden from screen readers (aria-hidden) because the
// LogoCloud item already gets its accessible name from `name`. fill is a plain colour string.
const Dot = (p: { fill: string; label: string }) => <svg width="96" height="28" viewBox="0 0 96 28" aria-hidden="true">
  <circle cx="14" cy="14" r="10" fill={p.fill} /><text x="30" y="19" font-size="13" fill="currentColor">{p.label}</text>
</svg>

export function LogoCloudLab() {
  // Signals: the view, the one-tone switch and a counter that grows the title.
  let $variant: "grid" | "marquee" = "grid"
  let $mono = true
  let $count = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls: the view and the one-tone switch. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={[{ value: "grid", label: "grid" }, { value: "marquee", label: "marquee" }]} bind:value={$variant} />
        <Toggle label="Tek ton" bind:value={$mono} />
      </div>
    </Card>
    {() => {
      // The cloud is drawn again when the states read on this line change. The title is a function, so it updates by
      // itself without redrawing the cloud.
      const variant = $variant, mono = $mono
      return <LogoCloud variant={variant} mono={mono} speed={30} reveal="none" class="lab-logos"
      title={() => `Bize güvenen ${4 + $count} ekip`}
      logos={[
        { name: "Dalga", src: "/media/hadi-waves.jpg", width: 96, height: 28 },
        { name: "Turuncu", node: <Dot fill="#ff7a59" label="Turuncu" />, href: "#turuncu" },
        { name: "Mor", node: <Dot fill="#7c5cff" label="Mor" /> },
        { name: "Mavi", node: <Dot fill="#2bb8ff" label="Mavi" /> },
      ]} />
    }}
    <Button on:click={() => $count++}>Ekip ekle</Button>
  </div>
}
