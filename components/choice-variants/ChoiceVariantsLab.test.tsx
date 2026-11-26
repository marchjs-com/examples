// Tests for ChoiceVariantsLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ChoiceVariantsLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element; s.sees(text) says whether a text is visible; s.click(element) clicks like a
//   user and waits until the view has updated (so those tests are async and await it).
// - The tests check what a user or a screen reader can observe (the printed summary, the disabled and indeterminate
//   state of the real inputs) rather than internal state. The Lab gives each group a class (lab-chip, lab-radio...)
//   so the tests can find one look among many.
import { test, expect, renderTest } from "march/testing"
import { ChoiceVariantsLab } from "./ChoiceVariantsLab.tsx"

// All five checkbox looks are bound to the same $days array. Pressing the second option in the chip look must show up
// in the shared summary line (and so in every other look).
test("beş görünüm aynı değeri paylaşır; birinde seçmek hepsini değiştirir", async () => {
  const s = renderTest(() => <ChoiceVariantsLab />)
  await s.click(s.get(".lab-chip")!.querySelectorAll("input, [role=checkbox]")[1] as Element)
  expect(s.sees("Günler: mon, tue")).toBe(true)
})

// An option object with disabled: true gives a disabled real input (the third day) in every look.
test("kapalı seçenek seçilemez", () => {
  const s = renderTest(() => <ChoiceVariantsLab />)
  const wed = s.get(".lab-classic")!.querySelectorAll("input")[2] as HTMLInputElement
  expect(wed.disabled).toBe(true)
})

// A RadioGroup keeps exactly one value: pressing the fourth option replaces the previous one in the summary.
test("radyo tek değer seçer", async () => {
  const s = renderTest(() => <ChoiceVariantsLab />)
  await s.click(s.get(".lab-radio")!.querySelectorAll("input, [role=radio]")[3] as Element)
  expect(s.sees("tek: thu")).toBe(true)
})

// `indeterminate` is the native property of the single checkbox (the dash state), not only a style.
test("kısmi kutu indeterminate işaretlidir", () => {
  const s = renderTest(() => <ChoiceVariantsLab />)
  const box = s.get(".lab-partial input, input.lab-partial") as HTMLInputElement | null
  expect(!!box && box.indeterminate).toBe(true)
})
