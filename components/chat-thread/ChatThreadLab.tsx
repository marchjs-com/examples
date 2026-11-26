// ChatThreadLab: the full-featured ChatThread example; it uses every prop at least once.
//
// Props shown here: messages (reply, reactions, edited, image, status), typing, group, onReact, onReply, onRetry,
// runMinutes, label, days (your own wording), jump (your own "N new" button content), jumpColor, motion and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ChatThreadLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ChatThread, Button, Badge, type ChatMessage } from "march/ui"

// A 2x2 pixel PNG as a data URL, so the example needs no network to show an image message.
const PHOTO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR42mP4WSz2xmMmQ43VWzlpbwAsKgV3rhVt4wAAAABJRU5ErkJggg=="
// A date `d` days ago at hour `h`, minute `m`: lets the sample messages span three days, so the day separators show.
const at = (d: number, h: number, m: number) => { const x = new Date(); x.setDate(x.getDate() - d); x.setHours(h, m, 0, 0); return x }

export function ChatThreadLab() {
  // The messages. Every message needs a unique `id` (rows are keyed by it, so an edit, a status change or a new
  // reaction updates one bubble instead of redrawing the list). `mine` puts the bubble on the right; `senderId`
  // and `senderName` identify other people (used when `group` is on).
  let $messages: ChatMessage[] = [
    // Two messages from Ece, 9 minutes apart: with runMinutes={10} they form one run (one name above them).
    { id: "a1", senderId: "ece", senderName: "Ece", text: "Akşam yemeği kimde?", time: at(2, 19, 0) },
    { id: "a2", senderId: "ece", senderName: "Ece", text: "Ben tatlı getiririm 🍰", time: at(2, 19, 9) },
    // `image` adds a picture to the bubble (alt text is for screen readers); `edited` adds the "edited" mark.
    { id: "a3", senderId: "can", senderName: "Can", text: "Bende! Gün batımı da harika", time: at(1, 18, 30), image: { src: PHOTO, alt: "Gün batımı" }, edited: true },
    // `reply` quotes another message above the bubble; `reactions` are the chips under it; `status` ("read") draws
    // the delivery state of my own message.
    { id: "a4", mine: true, text: "Geliyorum", time: at(0, 9, 0), status: "read", reply: { name: "Can", text: "Bende!" }, reactions: [{ emoji: "🎉", count: 2 }] },
    // status "failed" shows the retry button, which calls onRetry below.
    { id: "a5", mine: true, text: "Bu mesaj gidemedi", time: at(0, 9, 1), status: "failed" },
  ]
  // Names that are typing now; the typing indicator sits under the last message while the list is not empty.
  let $typing: string[] = ["Ece"]
  // `group` shows sender names and avatars on runs: needed in a group chat, noise in a one-to-one chat.
  let $group = true
  // The last event as text, so you can see the callbacks fire.
  let $log = "-"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Controls for the demo: they switch `group` and `typing` at run time to show both states. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" variant="ghost" on:click={() => $group = !$group}>{$group ? "Birebir" : "Grup"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $typing = $typing.length ? [] : ["Ece", "Can"]}>Yazıyor</Button>
      <Badge tone="primary">{$log}</Badge>
    </div>
    {/* The ChatThread:
        - class="lab-chat": added to the log element, so your CSS or a test can find this instance.
        - label: the accessible name of the conversation (the log is role="log": new messages are announced politely).
        - messages / typing / group as functions (`() => $x`): the component reads them itself, so only the rows
          that depend on them update. Passing the plain value also works (see RobotChat).
        - runMinutes={10}: messages of one sender at most 10 minutes apart share a run (default 5).
        - motion={false}: new messages appear at once and the view does not scroll smoothly. With motion on, the
          engine already honours reduced motion and the global speed / "Stop all" settings; turn it off only
          where motion is never wanted.
        - jumpColor / jump: the "N new" button that appears when you scrolled up and messages arrive; a colour token
          and your own content (jump={false} would remove the button).
        - days: your own wording for the sticky day separators (here the weekday name); days={false} removes them.
        - onReact(message, emoji): a reaction was picked or a chip pressed; we add the chip ourselves because the
          thread keeps no state. onReply(message): the reply action. onRetry(message): the retry button. */}
    <ChatThread class="lab-chat" label="Akşam yemeği" messages={() => $messages} typing={() => $typing} group={() => $group}
      runMinutes={10} motion={false} jumpColor="brand-pink" jump={(c) => `⬇ ${c} yeni mesaj`}
      days={(d) => d.toLocaleDateString("tr-TR", { weekday: "long" })}
      onReact={(m, e) => { $messages = $messages.map((x) => (x.id === m.id ? { ...x, reactions: [...(x.reactions ?? []), { emoji: e, count: 1, mine: true }] } : x)); $log = `tepki ${e}` }}
      onReply={(m) => $log = `yanıt: ${m.text}`}
      onRetry={(m) => { $messages = $messages.map((x) => (x.id === m.id ? { ...x, status: "sent" } : x)); $log = "yeniden gönderildi" }} />
  </div>
}
