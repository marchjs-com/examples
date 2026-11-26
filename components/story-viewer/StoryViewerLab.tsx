// StoryViewerLab: the full-featured StoryViewer example.
//
// What it shows: every StoryViewer option: open / close, groups (including a story with its own duration), the starting
// group, the default duration, the seen / reply / like events and the liked state, the progress bars, avatar, time,
// pause and close buttons, arrows, the "sent" note, your own texts (`labels`, including the screen reader status), and
// class. Use it as a catalogue: copy the prop you need.
//
// Animation: the progress bars fill on March's motion engine as an "essential" animation (they keep time even under the
// visitor's reduced-motion preference); "pause all" and the global speed still apply. A press and hold pauses, a swipe
// moves between people with a slide, and dragging down shrinks the story and closes it. `pauseButton={false}` and
// `arrows={false}` remove those buttons without removing the gestures and keys.
// Accessibility: the viewer is a modal dialog (named by `labels.dialog`): focus stays inside, Esc closes it and focus
// returns to the control that opened it. ← / → move, Space pauses, the pause button has aria-pressed, and a polite live
// region says the position (`labels.status`).
import { StoryViewer, Button, Badge, type StoryGroup } from "march/ui"

// The pictures: 2×2 pixel PNGs (the browser blends the four colours softly when it scales them up).
const PHOTOS = {
  sea: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGOoOfZCv34Hw+ebS17sqAAANsYIGXUpO/0AAAAASUVORK5CYII=",
  city: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOQ1Y7Ktl/AwC9h+mCBFQAYjgQDFgLe2AAAAABJRU5ErkJggg==",
  coffee: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4+PDYiWkZDF1RNl46cgA28QYTKX6a1AAAAABJRU5ErkJggg==",
  sunset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4vznmf3Y0wyHHKm+tbAAzQwYxpZcJIQAAAABJRU5ErkJggg==",
}
// The data: three people. The first has two stories: the second has its own `duration` (9 seconds, which wins over the
// default) and neither needs a caption. `alt` is the text alternative of the picture.
const GROUPS: StoryGroup[] = [
  { id: "u1", name: "Ece", items: [
    { id: "e1", src: PHOTOS.sunset, alt: "Gün batımı", caption: "Tepede gün batımı", time: new Date(Date.now() - 30 * 60_000) },
    { id: "e2", src: PHOTOS.sea, alt: "Deniz", duration: 9000 },
  ] },
  { id: "u2", name: "Can", items: [{ id: "c1", src: PHOTOS.city, alt: "Şehir", caption: "Gece turu" }] },
  { id: "u3", name: "Deniz", items: [{ id: "d1", src: PHOTOS.coffee, alt: "Sahil", caption: "Kahve molası" }] },
]

// It starts open (so the Properties panel shows every option at once); the tests render it closed with startOpen={false}.
export function StoryViewerLab(props: { startOpen?: boolean }) {
  // Reactive state: whether it is open, which person to start from (an index or an id), the ids of the seen stories, the
  // set of liked ones and a one-line log of the last event.
  let $open = props.startOpen ?? true
  let $start: string | number = 0
  let $seen: string[] = []
  let $liked = new Set<string>()
  let $log = "-"
  // Opens the viewer at the given person.
  const show = (start: string | number) => { $start = start; $open = true }
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
    {/* Two buttons open the viewer at different people; the badge and the text show what the events reported. */}
    <Button size="sm" on:click={() => show(0)}>Baştan aç</Button>
    <Button size="sm" variant="ghost" on:click={() => show("u2")}>Can'dan aç</Button>
    <Badge tone="primary">{$log}</Badge>
    <span sx={{ text: "xs", color: "muted" }}>{`görülen: ${$seen.join(", ") || "-"}`}</span>
    {/* open and onClose: the $open state drives them, written as functions so they stay live. groups: the data.
        start: the person to open at. duration: the default time per story in ms; an item's own duration wins. onSeen:
        called for each story shown. onReply: shows the reply field and receives the typed text. onLike and liked: show
        the heart; liked tells which stories are liked and onLike receives the new state. progress, avatar, time,
        pauseButton, closeButton, arrows and sentNote are all on by default; they are written out here to show each can
        be set to false. labels: every text the viewer writes itself, so it can be translated or reworded: dialog, play,
        pause, close, previous, next, like, send, sent, and reply, replyPlaceholder and status, which are functions of
        the group (status also gets the index and the total). class is kept on the dialog. */}
    <StoryViewer class="lab-stories" open={() => $open} onClose={() => { $open = false; $log = "kapandı" }}
      groups={GROUPS} start={() => $start} duration={4000}
      onSeen={(_, s) => { if (!$seen.includes(s.id)) $seen = [...$seen, s.id] }}
      onReply={(g, _, text) => $log = `${g.name}: ${text}`}
      onLike={(_, s, on) => { const n = new Set($liked); on ? n.add(s.id) : n.delete(s.id); $liked = n; $log = on ? "beğenildi" : "beğeni geri alındı" }}
      liked={(_, s) => $liked.has(s.id)}
      progress avatar time pauseButton closeButton arrows sentNote
      labels={{ dialog: "Hikâyeler", play: "Oynat", pause: "Durdur", close: "Hikâyeyi kapat", previous: "Önceki hikâye", next: "Sonraki hikâye",
        like: "Hikâyeyi beğen", send: "Yolla", sent: "İletildi ✓",
        reply: (g) => `${g.name} kişisine yanıt`, replyPlaceholder: (g) => `${g.name} için bir şey yaz…`,
        status: (g, i, n) => `${g.name}: ${i + 1}. hikâye / ${n}` }} />
  </div>
}
