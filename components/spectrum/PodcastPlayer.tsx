import { Spectrum, Button, Card, Segmented } from "march/ui"
import { audioSource } from "march/audio"

// PodcastPlayer: a podcast card. While the episode plays, its frequencies flow along the card; the listener picks the
// look. It shows a spectrum used as a quiet, decorative companion to a player, and a reactive prop (variant) bound to
// a control.
export function PodcastPlayer() {
  // The episode: the "demo" loop stands in for a real file here. With { audible: true } it plays on the speakers. In
  // your app pass the <audio> element instead: audioSource(audioEl).
  const episode = audioSource("demo", { audible: true })
  // The chosen look, shared with the Segmented control below.
  let $look: "bars" | "mirror" | "line" = "mirror"
  return <Card title="Bölüm 12 · Sesin rengi" subtitle="Haftalık bilim sohbeti">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* variant={$look} is reactive: picking another look redraws the same spectrum, nothing is rebuilt.
          minHz / maxHz narrow the range to where speech and music live (40 Hz – 12 kHz), so no bars are wasted on
          empty extremes. A short height (96 px) keeps it a strip under the title. idleText shows while paused.
          label names the image for screen readers, which hear the level in words at most once a second. */}
      <Spectrum source={episode} variant={$look} bars={40} minHz={40} maxHz={12000} height={96} label="Bölüm sesi" idleText="Duraklatıldı" />
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        {/* Play / pause from a click (browsers only start audio on a user gesture); the label follows episode.active(). */}
        <Button on:click={() => (episode.active() ? episode.stop() : episode.start())}>{() => (episode.active() ? "⏸ Duraklat" : "▶ Dinle")}</Button>
        {/* bind:value keeps $look and the control in sync both ways; arrow keys move between the options, and
            aria-label names the group for screen readers. */}
        <Segmented size="sm" bind:value={$look} aria-label="Görünüm" options={[{ value: "bars", label: "Çubuk" }, { value: "mirror", label: "Ayna" }, { value: "line", label: "Çizgi" }]} />
      </div>
    </div>
  </Card>
}
