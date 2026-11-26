// Tests for KeyframeTimelineLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <KeyframeTimelineLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find("text") finds an element by visible text or aria-label (the keyframes are found by the accessible names we
//   gave them in `labels`); s.sees("text") says whether text is visible; s.get("selector") finds one by CSS selector.
// - s.click, s.focus and s.type act like a user and wait until the view has updated, so the tests that use them are
//   async. s.flush() waits one more update, which is needed here because the inspector opens after focus.
// - The tests check what a user or a screen reader can observe (names, text, disabled, a state class) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the accessible name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { KeyframeTimelineLab } from "./KeyframeTimelineLab.tsx"

// `labels` replaces the texts: the lane names, the keyframe names (built by the functions), the speed options from
// `speeds` and the hint text all appear exactly as the Lab wrote them.
test("kendi metinleri: izler, kareler ve hız seçenekleri", () => {
  const s = renderTest(() => <KeyframeTimelineLab />)
  expect(s.find("Roket · x izi")).not.toBe(null)
  expect(s.find("Roket rotate 2. kare")).not.toBe(null)
  expect(s.sees("3×")).toBe(true)
  expect(s.sees("Bir kare seç")).toBe(true)
})

// Focusing a keyframe selects it, which opens the inspector (its "delete" button appears). Typing a new time moves
// the keyframe, and the Lab's text line (which reads the model) and the onChange counter both update.
test("bir kareye odaklanınca denetçi açılır; zaman yazılınca değer değişir", async () => {
  const s = renderTest(() => <KeyframeTimelineLab />)
  await s.focus("Roket x 1. kare")
  await s.flush()
  expect(s.find("Kareyi sil")).not.toBe(null)
  await s.type("Zaman", 300)
  expect(s.sees("ilk x karesi: 300 ms")).toBe(true)
  expect(s.sees("değişiklik: 1")).toBe(true)
})

// The play button becomes the pause button while playing. We click again to pause so the test leaves no animation
// running.
test("oynat düğmesi duraklat olur", async () => {
  const s = renderTest(() => <KeyframeTimelineLab />)
  await s.click("Oynat")
  expect(s.find("Duraklat")).not.toBe(null)
  await s.click("Duraklat")
})

// The Toggle sets `readonly`: every keyframe becomes disabled and the root gets the is-readonly state class. The Toggle
// is clicked through its switch element, found from the label text.
test("kilitliyken kareler devre dışı", async () => {
  const s = renderTest(() => <KeyframeTimelineLab />)
  await s.click(s.find("Kilitle")!.closest("label")!.querySelector("[role=switch]")!)
  expect(s.find("Roket x 1. kare")?.hasAttribute("disabled")).toBe(true)
  expect(s.get(".lab-kt")?.className).toContain("is-readonly")
})
