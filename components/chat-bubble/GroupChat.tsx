import { ChatBubble } from "march/ui"

// grup sohbeti: tepkiye basınca sayı değişir; gitmeyen mesajda "yeniden dene"
export function GroupChat() {
  let $reacts = [{ emoji: "❤️", count: 2, mine: false }]
  let $status = "failed"
  const react = (e: string) => $reacts = $reacts.map((r) => (r.emoji === e ? { ...r, mine: !r.mine, count: r.count + (r.mine ? -1 : 1) } : r))
  return <div sx={{ flex: "col", gap: 1 }}>
    <ChatBubble sender="Deniz" senderColor={2} text="Pazar koşusu 7'de!" position="single" reactions={$reacts} onReact={react} />
    <ChatBubble mine text="Ben de geliyorum" reply={{ name: "Deniz", text: "Pazar koşusu 7'de!" }} status={$status as "failed"}
      onRetry={() => $status = "sent"} position="single" edited />
  </div>
}
