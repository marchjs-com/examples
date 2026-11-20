import { ChatThread, ChatComposer, type ChatMessage } from "march/ui"

// bir destek sohbeti: gönderilen mesaj gidiyor → iletildi → okundu olur; her üç mesajdan biri bağlantı hatası verir
// (Yeniden dene); bir balona tepki bırakılır ya da yanıtlanır (yanıt satırı yazma kutusunun üstüne gelir)
const ago = (min: number) => new Date(Date.now() - min * 60_000)

export function SupportChat() {
  let $messages: ChatMessage[] = [
    { id: "s1", senderName: "Destek · Ayşe", text: "Merhaba! Siparişinizle ilgili nasıl yardımcı olabilirim?", time: ago(12) },
    { id: "s2", mine: true, text: "Kargom 3 gündür aynı şubede görünüyor.", time: ago(10), status: "read" },
    { id: "s3", senderName: "Destek · Ayşe", text: "Kontrol ediyorum, bir dakika lütfen 🙏", time: ago(9), reactions: [{ emoji: "👍", count: 1, mine: true }] },
  ]
  let $reply = null as ChatMessage | null
  let n = 0
  const patch = (id: string, p: Partial<ChatMessage>) => { $messages = $messages.map((m) => (m.id === id ? { ...m, ...p } : m)) }
  const deliver = (id: string) => {
    setTimeout(() => patch(id, { status: "delivered" }), 500)
    setTimeout(() => patch(id, { status: "read" }), 1200)
  }
  const send = (text: string) => {
    const id = `u${++n}`
    const reply = $reply ? { name: $reply.mine ? "Siz" : $reply.senderName ?? "", text: $reply.text ?? "" } : undefined
    $messages = [...$messages, { id, mine: true, text, time: new Date(), status: "sending", reply }]
    $reply = null
    if (n % 3 === 0) setTimeout(() => patch(id, { status: "failed" }), 400); else deliver(id)
  }
  const react = (m: ChatMessage, emoji: string) => {
    const mine = m.reactions?.find((r) => r.mine)
    const rest = (m.reactions ?? []).filter((r) => !r.mine)
    patch(m.id, { reactions: mine?.emoji === emoji ? rest : [...rest, { emoji, count: 1, mine: true }] })
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    <ChatThread messages={$messages} label="Destek sohbeti" jumpColor="brand-green"
      onReact={react} onReply={(m) => $reply = m} onRetry={(m) => { patch(m.id, { status: "sending" }); deliver(m.id) }} />
    <ChatComposer onSend={send} placeholder="Mesajınız"
      replyTo={$reply ? { name: $reply.mine ? "Siz" : $reply.senderName ?? "", text: $reply.text ?? "" } : null}
      onCancelReply={() => $reply = null} />
  </div>
}
