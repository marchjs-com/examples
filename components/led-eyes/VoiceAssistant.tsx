// VoiceAssistant: the real-life LedEyes example.
//
// The face of a voice assistant: it listens (looks at you, follows the pointer), thinks (looks up), and talks (the
// mouth moves). A status line says the same thing in words, for everyone who does not see the face.
// Use this pattern when a face should mirror an app state: map each state to an expression and a mouth.
import { LedEyes } from "march/led"
import { Button, Card } from "march/ui"

type State = "listening" | "thinking" | "talking"

// One table from the app state to the face: expression, mouth and the words for the status line.
const FACE: Record<State, { expression: "open" | "look-up"; mouth: "smile" | "flat" | "talk"; say: string }> = {
  listening: { expression: "open", mouth: "smile", say: "Dinliyorum…" },
  thinking: { expression: "look-up", mouth: "flat", say: "Düşünüyorum…" },
  talking: { expression: "open", mouth: "talk", say: "Yarın İstanbul'da hava güneşli, 18 derece." },
}

export function VoiceAssistant() {
  let $state: State = "listening"
  return <Card title="Sesli asistan">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* follow: while listening, the eyes look at the pointer anywhere on the page. A mouth needs 10+ rows: 16 here.
          The face is decoration next to the status text, so its label stays short. */}
      <LedEyes expression={() => FACE[$state].expression} mouth={() => FACE[$state].mouth} follow={() => $state === "listening"}
        cols={32} rows={16} color="blue" label="Asistanın yüzü" />
      {/* role="status": screen readers hear the state change. */}
      <span role="status">{() => FACE[$state].say}</span>
      <div sx={{ flex: "row", gap: 2 }}>
        <Button size="sm" on:click={() => { $state = "listening" }}>Dinle</Button>
        <Button size="sm" on:click={() => { $state = "thinking" }}>Düşün</Button>
        <Button size="sm" on:click={() => { $state = "talking" }}>Konuş</Button>
      </div>
    </div>
  </Card>
}
