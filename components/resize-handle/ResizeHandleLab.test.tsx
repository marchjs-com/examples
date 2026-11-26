// Tests for ResizeHandleLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ResizeHandleLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - s.focus(el) focuses an element and s.press(key, el) sends a keydown to it, as a user using the keyboard would;
//   we test the keyboard because pointer dragging is covered by the behavior's own tests.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { ResizeHandleLab } from "./ResizeHandleLab.tsx"

// With `value` + `set` the handle is a complete separator: role="separator" and the accessible name from `label`.
test("value + set ile tam ayırıcı", () => {
  const s = renderTest(() => <ResizeHandleLab />)
  const h = s.get(".lab-full")
  expect(h?.getAttribute("role")).toBe("separator")
  expect(h?.getAttribute("aria-label")).toBe("Genişlik")
})

// ArrowRight moves the value by one `step` (10): the width goes from 200 to 210 px, so the keyboard way works.
test("ok tuşu bir adım büyütür", async () => {
  const s = renderTest(() => <ResizeHandleLab />)
  const h = s.get(".lab-full") as HTMLElement
  await s.focus(h)
  await s.press("ArrowRight", h)
  expect(s.get(".lab-w")?.textContent).toBe("210 px")
})

// A corner handle without value / set is only a grip; with `onStep` it becomes focusable and arrow keys call onStep.
test("köşede ok tuşu onStep'i çağırır", async () => {
  const s = renderTest(() => <ResizeHandleLab />)
  await s.press("ArrowDown", s.get(".lab-corner"))
  expect(s.get(".lab-steps")?.textContent).toBe("1 adım")
})
