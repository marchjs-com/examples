// Tests for StoryRingLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StoryRingLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(text) finds the element by its text or accessible name and clicks like a user, then waits until the view
//   has updated (so a test that clicks is async and awaits it); s.get(selector) finds one element.
// - The tests check what a user or a screen reader can observe (the accessible name, the role, a counter in the page)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. .m-sring-add is the badge part of StoryRing;
// .lab-* classes come from StoryRingLab.
import { test, expect, renderTest } from "march/testing"
import { StoryRingLab } from "./StoryRingLab.tsx"

// With `onClick` the ring is a button, and `ariaLabel` is its accessible name: we click it by that name and the
// click counter in the page goes from 0 to 1.
test("onClick ile halka bir düğme olur, ariaLabel adını verir", async () => {
  const s = renderTest(() => <StoryRingLab />)
  await s.click("Elif'in hikâyesi")
  expect(s.get(".lab-clicks")?.textContent).toBe("1")
})

// Without `onClick` the ring is an image (role="img"), not a button.
test("onClick yoksa resim rolünde", () => {
  const s = renderTest(() => <StoryRingLab />)
  expect(s.get(".lab-img")?.getAttribute("role")).toBe("img")
})

// `add` draws the badge, and `addIcon` puts our own icon (an svg) inside it.
test("add rozeti addIcon ile çizilir", () => {
  const s = renderTest(() => <StoryRingLab />)
  expect(s.get(".lab-img .m-sring-add svg")).not.toBe(null)
})
