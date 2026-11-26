// PizzaStepper: the creative-minimal Stepper example.
//
// What it shows: making a pizza in four steps. Each step's panel morphs into the previous one (it blurs out while the
// next arrives), the highlight flows from step to step, and the last button "puts the pizza in the oven" and shows a
// message under the stepper.
// When to use this pattern: the smallest useful Stepper: a list of steps, a list of panels, the current index and a
// finish action. Back / Next buttons and a "2 / 4" counter come with it.
//
// Animation: the liquid highlight and the panel morph run on March's motion engine, so the global speed, "Stop all"
// and the visitor's reduced-motion preference apply (with reduced motion the highlight jumps and panels switch at
// once). `morph={false}` turns the morph off for one Stepper and `highlight={false}` removes the highlight.
// Accessibility: the steps are a list with aria-current="step" (buttons here, since onSelect is set); the panel is a
// polite live region named "Step n of m"; Back / Next are real buttons.
import { Stepper } from "march/ui"

// Step titles and one panel text per step (same order).
const STEPS = [{ title: "Hamur" }, { title: "Sos" }, { title: "Peynir" }, { title: "Fırın" }]
const PANELS = ["🍞 İnce hamur açıldı.", "🍅 Domates sosu sürüldü.", "🧀 Bol mozzarella serpildi.", "🔥 250°C, 8 dakika."]

export function PizzaStepper() {
  // Reactive state: the current step, and whether the pizza is already in the oven.
  let $step = 0
  let $baked = false
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* onSelect gets the index from a click on a step or on Back / Next; here it also resets the finished message.
        panels is a list of nodes, one per step. m:color tints the highlight with a colour token. labels renames the
        Back / Next buttons; finishLabel is the text of the last step's button and onFinish runs when it is pressed. */}
    <Stepper steps={STEPS} current={$step} onSelect={(i: number) => { $step = i; $baked = false }} m:color="brand-orange"
      panels={PANELS.map((t) => <p sx={{ text: "lg" }}>{t}</p>)} labels={{ back: "Geri", next: "Sonraki" }} finishLabel="Fırına ver" onFinish={() => $baked = true} />
    {/* Empty until the last button is pressed; text-based so it is read out like any other text. */}
    <span sx={{ text: "bold", color: "success" }}>{$baked ? "Pizza fırında, afiyet olsun! 🍕" : ""}</span>
  </div>
}
