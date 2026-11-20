import { ChatBubble } from "march/ui"
import { cornerUpLeft, smilePlus } from "march/icons/lucide"

// ChatBubble'ın özellikleri: text, mine, position, time, status, sender, senderColor, reply, reactions, edited, onReact,
// onReactMenu, onReply, onRetry, labels, ticks, formatTime, replyHint, swipe, tools, reactIcon, replyIcon, class, içerik
export function ChatBubbleLab() {
  let $log = "—"
  return <div sx={{ flex: "col", gap: 1 }}>
    <ChatBubble class="lab-mine" mine text="Merhaba!" time={new Date(2026, 10, 19, 9, 41)} formatTime={(d: Date) => `${d.getHours()}.${d.getMinutes()}`}
      status="read" labels={{ read: "Görüldü" }} ticks={(st: string) => <span>{st}</span>} edited tools onReply={() => $log = "yanıt"}
      replyIcon={cornerUpLeft} replyHint={<span>↩</span>} />
    <ChatBubble class="lab-other" text="Selam" sender="Elif" senderColor={1} position="first" swipe={false}
      reactions={[{ emoji: "👍", count: 3 }]} onReact={(e: string) => $log = `tepki ${e}`} onReactMenu={() => $log = "menü"} reactIcon={smilePlus} />
    {/* reply: üstte alıntı; status="failed" ile onRetry yeniden deneme satırını gösterir */}
    <ChatBubble class="lab-fail" mine text="Akşam görüşelim" reply={{ name: "Elif", text: "Selam" }} status="failed"
      labels={{ retry: "Gitmedi · Yeniden dene" }} onRetry={() => $log = "yeniden"} />
    <ChatBubble class="lab-kids" position="last"><i>Kendi içeriğim</i></ChatBubble>
    <span class="lab-log">{$log}</span>
  </div>
}
