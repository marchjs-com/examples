// Tests for BottomRightControlsLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <BottomRightControlsLab />) mounts the component in a fresh, isolated root and returns a
//   handle `s`.
// - s.get(selector) returns one element, s.click(text) clicks like a user and waits until the view has updated (that
//   is why the test that clicks is async and awaits it).
// - The tests check what a user can observe (the corner's accessible name, the text of the controls in it) rather
//   than internal state. The page corners belong to the whole page, not to the test's box, so one test looks at the
//   document instead of the test root.
// To adapt them: copy one test, change the text you click or expect.
import { test, expect, renderTest } from "march/testing"
import { BottomRightControlsLab } from "./BottomRightControlsLab.tsx"

// The BottomRightControls corner is drawn with the accessible name given in `label`.
test("köşe kendi adıyla çizilir", () => {
  const s = renderTest(() => <BottomRightControlsLab />)
  expect(s.get(".lab-corner")?.getAttribute("aria-label")).toBe("Sayfa denetimleri")
})

// addBottomRightControl puts a control in the corner and returns an off() function that takes it out again. The Lab
// adds two controls (the counter says "2 denetim"), then removes all of them with their off() functions.
test("eklenen denetim köşeye girer, off() çıkarır", async () => {
  const s = renderTest(() => <BottomRightControlsLab />)
  await s.click("Köşeye ekle")
  await s.click("Köşeye ekle")
  // The bottom-end corner is one for the page: it may sit outside the test's box, so we search the whole document.
  const corner = () => document.querySelector(".m-corner-bottom-end, .lab-corner")?.textContent ?? ""
  expect(s.get(".lab-count")?.textContent).toBe("2 denetim")
  expect(document.body.textContent).toContain("Denetim 2")
  await s.click("Hepsini çıkar")
  expect(s.get(".lab-count")?.textContent).toBe("0 denetim")
  expect(corner()).not.toContain("Denetim 1")
})
