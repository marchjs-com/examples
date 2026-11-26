import { SunburstChart } from "march/charts"
import { Button } from "march/ui"

// A playlist as a sunburst: a playful, minimal SunburstChart.
// The inner ring is the genre, the next one the artist, the outer one the song; every arc is as wide as the song's
// minutes. The "add song" button adds the next song and a new arc opens with a wobbly spring; click a genre to zoom in.
// It shows how a flat list of rows becomes the nested tree a sunburst needs, and how the chart follows a growing tree.

// Flat rows: [genre, artist, song, minutes]. Real data often arrives flat like this (from a table or an API).
const SONGS = [["Rock", "Duman", "Bu Akşam", 4], ["Rock", "Duman", "Senden Daha Güzel", 5], ["Rock", "maNga", "Cevapsız Sorular", 4],
  ["Pop", "Tarkan", "Kuzu Kuzu", 4], ["Pop", "Sezen Aksu", "Firuze", 5], ["Caz", "İlhan Erşahin", "Wonderland", 6],
  ["Pop", "Tarkan", "Şımarık", 4], ["Caz", "Kerem Görsev", "Istanbul", 7], ["Rock", "Mor ve Ötesi", "Bir Derdim Var", 4]] as const

// Turns the first `n` flat rows into a tree: genre › artist › songs. Each node uses the chart's default keys
// (`label`, `children`, and `value` on the songs), so no label / value / childrenOf props are needed below.
const tree = (n: number) => {
  const out: Record<string, Record<string, { label: string; value: number }[]>> = {}
  for (const [genre, artist, label, value] of SONGS.slice(0, n)) ((out[genre] ??= {})[artist] ??= []).push({ label, value })
  return Object.entries(out).map(([g, artists]) => ({ label: g, children: Object.entries(artists).map(([a, songs]) => ({ label: a, children: songs })) }))
}

export function Playlist() {
  // How many songs are in the list; the chart starts with five.
  let $n = 5
  // SunburstChart props:
  // - data={() => tree($n)}: a function reading the signal, so the chart rebuilds the tree on every added song.
  // - rootLabel="Liste": the name of the whole tree in the middle and the breadcrumb path ("Liste" = list), since the
  //   data is a list of top rows with no root row of its own.
  // - format: minutes ("dk"), used in the middle, the tooltip and the hidden data table.
  // - animate="spring-wobbly": an easing name; the new song's arc opens and its neighbours make room with a bouncy
  //   spring that suits the playful theme. Use animate={false} for no motion; reduced motion is honoured automatically.
  // - title: the SVG's accessible name.
  // Keyboard: Tab focuses the chart, ← → move along a ring, ↓ / ↑ go to a child / the parent, Enter zooms in, Escape
  // zooms out.
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Disabled once every song is in, so the button never adds nothing. */}
    <Button size="sm" disabled={() => $n >= SONGS.length} on:click={() => { $n++ }}>Şarkı ekle 🎵</Button>
    <SunburstChart data={() => tree($n)} rootLabel="Liste" format={(v: number) => `${v} dk`} animate="spring-wobbly" title="Çalma listesi" height={300} />
  </div>
}
