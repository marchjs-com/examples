// StoryTray: the real-life StoryViewer example.
//
// What it shows: an app's story strip. A StoryRing per group opens the viewer at that person; rings whose stories were all
// watched turn grey ("seen"); the viewer supports likes and replies (a reply shows a toast).
// When to use this pattern: stories in a feed. The state stays in your component: which group to start from ($who), which
// stories were seen ($seen) and which were liked ($liked). StoryViewer only reports events (`onSeen`, `onLike`, `onReply`)
// and asks you for the liked state (`liked`).
//
// Animation: the progress bars fill on March's motion engine as an "essential" animation (they keep time even under the
// visitor's reduced-motion preference); "pause all" and the global speed still apply. A press and hold pauses, a swipe
// moves between people with a slide, and dragging down shrinks the story and closes it.
// Accessibility: the viewer is a modal dialog: focus stays inside, Esc closes it and focus returns to the ring that opened
// it. ← / → move between stories (mirrored in RTL) and Space pauses; a polite live region says the position. A ring is a
// button named with the person and the state.
import { StoryViewer, StoryRing, toast, type StoryGroup } from "march/ui"

// The pictures: 2×2 pixel PNGs (the browser blends the four colours softly when it scales them up).
const PHOTOS = {
  sea: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGOoOfZCv34Hw+ebS17sqAAANsYIGXUpO/0AAAAASUVORK5CYII=",
  forest: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOYf7nLvt+fIarWSiVADwAolwTN7JGvOgAAAABJRU5ErkJggg==",
  dawn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGP4f7nrf382w/eVR/qzbwAAPqoIjEiz040AAAAASUVORK5CYII=",
  coffee: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4+PDYiWkZDF1RNl46cgA28QYTKX6a1AAAAABJRU5ErkJggg==",
}
// A helper that makes a time `m` minutes in the past: the viewer shows it as a relative time ("20 min ago").
const ago = (m: number) => new Date(Date.now() - m * 60_000)
// The data: each group is a person with one or more stories; `time` is when a story was posted.
const GROUPS: StoryGroup[] = [
  { id: "run", name: "HADİ Koşu Kulübü", items: [
    { id: "run-1", src: PHOTOS.dawn, caption: "Sabah koşusu başladı!", time: ago(20) },
    { id: "run-2", src: PHOTOS.sea, caption: "Sahil 5 km ✅", time: ago(12) },
  ] },
  { id: "bike", name: "Pazar Bisiklet", items: [{ id: "bike-1", src: PHOTOS.forest, caption: "Orman yolu", time: ago(75) }] },
  { id: "book", name: "Kitap Kulübü", items: [{ id: "book-1", src: PHOTOS.coffee, caption: "Kahve ve kitap ☕", time: ago(140) }] },
]

export function StoryTray() {
  // Reactive state: whether the viewer is open, which group to start from, and the ids of the seen and liked stories.
  // The Sets are replaced with new ones (never changed in place), so the view updates.
  let $open = false
  let $who = "run"
  let $seen = new Set<string>()
  let $liked = new Set<string>()
  // A group counts as seen when every one of its stories was seen.
  const allSeen = (g: StoryGroup) => g.items.every((s) => $seen.has(s.id))
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {/* One ring per group. state decides the look ("seen" is the quiet grey line). onClick chooses the starting group
        and opens the viewer. */}
    {GROUPS.map((g) => <StoryRing name={g.name} state={allSeen(g) ? "seen" : "new"} onClick={() => { $who = g.id; $open = true }} />)}
    {/* open / onClose: the viewer is controlled. groups: the data. start: the group (an index or an id) to open at.
        onSeen is called for every story shown, and we record it. liked tells the viewer which stories are liked (so the
        heart is filled) and onLike receives the new state; giving them shows the heart. onReply shows the reply field and
        receives the typed text; here it only shows a toast. */}
    <StoryViewer open={$open} onClose={() => $open = false} groups={GROUPS} start={$who}
      onSeen={(_, s) => { if (!$seen.has(s.id)) $seen = new Set([...$seen, s.id]) }}
      liked={(_, s) => $liked.has(s.id)}
      onLike={(_, s, on) => { const n = new Set($liked); on ? n.add(s.id) : n.delete(s.id); $liked = n }}
      onReply={(g, _, text) => toast(`${g.name}: “${text}” gönderildi`)} />
  </div>
}
