// GroupChat: the real-life ChatBubble example.
//
// A group chat: pressing a reaction chip changes its count, and a message that did not go through shows a retry row.
// Use this pattern for real conversations: the reaction list and the delivery status are plain state of your message,
// and the bubble only draws them and reports presses.
import { ChatBubble } from "march/ui"

export function GroupChat() {
  // The reactions of the first message ({ emoji, count, mine }) and the delivery status of my message (reactive state).
  let $reacts = [{ emoji: "❤️", count: 2, mine: false }]
  let $status = "failed"
  // Toggles my reaction: flips `mine` and moves the count by one. It builds a new list, which is what updates the chips.
  const react = (e: string) => $reacts = $reacts.map((r) => (r.emoji === e ? { ...r, mine: !r.mine, count: r.count + (r.mine ? -1 : 1) } : r))
  return <div sx={{ flex: "col", gap: 1 }}>
    {/* Their message: sender and senderColor (0 to 3) tell people apart in a group; reactions are the chips and
        onReact runs when one is pressed; position="single" means a run of one bubble (full corners). */}
    <ChatBubble sender="Deniz" senderColor={2} text="Pazar koşusu 7'de!" position="single" reactions={$reacts} onReact={react} />
    {/* My reply: `reply` quotes the message above the text, edited adds the "edited" note, and status="failed" shows the
        retry row: pressing it calls onRetry, which here marks the message as sent. */}
    <ChatBubble mine text="Ben de geliyorum" reply={{ name: "Deniz", text: "Pazar koşusu 7'de!" }} status={$status as "failed"}
      onRetry={() => $status = "sent"} position="single" edited />
  </div>
}
