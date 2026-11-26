// Playlist: the real-life ListRow example.
//
// What it shows: a music playlist. Pressing a row plays that song: the row becomes the active one (highlighted, with a
// bar at its start edge) and its icon turns into "pause"; pressing it again stops. A small "shuffle" row at the bottom
// starts a random song. The long song name in the middle shows how ListRow handles text that does not fit.
// When to use this pattern: playlists, file lists, search results: rows where one is "current". `active` marks the
// current row and `indicator` draws the bar; both are functions here, so rows update when the current song changes.
//
// Accessibility: a row with `onClick` is a real <button>. Text that does not fit scrolls (it is read once by screen
// readers), and the scrolling stops under reduced motion.
import { ListRow } from "march/ui"
import { music, play, pause } from "march/icons"

// The songs. The second has a very long name on purpose: ListRow scrolls such a title instead of breaking the layout.
const SONGS = [
  { id: "s1", name: "Gün Ortası", who: "Mavi Dalga", time: "3:41" },
  { id: "s2", name: "Uzun ve sığmayan bir şarkı adı: gece yarısı İstanbul'da yağmur", who: "Kuzey", time: "5:02" },
  { id: "s3", name: "Sabah Kahvesi", who: "Lo-fi Kedi", time: "2:58" },
]

export function Playlist() {
  // The id of the playing song ("" when nothing plays): a signal read by every row.
  let $now = ""
  return <div sx={{ flex: "col", w: "full" }}>
    {/* Per row:
        - lead: a function, so the icon is a pause while this song plays and a note otherwise.
        - title, sub, trail: the song name, the artist and the length at the end.
        - active: true for the playing song; indicator: the bar at the start edge of the active row.
        - m:color="brand-purple": a common prop; the tint of the active row.
        - onClick: play this song, or stop if it is already playing (this makes the row a button). */}
    {SONGS.map((s) => <ListRow lead={() => $now === s.id ? pause : music} title={s.name} sub={s.who} trail={s.time}
      active={() => $now === s.id} indicator m:color="brand-purple" onClick={() => $now = $now === s.id ? "" : s.id} />)}
    {/* size="sm" makes this row more compact than the songs. */}
    <ListRow lead={play} title="Karışık çal" sub="3 şarkı" size="sm" onClick={() => $now = SONGS[Math.floor(Math.random() * 3)].id} />
  </div>
}
