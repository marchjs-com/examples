// TeamMessage: the real-life ChatComposer example.
//
// The message box of a team channel: it sends text or a voice message, the attach menu offers photo, file and location,
// and a "typing..." signal goes out while the user types. What was sent is listed above. Use this pattern for chat
// and comment boxes: the composer only collects input, and your callbacks decide what a message is.
import { ChatComposer, toast } from "march/ui"
import { image, fileText, mapPin } from "march/icons"

export function TeamMessage() {
  // The last few sent items and the typing note (reactive state). add() keeps the last four items and clears the note.
  let $sent: string[] = []
  let $typing = ""
  const add = (s: string) => { $sent = [...$sent.slice(-3), s]; $typing = "" }
  return <div sx={{ flex: "col", gap: 2 }}>
    <ul sx={{ flex: "col", gap: 1 }}>{$sent.length ? $sent.map((s) => <li>{s}</li>) : <li sx={{ color: "muted" }}>Henüz mesaj yok</li>}</ul>
    <span sx={{ text: "xs", color: "muted" }}>{$typing}</span>
    {/* placeholder is the hint in the empty field. onSend gets the text (Enter sends, Shift+Enter breaks the line).
        onVoice receives the recording's length in milliseconds and, by being given, enables the microphone button: the
        round button shows a microphone while the field is empty and a send arrow once there is text. onTyping is called
        at most once a second while the user types: a real app would send it to the other members. attachments are the
        items of the attach menu; each has a label, an icon and an onSelect (the last one only shows a toast, a short,
        polite status message). */}
    <ChatComposer placeholder="#tasarım kanalına yaz"
      onSend={(text) => add(`💬 ${text}`)}
      onVoice={(ms) => add(`🎤 Sesli mesaj · ${(ms / 1000).toFixed(1)} sn`)}
      onTyping={() => $typing = "Ekibe: yazıyor…"}
      attachments={[
        { label: "Fotoğraf", icon: image, onSelect: () => add("🖼️ Fotoğraf eklendi") },
        { label: "Dosya", icon: fileText, onSelect: () => add("📄 Dosya eklendi") },
        { label: "Konum", icon: mapPin, onSelect: () => toast("Konum izni istenir") },
      ]} />
  </div>
}
