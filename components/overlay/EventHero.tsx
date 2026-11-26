// EventHero: the real-life Overlay example.
//
// A hero banner for an event: a quiet looping video in the background, a vignette to darken the edges and a glass panel
// in front. The layers are decoration: they take no clicks, so the sign-up button underneath keeps working. Use this
// pattern for a landing-page hero with media behind the text.
import { Overlay, Button, Badge } from "march/ui"

export function EventHero() {
  // Reactive seat count; the text and the button read it.
  let $seats = 42
  // The section is the container: an Overlay fills the container it is placed in, and the layers stack in the order they
  // are written (first = bottom).
  return <section sx={{ flex: "col", gap: 3, p: 8, radius: 4, shadow: 2 }}>
    {/* 1. Video: src (the extension tells it is a video). It is muted and loops, plays only while visible, and stays
           still under reduced motion; `poster` is the image shown instead on save-data or reduced motion.
        2. effect="vignette": a CSS effect that darkens the edges; opacity={0.7} makes it softer.
        3. effect="glass" with `front`: this layer is drawn ABOVE the content (the others are behind it); inset={4} keeps
           it away from the edge, opacity={0.35} keeps it faint.
        Overlays are decorative by default: aria-hidden, inert, no pointer events, so clicks reach the button below and
        screen readers skip them. */}
    <Overlay src="/media/hadi-waves.webm" poster="/media/hadi-waves.jpg" />
    <Overlay effect="vignette" opacity={0.7} />
    <Overlay effect="glass" front inset={4} opacity={0.35} />
    <div><Badge tone="danger" pulse>Canlı</Badge></div>
    <strong sx={{ text: "2xl" }}>HADİ Konferansı 2026</strong>
    <span>İstanbul · 12 Aralık · {() => $seats} koltuk kaldı</span>
    <div><Button disabled={$seats === 0} on:click={() => $seats--}>{() => ($seats ? "Kayıt ol" : "Doldu")}</Button></div>
  </section>
}
