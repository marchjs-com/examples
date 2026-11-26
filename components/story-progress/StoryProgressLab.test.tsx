// Tests for StoryProgressLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StoryProgressLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element inside what was rendered.
// - The tests check what can be observed in the page (the class on the root, the text a screen reader gets) rather than
//   the fill animation itself, so they stay fast and keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text. .lab-sp is the class given to the bar in
// StoryProgressLab; m-story-progress is the class StoryProgress puts on its root.
import { test, expect, renderTest } from "march/testing"
import { StoryProgressLab } from "./StoryProgressLab.tsx"

// The `class` prop is added to the root, next to the component's own class.
test("ince bölümlü çubuk, class köke eklenir", () => {
  const s = renderTest(() => <StoryProgressLab />)
  expect(s.get(".lab-sp")?.classList.contains("m-story-progress")).toBe(true)
})

// `label` is a function of the index and the count, and its result is the text a screen reader hears for the bar
// (aria-valuetext). index 2 of 4 is the third story, so the page contains our own wording, "3 / 4".
test("label şimdiki hikâyeyi okur", () => {
  const s = renderTest(() => <StoryProgressLab />)
  expect(s.get(".lab-sp")?.outerHTML).toContain("Hikâye 3 / 4")
})
