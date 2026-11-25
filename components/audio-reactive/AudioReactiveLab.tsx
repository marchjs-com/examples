import { AudioReactive, Avatar, Button } from "march/ui"

// AudioReactive'in bütün özellikleri: source (bir sayı erişimcisi 0–1), as, gain, smoothing, vars (liste ya da adlar),
// effect (pulse, glow, ring, bounce; biri ya da liste), color, intensity, motion, onLevel, class, children, öznitelikler
export function AudioReactiveLab() {
  let $v = 0.3
  let $last = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-loud" size="sm" on:click={() => { $v = 0.9 }}>Yüksek</Button>
      <Button class="lab-mid" size="sm" variant="ghost" on:click={() => { $v = 0.4 }}>Orta</Button>
      <Button class="lab-quiet" size="sm" variant="ghost" on:click={() => { $v = 0 }}>Sessiz</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 5 }}>
      <AudioReactive class="lab-ring" source={() => $v} effect="ring" color="brand-pink" intensity={1.4} role="img" aria-label="Konuşan: Ada">
        <Avatar name="Ada" size="lg" decorative />
      </AudioReactive>
      <AudioReactive class="lab-span" as="span" source={() => $v} effect={["pulse", "glow"]} gain={1.5} smoothing={0.6}
        onLevel={(l) => { $last = Math.round(l.level * 100) }} sx={{ text: "2xl" }}>🎵</AudioReactive>
      <AudioReactive class="lab-vars" as="span" source={() => $v} vars={{ level: "--ses", peak: false }} effect="bounce" sx={{ text: "2xl" }}>🔊</AudioReactive>
      <AudioReactive class="lab-list" as="span" source={() => $v} vars={["bass"]} sx={{ text: "2xl" }}>🥁</AudioReactive>
      <AudioReactive class="lab-still" as="span" source={() => $v} motion={false} effect="pulse" sx={{ text: "2xl" }}>😴</AudioReactive>
    </div>
    <span sx={{ text: "sm" }}>Son düzey: <span class="lab-last">{$last}</span></span>
  </div>
}
