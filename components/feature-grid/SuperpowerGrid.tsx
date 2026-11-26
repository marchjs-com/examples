// SuperpowerGrid: the creative-minimal FeatureGrid example.
//
// What it shows: pick a superpower. Each press adds one more power to the grid, and after six it starts again from one.
// The tiles enter with a scale effect (reveal="scale").
// When to use this pattern: the lightest FeatureGrid: items only, in the plain variant (no boxes), with an entrance effect.
// Animation: reveal chooses the entrance (fade, up, down, start, end, scale, blur, flip, none, or your own { from, to }); it
// runs on the motion engine and is skipped with reduced motion.
import { FeatureGrid } from "march/landing"
import { Button } from "march/ui"
import { zap, eye, globe, clock, heart, star } from "march/icons"

// Each item is { icon, title, body }.
const POWERS = [
  { icon: zap, title: "Şimşek hızı", body: "Kahve soğumadan iş biter." },
  { icon: eye, title: "Röntgen bakışı", body: "Hatayı kod okumadan görürsün." },
  { icon: globe, title: "Işınlanma", body: "Toplantıya trafiksiz gidersin." },
  { icon: clock, title: "Zamanı durdur", body: "Cuma akşamı biraz daha uzar." },
  { icon: heart, title: "Herkes sever", body: "Kod incelemesi tek seferde geçer." },
  { icon: star, title: "Şans yıldızı", body: "Derleme her zaman yeşil." },
]

// $count is how many powers are shown.
export function SuperpowerGrid() {
  let $count = 2
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={() => $count = $count >= POWERS.length ? 1 : $count + 1}>
      {$count >= POWERS.length ? "Baştan başla" : `Bir güç daha (${$count}/${POWERS.length})`}
    </Button>
    {/* A function child builds the grid again when $count changes, so the new tiles get their entrance; items is the first n
            powers; variant="plain" draws no boxes; cols={3} is three columns; reveal="scale" is the entrance effect. */}
    {() => { const n = $count; return <FeatureGrid variant="plain" cols={3} reveal="scale" items={POWERS.slice(0, n)} /> }}
  </div>
}
