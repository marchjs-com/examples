// ChatBubbleLab: the full-featured ChatBubble example; it uses every prop at least once.
//
// Props shown here: text, mine, position, time, status, sender, senderColor, reply, reactions, edited, onReact,
// onReactMenu, onReply, onRetry, labels, ticks, formatTime, replyHint, swipe, tools, reactIcon, replyIcon, class and the
// content (children).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ChatBubbleLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ChatBubble } from "march/ui"
import { cornerUpLeft, smilePlus } from "march/icons/lucide"

export function ChatBubbleLab() {
  // The last callback that ran, as text (reactive state), so you can see each handler fire.
  let $log = "—"
  return <div sx={{ flex: "col", gap: 1 }}>
    {/* My message:
        - mine: drawn on the sender's side, with the "mine" colours. text is the message. time + formatTime: the time,
          written by your own function (without formatTime it uses the locale's short time).
        - status="read" shows delivery ticks; ticks as a function draws your own mark for a status, and labels rewords
          any of the built-in texts (here "read"). edited adds the "edited" note.
        - tools: the react / reply buttons on hover and focus. onReply is the reply button's handler (and the
          drag-to-reply gesture's); replyIcon replaces its icon and replyHint the arrow shown while dragging. */}
    <ChatBubble class="lab-mine" mine text="Merhaba!" time={new Date(2026, 10, 19, 9, 41)} formatTime={(d: Date) => `${d.getHours()}.${d.getMinutes()}`}
      status="read" labels={{ read: "Görüldü" }} ticks={(st: string) => <span>{st}</span>} edited tools onReply={() => $log = "yanıt"}
      replyIcon={cornerUpLeft} replyHint={<span>↩</span>} />
    {/* Someone else's message in a group chat: sender shows the name and senderColor (0 to 3) picks its colour.
        position="first" says this is the first bubble of a run, so the corners tighten between bubbles. swipe={false}
        turns off drag-to-reply. reactions are the chips ({ emoji, count, mine }); onReact runs when one is pressed,
        onReactMenu shows the "react" button (it receives the anchor to open your picker at) and reactIcon is its icon. */}
    <ChatBubble class="lab-other" text="Selam" sender="Elif" senderColor={1} position="first" swipe={false}
      reactions={[{ emoji: "👍", count: 3 }]} onReact={(e: string) => $log = `tepki ${e}`} onReactMenu={() => $log = "menü"} reactIcon={smilePlus} />
    {/* reply: the quoted message on top; status="failed" with onRetry shows the retry row (its text from labels.retry). */}
    <ChatBubble class="lab-fail" mine text="Akşam görüşelim" reply={{ name: "Elif", text: "Selam" }} status="failed"
      labels={{ retry: "Gitmedi · Yeniden dene" }} onRetry={() => $log = "yeniden"} />
    {/* Children replace the text with your own content (an image, a voice note...). position="last": the last bubble of
        a run keeps the small "tail" corner. */}
    <ChatBubble class="lab-kids" position="last"><i>Kendi içeriğim</i></ChatBubble>
    <span class="lab-log">{$log}</span>
  </div>
}
