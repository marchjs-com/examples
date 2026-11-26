// StepperLab: the full-featured Stepper example.
//
// What it shows: every Stepper option: steps, current, onSelect, panels (a list or a function), nav, finishLabel,
// onFinish, vertical, morph, highlight, counter (your own text or false), labels (back, next, step), doneIcon,
// renderDot, connector, class and m:color. The first Stepper uses most of them; the second, on a dark card, switches
// the extras off. Two buttons flip `vertical` and `morph` live.
//
// Animation: the highlight and the panel morph run on March's motion engine, so the global speed, "Stop all" and the
// visitor's reduced-motion preference apply (with reduced motion the highlight jumps and panels switch at once).
// `morph={false}` (here driven by a button) makes the highlight and the panel change at once, and `highlight={false}`
// removes the highlight.
// Accessibility: the steps are a list with aria-current="step" (buttons, because of onSelect); the panel is a polite
// live region whose name comes from `labels.step`; Back / Next are real buttons that control the panel.
import { Stepper, Button, Card } from "march/ui"
import { user, mail, flag, star } from "march/icons"

// The steps: a title, a short description and an icon each. Both Steppers share them.
const STEPS = [
  { title: "Hesap", description: "E-posta", icon: user },
  { title: "Doğrula", description: "Kod", icon: mail },
  { title: "Başla", description: "Hazır", icon: flag },
]

export function StepperLab() {
  // Reactive state: the current step (shared by both Steppers), the two live switches, and a counter for onFinish.
  let $step = 0
  let $vertical = false
  let $morph = true
  let $finished = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The two switches. Each Stepper prop they drive is a plain value read from state, so it is live. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $vertical = !$vertical}>{$vertical ? "Yatay yap" : "Dikey yap"}</Button>
      <Button size="sm" on:click={() => $morph = !$morph}>{$morph ? "Morph kapat" : "Morph aç"}</Button>
    </div>
    {/* The full Stepper. onSelect receives the index of a clicked step and of the Back / Next buttons. vertical and
        morph are live. panels as a function gets the index and returns the panel. labels: back and next rename the
        buttons, step writes the panel's accessible name. finishLabel and onFinish belong to the last step's button.
        counter is our own text between Back and Next (false would remove it). doneIcon changes the mark of a done
        step; m:color tints it with a colour token; class is kept on the root (the tests find it). */}
    <Stepper steps={STEPS} current={$step} onSelect={(i: number) => $step = i} vertical={$vertical} morph={$morph}
      panels={(i: number) => <p>{["E-posta adresini yaz.", "Gelen kodu gir.", "Her şey hazır!"][i]}</p>}
      labels={{ back: "Önceki", next: "Devam", step: (i: number, n: number) => `Aşama ${i + 1} / ${n}` }}
      finishLabel="Bitir" onFinish={() => $finished++} counter={(i: number, n: number) => `${i + 1}. adım, toplam ${n}`}
      doneIcon={star} m:color="brand-purple" class="lab-main" />
    <span>{"Bitirme sayısı: " + $finished}</span>
    {/* A bare Stepper on a dark card (m:theme="night"). nav={false}: no Back / Next buttons; highlight={false}: no
        liquid highlight; counter={false}: no counter; connector={false}: no line between the steps (these last ones
        are passed on to Steps). renderDot writes our own content into each dot from its state ("done", "current" or
        "todo"). panels given as a plain list. */}
    <Card m:theme="night">
      <Stepper steps={STEPS} current={$step} panels={["bir", "iki", "üç"]} nav={false} highlight={false} counter={false}
        connector={false} renderDot={(i: number, state: string) => (state === "done" ? "✓" : "ABC"[i])} m:color="brand-blue" class="lab-bare" />
    </Card>
  </div>
}
