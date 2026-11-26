// Tests for CounterLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CounterLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all find elements by CSS selector; s.click(text) clicks like a user and waits until the view has updated;
//   s.flush() lets the view settle. Tests that click are async and await it.
// - The tests use the "none" mode at the start (no motion), so the number is final at once and the checks do not depend
//   on timing. They check observable things: the visible text, the screen-reader copy and aria-hidden.
import { test, expect, renderTest } from "march/testing"
import { CounterLab } from "./CounterLab.tsx"

// prefix and suffix are drawn on both sides of the number, as separate parts.
test("ön ve son ek sayının iki yanında", () => {
  const s = renderTest(() => <CounterLab />)
  const affix = s.all(".lab-counter .m-counter-affix")
  expect(affix.length).toBe(2)
  expect(affix[0]?.textContent).toBe("★")
  expect(affix[1]?.textContent).toBe(" puan")
})

// With mode="none" the number is written at once; a live `value` (a function) updates it when the button raises the score.
// The grouping is switched off in `format`, so the text is "42" and then "50".
test("hareketsiz türde sayı hemen yazılır; düğmeyle değişir", async () => {
  const s = renderTest(() => <CounterLab />)
  await s.flush()
  expect(s.get(".lab-counter .m-counter-view")?.textContent).toBe("42")
  await s.click("+8 puan")
  expect(s.get(".lab-counter .m-counter-view")?.textContent).toBe("50")
})

// Accessibility: a visually hidden copy holds the final value for screen readers, and the moving digits are aria-hidden,
// so a screen reader does not read every step of the count.
test("ekran okuyucu son değeri bir kez okur", async () => {
  const s = renderTest(() => <CounterLab />)
  await s.click("+8 puan")
  expect(s.get(".lab-counter .m-sr-only")?.textContent).toBe("50")
  expect(s.get(".lab-counter .m-counter-view")?.getAttribute("aria-hidden")).toBe("true")
})

// Choosing the "roll" mode redraws the counter as an odometer; the root gets the m-counter-roll class.
test("odometre türüne geçince basamaklar döner", async () => {
  const s = renderTest(() => <CounterLab />)
  await s.click("roll")
  expect(s.get(".lab-counter")?.classList.contains("m-counter-roll")).toBe(true)
})
