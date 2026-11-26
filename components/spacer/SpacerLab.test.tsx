// Tests for SpacerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SpacerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.all(selector) finds every element that matches a CSS selector, inside the mounted component. These tests click nothing,
//   so they are synchronous.
// - Spacer has no props and no behaviour of its own, so there is not much to observe: the tests check that it renders its
//   element (.m-spacer, the class Spacer puts on its root) the expected number of times, and that the rows around it keep their
//   content. Visual placement (everything after the Spacer moving to the end) is a layout matter that this test environment
//   cannot measure.
// To adapt them: copy one test, change the selector or the expected count.
import { test, expect, renderTest } from "march/testing"
import { SpacerLab } from "./SpacerLab.tsx"

// Each Spacer is drawn as one m-spacer element: one in the first row, two in the second.
test("Spacer bir m-spacer öğesi çizer", () => {
  const s = renderTest(() => <SpacerLab />)
  expect(s.all(".lab-one .m-spacer").length).toBe(1)
  expect(s.all(".lab-two .m-spacer").length).toBe(2)
})

// The second row holds three buttons, with a Spacer between each pair of them.
test("iki Spacer üç düğmeyi ayırır", () => {
  const s = renderTest(() => <SpacerLab />)
  expect(s.all(".lab-two button").length).toBe(3)
})
