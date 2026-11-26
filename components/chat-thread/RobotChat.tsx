// RobotChat: the creative-minimal ChatThread example.
//
// What it shows: a tiny chat with a robot. Press a question button, the robot shows "typing…" for a moment and then
// answers. It needs only `messages` and `typing`; there is no composer, so the whole example is a few lines.
// When to use this pattern: scripted or canned conversations (onboarding bots, FAQ helpers, demos) where the user
// picks from a few choices instead of typing. For a real composer with replies and reactions see SupportChat.
//
// Motion: your message rises from the bottom and the robot's slides in from its side; this runs on March's motion
// engine, so reduced motion, the global speed and "Stop all" apply without code here. Pass `motion={false}` to
// show messages at once. Accessibility: the thread is a polite live log, so a screen reader announces the answer.
import { ChatThread, Button, type ChatMessage } from "march/ui"

// The robot's answers by question. The keys are also the button texts, so one table drives both.
const ANSWERS: Record<string, string> = {
  "Merhaba 👋": "Bip bop! Merhaba insan 🤖",
  "Hava nasıl?": "Sunucu odası her zaman 18 derece ❄️",
  "Bir şaka yap": "Neden robotlar hiç korkmaz? Çünkü sinirleri yok, kabloları var ⚡",
}

export function RobotChat() {
  // The conversation starts with one message from the robot. Messages without `mine` come from the other side;
  // `senderName` is only drawn when `group` is on, here it just identifies the sender.
  let $messages: ChatMessage[] = [{ id: "r0", senderName: "Robo", text: "Bir şey sor bakalım!", time: new Date() }]
  // Names typing now: while it holds "Robo" the thread shows the typing indicator under the last message.
  let $typing: string[] = []
  let n = 0
  const ask = (q: string) => {
    // My question goes in at once with status "read" (no delivery states to wait for in a demo).
    $messages = [...$messages, { id: `q${++n}`, mine: true, text: q, time: new Date(), status: "read" }]
    $typing = ["Robo"]
    // After 900 ms the robot stops "typing" and its answer is appended; ids stay unique because n only grows.
    setTimeout(() => { $typing = []; $messages = [...$messages, { id: `a${n}`, senderName: "Robo", text: ANSWERS[q], time: new Date() }] }, 900)
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* days={false}: no "Today" separator, the chat is only seconds old. label names the log for screen readers. */}
    <ChatThread messages={$messages} typing={$typing} days={false} label="Robo ile sohbet" />
    {/* The question buttons are disabled while the robot is typing, so questions cannot pile up. */}
    <div sx={{ flex: ["row", "wrap"], gap: 1 }}>
      {Object.keys(ANSWERS).map((q) => <Button size="sm" variant="ghost" disabled={$typing.length > 0} on:click={() => ask(q)}>{q}</Button>)}
    </div>
  </div>
}
