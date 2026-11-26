import { LoudnessGraph, Button, Card, Badge } from "march/ui"
import { audioSource, loudness } from "march/audio"
import { onCleanup } from "march"

// StreamCheck: the real-life LoudnessGraph example.
// A loudness check before publishing a track to a streaming service: play the song, watch its short-term and
// integrated loudness against the −14 LUFS target, and read the stereo correlation to catch phase problems. A badge
// gives the verdict in words. Use this pattern in an upload flow, a podcast editor or a live-stream dashboard.
export function StreamCheck() {
  // The song: the "demo" loop of march/audio (no file, no permission), audible so you hear what you measure. In an app
  // this would be audioSource(audioElement) for the uploaded file.
  const song = audioSource("demo", { audible: true })
  // The same readings without a graph: loudness(source) gives momentary / shortTerm / integrated / correlation as
  // signals. Here it feeds the verdict badge; the graph below makes its own from the same source.
  const lu = loudness(song)
  onCleanup(() => song.stop())
  let $playing = false
  async function toggle() {
    if ($playing) song.stop()
    else { lu.reset(); await song.start() }
    $playing = song.active()
  }
  // The verdict: within 1 LU of −14 is fine, louder will be turned down by the service, quieter sounds weak.
  const verdict = () => {
    const i = lu.integrated()
    if (i <= -70) return { tone: "neutral", text: "Ölçüm bekleniyor" }
    if (i > -13) return { tone: "warn", text: `Çok yüksek (${i.toFixed(1)} LUFS): servis kısacak` }
    if (i < -15) return { tone: "info", text: `Kısık (${i.toFixed(1)} LUFS)` }
    return { tone: "success", text: `Hedefte (${i.toFixed(1)} LUFS)` }
  }
  return <Card title="Yayın öncesi ses yüksekliği">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* The graph.
          - source={song}: read only while the graph is on screen.
          - show: the short-term and the integrated lines (momentary jumps too much for a verdict).
          - targets: one target line with our own label and colour (replaces the −14 / −23 defaults).
          - range: the LUFS axis; span: a minute of history.
          - The correlation graph and bar stay on (parts.correlation): near +1 is mono-compatible, below 0 means
            phase trouble. The bar reads −1 → +1 left to right in every language, as a phase meter does. */}
      <LoudnessGraph source={song} show={["shortTerm", "integrated"]} targets={[{ value: -14, label: "Spotify / YouTube", color: "danger" }]}
        range={[-36, -6]} span={60} label="Şarkı" />
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        {/* An ordinary Button: the song starts only from this press (browsers require a gesture for sound). */}
        <Button on:click={toggle}>{$playing ? "⏹ Durdur" : "▶ Çal ve ölç"}</Button>
        {/* The verdict in words, so nobody has to read a graph to know the answer. */}
        <Badge tone={verdict().tone}>{verdict().text}</Badge>
      </div>
    </div>
  </Card>
}
