import { Spectrum, Button } from "march/ui"
import { audioSource } from "march/audio"

// PartyLights: the music beats around a ring in the four HADİ colors, bass starting at the top and treble going round.
// Before the music starts a test tone lights the ring (a number source: no permission, no click needed).
// The pattern to learn: show something alive at once, then switch to real audio after the user's click.
export function PartyLights() {
  // The "demo" loop with { audible: true }: it is sent to the speakers too (the demo is silent by default). Real audio
  // can only start from a user gesture, so the button starts it.
  const party = audioSource("demo", { audible: true })
  // A number source starts at once; the 0.6 becomes a steady synthetic tone.
  const tone = audioSource(() => 0.6)
  return <div sx={{ flex: ["col", "center"], gap: 2 }}>
    {/* A function child re-runs when party.active() changes and renders the spectrum with the tone or the music.
        variant="circle" draws the bars around a ring; colors="brand" paints low to high with the four HADİ colors;
        72 thin bars (gap 1 px) make it a full ring; height is in px. label names the image for screen readers, which
        hear the level in words at most once a second. Under reduced motion the caps do not fall and the source reads
        twice a second. */}
    {() => <Spectrum source={party.active() ? party : tone} variant="circle" colors="brand" bars={72} gap={1} height={260} label="Parti ışıkları" />}
    {/* One button plays and silences the music; its label follows party.active(). */}
    <Button on:click={() => (party.active() ? party.stop() : party.start())}>{() => (party.active() ? "⏹ Sustur" : "🎶 Müziği başlat")}</Button>
  </div>
}
