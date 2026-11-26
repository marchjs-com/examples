// Tests for ScrollProgressLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ScrollProgressLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null), s.all(selector) finds all matches.
// - s.click("text") clicks the control with that visible text (or aria-label); s.click(element) clicks an element you
//   already hold. Both wait until the view has updated, which is why the tests that click are async and await them.
// - The tests check what a user or a screen reader can observe (the progressbar's accessible name and range, the
//   part classes of the drawn bar) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the selector or the expected value. The bar carries state classes such as
// .m-scroll-progress-inline, -fixed, -gradient and -accent.
import { test, expect, renderTest } from "march/testing"
import { ScrollProgressLab } from "./ScrollProgressLab.tsx"

// The bar is a role="progressbar": it must have an accessible name (the `label` prop) and a 0-100 range.
test("bir ilerleme çubuğu: adı ve 0–100 aralığı var", () => {
  const s = renderTest(() => <ScrollProgressLab />)
  const bar = s.get('.lab-progress [role="progressbar"]')
  expect(bar?.getAttribute("aria-label")).toBe("Sayfanın okunan kısmı")
  expect(bar?.getAttribute("aria-valuemin")).toBe("0")
})

// Defaults of the Lab are position inline and paint gradient; clicking the "vurgu" option switches the paint to the
// accent colour, which swaps the paint class on the bar.
test("satır içinde ve gradyan boyayla başlar; vurguya geçer", async () => {
  const s = renderTest(() => <ScrollProgressLab />)
  expect(s.get(".m-scroll-progress-inline.m-scroll-progress-gradient")).not.toBe(null)
  await s.click("vurgu")
  expect(s.get(".m-scroll-progress-accent")).not.toBe(null)
})

// The first switch is the "pin to the top of the page" one: the bar changes from inline to fixed, so the inline
// class must be gone.
test("sabitleme anahtarı çubuğu sayfanın üstüne taşır", async () => {
  const s = renderTest(() => <ScrollProgressLab />)
  await s.click(s.all('[role="switch"]')[0]!)
  expect(s.get(".m-scroll-progress-fixed")).not.toBe(null)
  expect(s.get(".m-scroll-progress-inline")).toBe(null)
})

// The third switch is the "measure only this box" one: the Lab passes a `target` and a matching label,
// so the accessible name changes to the box's name.
test("kutuyu ölçerken adı değişir", async () => {
  const s = renderTest(() => <ScrollProgressLab />)
  await s.click(s.all('[role="switch"]')[2]!)
  expect(s.get('.lab-progress [role="progressbar"]')?.getAttribute("aria-label")).toBe("Kutunun okunan kısmı")
})
