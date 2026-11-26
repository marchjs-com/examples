// SupportChat: the real-life ChatThread example.
//
// What it shows: a customer-support conversation with a ChatComposer. A sent message goes sending -> delivered ->
// read; every third message fails with a connection error and offers "retry"; a bubble can get a reaction or be
// replied to (the quoted reply appears above the composer and is attached to the next message).
// When to use this pattern: any chat where the app, not the component, owns the data: ChatThread only draws the
// `messages` you give it and reports what the user did through onReact / onReply / onRetry.
//
// Motion: new bubbles animate on the motion engine (reduced motion, global speed and "Stop all" apply; `motion={false}`
// turns it off for this thread). The thread is a polite live log, so screen readers hear new messages.
import { ChatThread, ChatComposer, type ChatMessage } from "march/ui"

// A date `min` minutes ago, for realistic timestamps in the sample conversation.
const ago = (min: number) => new Date(Date.now() - min * 60_000)

export function SupportChat() {
  let $messages: ChatMessage[] = [
    { id: "s1", senderName: "Destek · Ayşe", text: "Merhaba! Siparişinizle ilgili nasıl yardımcı olabilirim?", time: ago(12) },
    { id: "s2", mine: true, text: "Kargom 3 gündür aynı şubede görünüyor.", time: ago(10), status: "read" },
    // `reactions` are the chips under a bubble; `mine: true` marks the one I added.
    { id: "s3", senderName: "Destek · Ayşe", text: "Kontrol ediyorum, bir dakika lütfen 🙏", time: ago(9), reactions: [{ emoji: "👍", count: 1, mine: true }] },
  ]
  // The message being replied to (or null). It feeds both the composer's reply bar and the next sent message.
  let $reply = null as ChatMessage | null
  let n = 0
  // Update one message by id; rows are keyed, so only that bubble redraws.
  const patch = (id: string, p: Partial<ChatMessage>) => { $messages = $messages.map((m) => (m.id === id ? { ...m, ...p } : m)) }
  // Fake the server: the status advances to delivered after 0.5 s and to read after 1.2 s.
  const deliver = (id: string) => {
    setTimeout(() => patch(id, { status: "delivered" }), 500)
    setTimeout(() => patch(id, { status: "read" }), 1200)
  }
  const send = (text: string) => {
    const id = `u${++n}`
    // Turn the replied-to message into the small `{ name, text }` quote that a bubble stores in `reply`.
    const reply = $reply ? { name: $reply.mine ? "Siz" : $reply.senderName ?? "", text: $reply.text ?? "" } : undefined
    $messages = [...$messages, { id, mine: true, text, time: new Date(), status: "sending", reply }]
    $reply = null
    // Every third message "fails" so the retry flow can be tried; the others are delivered normally.
    if (n % 3 === 0) setTimeout(() => patch(id, { status: "failed" }), 400); else deliver(id)
  }
  // Toggle my reaction: the same emoji again removes it, a different one replaces it (one reaction per person).
  const react = (m: ChatMessage, emoji: string) => {
    const mine = m.reactions?.find((r) => r.mine)
    const rest = (m.reactions ?? []).filter((r) => !r.mine)
    patch(m.id, { reactions: mine?.emoji === emoji ? rest : [...rest, { emoji, count: 1, mine: true }] })
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* jumpColor: colour token of the "N new" button shown when you scrolled up. onRetry puts the message back to
        "sending" and runs the fake delivery again. The thread keeps no state: every callback just edits $messages. */}
    <ChatThread messages={$messages} label="Destek sohbeti" jumpColor="brand-green"
      onReact={react} onReply={(m) => $reply = m} onRetry={(m) => { patch(m.id, { status: "sending" }); deliver(m.id) }} />
    {/* ChatComposer: onSend gets the typed text; replyTo shows the quoted message above the input and
        onCancelReply is the close action of that bar. */}
    <ChatComposer onSend={send} placeholder="Mesajınız"
      replyTo={$reply ? { name: $reply.mine ? "Siz" : $reply.senderName ?? "", text: $reply.text ?? "" } : null}
      onCancelReply={() => $reply = null} />
  </div>
}
