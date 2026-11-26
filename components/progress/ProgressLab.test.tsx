// Tests for ProgressLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ProgressLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The bars carry classes set in the Lab (.lab-video, .lab-line, .lab-vertical, .lab-story) so a test can pick one.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { ProgressLab } from "./ProgressLab.tsx"

// The bar is a progressbar whose accessible name comes from `label`; its aria-valuenow follows the value, which the
// "+20" button raises from 40 to 60. The same element is read again after the click, so it was updated in place.
test("progressbar adı label'dan gelir; değer düğmeyle artar", async () => {
  const s = renderTest(() => <ProgressLab />)
  const bar = s.get("[aria-label='Ton success']")
  expect(bar?.getAttribute("role")).toBe("progressbar")
  expect(bar?.getAttribute("aria-valuenow")).toBe("40")
  await s.click("+20")
  expect(bar?.getAttribute("aria-valuenow")).toBe("60")
})

// A function passed as showValue writes the visible text, and `valueText` writes aria-valuetext: sighted users and
// screen readers can be told different things for the same value.
test("showValue fonksiyonu kendi metnini, valueText aria-valuetext'i yazar", () => {
  const s = renderTest(() => <ProgressLab />)
  const video = s.get(".lab-video")
  expect(video?.querySelector(".m-progress2-value")?.textContent).toBe("192 / 480 MB (%40)")
  expect(video?.querySelector("[role=progressbar]")?.getAttribute("aria-valuetext")).toBe("192 MB / 480 MB")
})

// A bar without a value is indeterminate (exactly one in the Lab); `decorative` hides the track from assistive
// technology; orientation="vertical" adds the vertical class.
test("değersiz çubuk belirsiz; decorative yardımcı teknolojiden gizli", () => {
  const s = renderTest(() => <ProgressLab />)
  expect(s.all(".is-indeterminate").length).toBe(1)
  expect(s.get(".lab-line .m-progress2-track")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-vertical")?.classList.contains("m-progress2-vertical")).toBe(true)
})

// segments={4} draws four equal parts.
test("segments parçaları çizer", () => {
  const s = renderTest(() => <ProgressLab />)
  expect(s.get(".lab-story")?.querySelectorAll(".m-progress2-seg").length).toBe(4)
})
