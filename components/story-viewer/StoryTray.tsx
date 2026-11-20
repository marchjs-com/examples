import { StoryViewer, StoryRing, toast, type StoryGroup } from "march/ui"

// bir uygulamanın hikâye şeridi: halkaya basınca o kişiden açılır; izlenen halkalar griye döner, beğeni ve yanıt
// gönderilebilir
// fotoğraflar: 2×2 piksellik PNG'ler (dört rengi tarayıcı yumuşakça karıştırır)
const PHOTOS = {
  sea: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGOoOfZCv34Hw+ebS17sqAAANsYIGXUpO/0AAAAASUVORK5CYII=",
  forest: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOYf7nLvt+fIarWSiVADwAolwTN7JGvOgAAAABJRU5ErkJggg==",
  dawn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGP4f7nrf382w/eVR/qzbwAAPqoIjEiz040AAAAASUVORK5CYII=",
  coffee: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4+PDYiWkZDF1RNl46cgA28QYTKX6a1AAAAABJRU5ErkJggg==",
}
const ago = (m: number) => new Date(Date.now() - m * 60_000)
const GROUPS: StoryGroup[] = [
  { id: "run", name: "HADİ Koşu Kulübü", items: [
    { id: "run-1", src: PHOTOS.dawn, caption: "Sabah koşusu başladı!", time: ago(20) },
    { id: "run-2", src: PHOTOS.sea, caption: "Sahil 5 km ✅", time: ago(12) },
  ] },
  { id: "bike", name: "Pazar Bisiklet", items: [{ id: "bike-1", src: PHOTOS.forest, caption: "Orman yolu", time: ago(75) }] },
  { id: "book", name: "Kitap Kulübü", items: [{ id: "book-1", src: PHOTOS.coffee, caption: "Kahve ve kitap ☕", time: ago(140) }] },
]

export function StoryTray() {
  let $open = false
  let $who = "run"
  let $seen = new Set<string>()
  let $liked = new Set<string>()
  const allSeen = (g: StoryGroup) => g.items.every((s) => $seen.has(s.id))
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {GROUPS.map((g) => <StoryRing name={g.name} state={allSeen(g) ? "seen" : "new"} onClick={() => { $who = g.id; $open = true }} />)}
    <StoryViewer open={$open} onClose={() => $open = false} groups={GROUPS} start={$who}
      onSeen={(_, s) => { if (!$seen.has(s.id)) $seen = new Set([...$seen, s.id]) }}
      liked={(_, s) => $liked.has(s.id)}
      onLike={(_, s, on) => { const n = new Set($liked); on ? n.add(s.id) : n.delete(s.id); $liked = n }}
      onReply={(g, _, text) => toast(`${g.name}: “${text}” gönderildi`)} />
  </div>
}
