import { ChatThread, Button, type ChatMessage } from "march/ui"

// bir robotla hızlı yanıt sohbeti: bir düğmeye bas, robot "yazıyor…" der ve yanıt verir
const ANSWERS: Record<string, string> = {
  "Merhaba 👋": "Bip bop! Merhaba insan 🤖",
  "Hava nasıl?": "Sunucu odası her zaman 18 derece ❄️",
  "Bir şaka yap": "Neden robotlar hiç korkmaz? Çünkü sinirleri yok, kabloları var ⚡",
}

export function RobotChat() {
  let $messages: ChatMessage[] = [{ id: "r0", senderName: "Robo", text: "Bir şey sor bakalım!", time: new Date() }]
  let $typing: string[] = []
  let n = 0
  const ask = (q: string) => {
    $messages = [...$messages, { id: `q${++n}`, mine: true, text: q, time: new Date(), status: "read" }]
    $typing = ["Robo"]
    setTimeout(() => { $typing = []; $messages = [...$messages, { id: `a${n}`, senderName: "Robo", text: ANSWERS[q], time: new Date() }] }, 900)
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    <ChatThread messages={$messages} typing={$typing} days={false} label="Robo ile sohbet" />
    <div sx={{ flex: ["row", "wrap"], gap: 1 }}>
      {Object.keys(ANSWERS).map((q) => <Button size="sm" variant="ghost" disabled={$typing.length > 0} on:click={() => ask(q)}>{q}</Button>)}
    </div>
  </div>
}
