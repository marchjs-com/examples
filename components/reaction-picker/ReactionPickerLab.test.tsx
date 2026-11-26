// Tests for ReactionPickerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ReactionPickerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - Buttons are found by the names the Lab gives them with `emojiLabel` and `moreLabel`.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { ReactionPickerLab } from "./ReactionPickerLab.tsx"

// The selected emoji is aria-pressed; pressing another one calls onPick and the Lab shows it.
test("seçili tepki aria-pressed, basınca onPick", async () => {
  const s = renderTest(() => <ReactionPickerLab />)
  expect(s.find("Tepki 👍")?.getAttribute("aria-pressed")).toBe("true")
  await s.click("Tepki 🔥")
  expect(s.get(".lab-sel")?.textContent).toContain("🔥")
})

// onMore shows a + button named by `moreLabel`; pressing it calls onMore (the Lab counts the calls).
test("+ düğmesi moreLabel adıyla onMore'u çağırır", async () => {
  const s = renderTest(() => <ReactionPickerLab />)
  await s.click("Daha çok")
  expect(s.get(".lab-sel")?.textContent).toContain("1")
})

// layout="grid" draws the panel (a class of the grid layout) and picking an emoji in it calls onPick.
test("grid düzeni panel olarak çizilir ve seçer", async () => {
  const s = renderTest(() => <ReactionPickerLab />)
  expect(s.get(".lab-grid")?.className).toContain("m-react-grid")
  await s.click("🥳")
  expect(s.get(".lab-sel")?.textContent).toContain("🥳")
})
