import { AudioReactive, Avatar, Button } from "march/ui"

// AudioReactiveLab: every AudioReactive prop in one place.
// AudioReactive is a wrapper that makes anything move with a sound. On each reading of its source it writes five CSS
// variables on itself, each 0–1: --m-level, --m-bass, --m-mid, --m-treble and --m-peak. A ready effect reads them
// (pulse, glow, ring, bounce), or your own CSS does. Use it for "who is speaking" rings, beat-driven decoration and
// playful UI; it is decoration, so the meaning must also be said in text or by a role and name.
//
// Props shown below: source (a number accessor 0–1), as, gain, smoothing, vars (a list or names), effect (pulse,
// glow, ring, bounce; one or a list), color, intensity, motion, onLevel, class, children, other attributes.
export function AudioReactiveLab() {
  // The level the buttons set. Every wrapper below uses source={() => $v}: a number accessor is a source in itself
  // (march/audio turns it into a synthetic signal of that loudness), with no permission and no click needed.
  let $v = 0.3
  // The last level reported by onLevel, shown under the row.
  let $last = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls; lab-* classes are hooks for AudioReactiveLab.test.tsx: "Yüksek" (loud), "Orta" (medium),
        "Sessiz" (silent). */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-loud" size="sm" on:click={() => { $v = 0.9 }}>Yüksek</Button>
      <Button class="lab-mid" size="sm" variant="ghost" on:click={() => { $v = 0.4 }}>Orta</Button>
      <Button class="lab-quiet" size="sm" variant="ghost" on:click={() => { $v = 0 }}>Sessiz</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 5 }}>
      {/* 1. A speaker ring around an avatar. effect="ring" draws a growing ring; color is its theme token; intensity
          (0–2, default 1) sets the strength of the effects.
          Accessibility: the wrapper adds no role on its own. Here the motion means "Ada is speaking", so the wrapper
          gets role="img" and an aria-label (other attributes pass through to the element), and the Avatar inside is
          `decorative` so the name is not read twice. */}
      <AudioReactive class="lab-ring" source={() => $v} effect="ring" color="brand-pink" intensity={1.4} role="img" aria-label="Konuşan: Ada">
        <Avatar name="Ada" size="lg" decorative />
      </AudioReactive>
      {/* 2. as="span" picks the element (default div), so the wrapper fits inside text. effect takes a list: pulse
          (scales) and glow (a soft light) together. gain multiplies every reading (then clamped to 1); smoothing
          (0–0.99) slows the fall while a rise stays instant, so the motion looks less nervous. onLevel receives
          { level, bass, mid, treble, peak } after each reading: use it to drive your own logic. */}
      <AudioReactive class="lab-span" as="span" source={() => $v} effect={["pulse", "glow"]} gain={1.5} smoothing={0.6}
        onLevel={(l) => { $last = Math.round(l.level * 100) }} sx={{ text: "2xl" }}>🎵</AudioReactive>
      {/* 3. vars as names: write the level as --ses (your own name) and leave --m-peak out (false). Variables you do
          not name keep their default names. effect="bounce" jumps on the bass. Note that the built-in effects read the
          default names, so renamed variables are for your own CSS, e.g. sx={{ opacity: "calc(.4 + var(--ses) * .6)" }}. */}
      <AudioReactive class="lab-vars" as="span" source={() => $v} vars={{ level: "--ses", peak: false }} effect="bounce" sx={{ text: "2xl" }}>🔊</AudioReactive>
      {/* 4. vars as a list: write only --m-bass. Fewer variables mean fewer style writes per frame. */}
      <AudioReactive class="lab-list" as="span" source={() => $v} vars={["bass"]} sx={{ text: "2xl" }}>🥁</AudioReactive>
      {/* 5. motion={false}: the variables stay 0, so nothing moves. Users who ask their OS for reduced motion get a
          softer version automatically: the source reads twice a second, pulse and bounce stop changing size and
          place, while light and color still follow the sound. */}
      <AudioReactive class="lab-still" as="span" source={() => $v} motion={false} effect="pulse" sx={{ text: "2xl" }}>😴</AudioReactive>
    </div>
    {/* "Son düzey" (last level): written by onLevel above, 0–100. */}
    <span sx={{ text: "sm" }}>Son düzey: <span class="lab-last">{$last}</span></span>
  </div>
}
