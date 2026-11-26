import { test, expect, renderTest } from "march/testing"
import { LoudnessGraphLab } from "./LoudnessGraphLab.tsx"

// Tests for LoudnessGraphLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: the meter is a group of readouts (meters) named with your texts, your target line is drawn,
// the pause button stops the recording, and the parts options.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <LoudnessGraphLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - expect(x).toBe(y), toContain, toBeGreaterThan, toBeFalsy…: the assertions, as in Jest or Vitest.
// The tests read roles, names and counts that a user or a screen reader observes, not the pixels of the lines.

// Proves the structure: a group named by `label`, readouts that are meters named by `labels`, your own format
// ("-16" for -16 LUFS) and the "Podcast" target line on the graph.
test("göstergeler ölçerdir; adlar ve biçim sizindir; hedef çizgisi çizilir", () => {
  const s = renderTest(() => <LoudnessGraphLab />)
  const fed = s.get(".lab-fed")!
  expect(fed.getAttribute("role")).toBe("group")
  expect(fed.getAttribute("aria-label")).toBe("Elle beslenen ölçer")
  const meters = s.all(".lab-fed .m-lg-readout")
  expect(meters[0]!.getAttribute("role")).toBe("meter")
  expect(meters[1]!.getAttribute("aria-label")).toBe("Kısa süreli")
  expect(s.get(".lab-fed .m-lg-readout.is-shortTerm .m-lg-value")!.textContent).toContain("-18")
  expect(s.get('.lab-fed [data-series="target0"]')).toBeTruthy()
})

// Proves the pause control: the pause button pauses the recording (is-paused on the meter) and then offers to resume.
// (Readings are recorded only while the graph is on screen, so the test does not wait for them: a test screen may be
// out of view.)
test("Durdur kaydı durdurur, Sürdür geri açar", async () => {
  const s = renderTest(() => <LoudnessGraphLab />)
  await s.click(".lab-pause")
  expect(s.get(".lab-fed")!.getAttribute("class")).toContain("is-paused")
  expect(s.get(".lab-pause")!.textContent).toContain("Sürdür")
  await s.click(".lab-pause")
  expect(s.get(".lab-fed")!.getAttribute("class")).not.toContain("is-paused")
})

// Proves the parts options: the live meter has no correlation readout and no legend; the readouts-only meter has no
// loudness graph but keeps its correlation bar (and the correlation graph, which has its own part).
test("parçalar: korelasyonsuz canlı ölçer, grafiksiz gösterge", () => {
  const s = renderTest(() => <LoudnessGraphLab />)
  expect(s.get(".lab-live .m-lg-readout.is-correlation")).toBeFalsy()
  expect(s.get(".lab-live .m-lg-readout.is-integrated")).toBeTruthy()
  expect(s.get(".lab-readouts .m-lg-chart.is-loudness")).toBeFalsy()
  expect(s.get(".lab-readouts .m-lg-corr")).toBeTruthy()
})
