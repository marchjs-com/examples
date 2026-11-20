import { ListRow } from "march/ui"
import { music, play, pause } from "march/icons"

// bir çalma listesi: satıra basınca şarkı çalar (etkin satır ve çubuk); çalan şarkının ikonu duraklat olur
const SONGS = [
  { id: "s1", name: "Gün Ortası", who: "Mavi Dalga", time: "3:41" },
  { id: "s2", name: "Uzun ve sığmayan bir şarkı adı: gece yarısı İstanbul'da yağmur", who: "Kuzey", time: "5:02" },
  { id: "s3", name: "Sabah Kahvesi", who: "Lo-fi Kedi", time: "2:58" },
]

export function Playlist() {
  let $now = ""
  return <div sx={{ flex: "col", w: "full" }}>
    {SONGS.map((s) => <ListRow lead={() => $now === s.id ? pause : music} title={s.name} sub={s.who} trail={s.time}
      active={() => $now === s.id} indicator m:color="brand-purple" onClick={() => $now = $now === s.id ? "" : s.id} />)}
    <ListRow lead={play} title="Karışık çal" sub="3 şarkı" size="sm" onClick={() => $now = SONGS[Math.floor(Math.random() * 3)].id} />
  </div>
}
