// ChatAttachments: the real-life Media example.
//
// What it shows: the files someone sent in a chat: each one is a small square thumbnail with a button under it. The kind
// (picture or video) is guessed from the file extension, and a file that cannot be loaded shows a text instead of a broken
// image. Pressing the button opens the file in a large preview dialog.
// When to use this pattern: attachments, galleries and previews where the files are of mixed kinds. `kind="auto"` lets one
// Media element handle them all; `openMedia(src)` shows the same thing in a dialog.
//
// Accessibility: images use `alt` (an empty alt marks it decorative); video and audio keep their native controls; a
// failed load is announced as a status message. Animation: none of its own.
import { Media, Button, openMedia } from "march/ui"

// The files. The last one does not exist on purpose, to show the fallback.
const files = [
  { name: "gun-batimi.jpg", src: "/media/dusk.jpg" },
  { name: "dalga.webm", src: "/media/hadi-waves.webm" },
  { name: "silinen.jpg", src: "/media/silinen.jpg" },
]

// One attachment: a thumbnail and, under it, a button with the file name that opens the preview.
// Media props: src; kind="auto": the kind comes from the extension; size="sm": a square thumbnail; alt: the text
// alternative of an image; poster: the picture a video shows before it plays; fallback: the text shown when the file fails
// to load. openMedia(src, { title, poster }): opens the file in a dialog with that title.
const Attachment = (props: { name: string; src: string }) => <div sx={{ flex: "col", gap: 1 }}>
  <Media src={props.src} kind="auto" size="sm" alt={props.name} poster="/media/hadi-waves.jpg" fallback="Ek yok" />
  <Button size="sm" variant="ghost" on:click={() => openMedia(props.src, { title: props.name, poster: "/media/hadi-waves.jpg" })}>{props.name}</Button>
</div>

export function ChatAttachments() {
  return <div sx={{ flex: "col", gap: 2 }}>
    <span sx={{ color: "muted", text: "sm" }}>Ayşe 3 dosya gönderdi</span>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>{files.map((f) => <Attachment name={f.name} src={f.src} />)}</div>
  </div>
}
