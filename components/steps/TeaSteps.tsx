// TeaSteps: the creative-minimal Steps example.
//
// What it shows: making a glass of tea in four steps. Each press on the button moves to the next step; at the end the
// message says the tea is ready and the button offers another glass. Because `onSelect` is set, the steps are also
// buttons, so you can jump to any step by clicking it.
// When to use this pattern: a short list of stages the user moves through, where going back matters (a checkout, a
// recipe). Steps is only the list; the state ($step) and the buttons are yours.
//
// Animation: Steps itself has no motion to switch off.
// Accessibility: an ordered list; the current step has aria-current="step" and is a native button because of onSelect;
// the text beside the button says the current step in words.
import { Steps, Button, Card } from "march/ui"
import { zap, coffee, clock, smile } from "march/icons"

// The steps: a title and an icon each (an icon is shown in the step's dot).
const TEA = [
  { title: "Su kaynasın", icon: zap },
  { title: "Demle", icon: coffee },
  { title: "Beklet", icon: clock },
  { title: "Afiyet", icon: smile },
]

export function TeaSteps() {
  // Reactive state: the index of the current step, and a value derived from it.
  let $step = 0
  // A derived value: true once the index is past the last step, meaning all steps are done.
  const $ready = $step >= TEA.length
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* current says where we are; onSelect receives the index of a clicked step and makes each step a button.
          m:color tints the active marks with a colour token. */}
      <Steps steps={TEA} current={$step} onSelect={(i: number) => $step = i} m:color="brand-orange" />
      <div sx={{ flex: ["row", "between"], gap: 2 }}>
        {/* The current instruction in words (the colour changes to success when finished). The button advances by one,
            and after the last step it starts again from the first. */}
        <span sx={{ text: "lg", color: $ready ? "success" : "muted" }}>{$ready ? "Çay hazır, afiyet olsun!" : "Sıradaki: " + TEA[$step]?.title}</span>
        <Button variant="primary" on:click={() => $step = $ready ? 0 : $step + 1}>{$ready ? "Bir bardak daha" : "Sonraki adım"}</Button>
      </div>
    </div>
  </Card>
}
