// Tests for TooltipLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TooltipLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns the first matching element; s.click(text) clicks like a user and waits until the view has
//   updated; s.flush(2) waits for the view to update after you fired an event yourself (dispatchEvent), and a
//   tooltip needs a couple of rounds before it is drawn.
// - The tests check what a screen reader can observe (aria-describedby on the target while the hint is shown) rather
//   than where the bubble is drawn, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the event or the expected value.
import { test, expect, renderTest } from "march/testing"
import { TooltipLab } from "./TooltipLab.tsx"

// Keyboard focus shows the hint at once: we fire focusin on the wrapper (class m-tip-anchor), then the target Button
// carries aria-describedby, which is how the hint is linked to it.
test("odakta ipucu açılır ve hedefe aria-describedby ile bağlanır", async () => {
  const s = renderTest(() => <TooltipLab />)
  s.get(".m-tip-anchor")!.dispatchEvent(new Event("focusin", { bubbles: true }))
  await s.flush(2)
  expect(s.get(".lab-target")?.hasAttribute("aria-describedby")).toBe(true)
})

// disabled: the second button switches the tooltip off; the same focus event now leaves the target without
// aria-describedby, because the hint never shows.
test("disabled iken ipucu açılmaz", async () => {
  const s = renderTest(() => <TooltipLab />)
  await s.click("İpucunu kapat")
  s.get(".m-tip-anchor")!.dispatchEvent(new Event("focusin", { bubbles: true }))
  await s.flush(2)
  expect(s.get(".lab-target")?.hasAttribute("aria-describedby")).toBe(false)
})
