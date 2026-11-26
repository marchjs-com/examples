// Tests for StatLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StatLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element; s.click(selector) clicks like a user and waits until the view has updated
//   (that is why a test that clicks is async and awaits it).
// - The tests check what a user can observe (the written value, the arrow direction, good / bad styling) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. The class names of the parts
// (.m-stat-value, .m-stat-delta, .m-stat-good ...) are listed in the Stat docs; .lab-* classes come from StatLab.
import { test, expect, renderTest } from "march/testing"
import { StatLab } from "./StatLab.tsx"

// The value goes through `format` ("120 puan"), and 120 against previous=100 is an increase, which Stat marks as good
// (green). The change text contains the difference, 20 here.
test("değer biçimlenir; önceki değere göre artış iyi (yeşil)", () => {
  const s = renderTest(() => <StatLab />)
  const main = s.get(".lab-main")!
  expect(main.querySelector(".m-stat-value")!.textContent).toBe("120 puan")
  expect(main.querySelector(".m-stat-delta")!.className).toContain("m-stat-good")
  expect(main.querySelector(".m-stat-delta-value")!.textContent).toContain("20")
})

// After "Azalt" the value falls below previous, so the change flips to down and bad. Both are separate classes: the
// direction (down) and the judgement (bad) are decided independently, which is what `invert` relies on.
test("azalınca değişim düşüşe ve kötüye döner", async () => {
  const s = renderTest(() => <StatLab />)
  await s.click(".lab-down")
  const delta = s.get(".lab-main .m-stat-delta")!
  expect(delta.className).toContain("m-stat-down")
  expect(delta.className).toContain("m-stat-bad")
})

// The sparkline exists while there is data. When the value is removed, `empty` is written in its place.
test("değer yoksa boş metni yazar; eğilim çizgisi var", async () => {
  const s = renderTest(() => <StatLab />)
  expect(s.get(".lab-main .m-sparkline")).toBeTruthy()
  await s.click(".lab-none")
  expect(s.get(".lab-main .m-stat-value")!.textContent).toBe("ölçülmedi")
})

// With `invert`, an increase (delta +25 % on a latency) is judged bad, so the change gets the bad class.
test("invert: maliyetteki artış kötüdür", () => {
  const s = renderTest(() => <StatLab />)
  expect(s.get(".lab-cost .m-stat-delta")!.className).toContain("m-stat-bad")
})
