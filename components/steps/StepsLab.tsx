// StepsLab: the full-featured Steps example.
//
// What it shows: every Steps option: steps (title, description, icon), current, onSelect (steps become buttons),
// vertical, doneIcon (an icon, short text, or false to keep the number), renderDot (your own dot content), connector,
// class and m:color. Each group of examples sits under its own caption; the Back / Next buttons at the bottom move the
// shared `current`, so every list advances together.
// Use it as a catalogue: copy the prop you need into your own Steps.
//
// Animation: Steps itself has no motion to switch off.
// Accessibility: an ordered list; the current step has aria-current="step"; with `onSelect` each step is a native
// button; done steps show a mark, so progress is not told by colour alone.
import { Steps, Button, Card } from "march/ui"
import { user, mail, flag, star } from "march/icons"

// Two sets of steps: one with descriptions and icons, one with titles only.
const SIGNUP = [
  { title: "Hesap", description: "E-posta", icon: user },
  { title: "Doğrula", description: "Kod", icon: mail },
  { title: "Başla", description: "Hazır", icon: flag },
]
const BASE = [{ title: "Sepet" }, { title: "Ödeme" }, { title: "Teslim" }]

// A small layout helper: a caption above one example, so each option has a name on the page.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function StepsLab() {
  // Reactive state: the current step (0-based) shared by every list, and the title of the step picked last.
  let $step = 1
  let $picked = "Doğrula"
  // Used as onSelect: it receives the index of the step that was pressed.
  const pick = (i: number) => { $step = i; $picked = SIGNUP[i]?.title ?? "" }
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Tıklanabilir (onSelect), ikon ve açıklama">
      {/* onSelect makes every step a button. Each step shows its icon and description. */}
      <Steps steps={SIGNUP} current={$step} onSelect={pick} class="lab-steps" />
    </Row>
    <span>{"Seçilen: " + $picked}</span>
    <Row title="Kendi işaretin: ikon (yıldız) ve kısa metin">
      {/* doneIcon replaces the check of a done step with an icon or with short text. m:color tints the lists. */}
      <Steps steps={BASE} current={$step} doneIcon={star} m:color="brand-gold" class="lab-star" />
      <Steps steps={BASE} current={$step} doneIcon="✔" m:color="brand-green" class="lab-text" />
    </Row>
    <Row title="Numara kalsın, çizgi yok (doneIcon={false}, connector={false})">
      {/* doneIcon={false} keeps the number in a done step; connector={false} removes the line between the steps. */}
      <Steps steps={BASE} current={$step} doneIcon={false} connector={false} class="lab-numbers" />
    </Row>
    <Row title="Kendi nokta içeriğin (renderDot)">
      {/* renderDot(index, state, step) returns whatever goes inside a dot; state is "done", "current" or "todo". */}
      <Steps steps={BASE} current={$step} renderDot={(i: number, state: string) => (state === "done" ? "★" : "ABC"[i])} m:color="brand-purple" class="lab-dots" />
    </Row>
    {/* m:theme="night" draws the card in the dark theme. `vertical` stacks the steps with their descriptions. */}
    <Card m:theme="night">
      <Row title="Dikey, koyu zemin">
        <Steps steps={SIGNUP} current={$step} vertical m:color="brand-blue" class="lab-vertical" />
      </Row>
    </Card>
    {/* Moves `current` back or forward; each button is disabled at its end (the forward one allows one step past the
        last, which marks every step as done). */}
    <div sx={{ flex: ["row", "between"], gap: 2 }}>
      <Button size="sm" disabled={$step === 0} on:click={() => $step--}>Geri</Button>
      <Button size="sm" variant="primary" disabled={$step >= SIGNUP.length} on:click={() => $step++}>İleri</Button>
    </div>
  </div>
}
