// CompassLab.test.tsx: tests for the full-featured Compass example.
// They run in the MarchIDE "Tests" tab each time you save. What they cover: the compass as an accessible meter with
// the heading in words, the rose turning with the heading, the needle mode, your own names and readout, the parts.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <CompassLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.wait(ms) lets time pass (the spoken value follows at most 4 times a second).
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// The tests check what users and screen readers observe (names, texts, the rose's rotation), not private state.
import { test, expect, renderTest } from "march/testing"
import { CompassLab } from "./CompassLab.tsx"

// Reads an SVG rotation in degrees from a transform attribute ("rotate(-30 100 100)" → -30).
const angle = (el: Element | null) => Number(/rotate\(([-\d.]+)/.exec(el!.getAttribute("transform")!)![1])

// Proves accessibility: the dial is a meter from 0 to 360, named with the bearing.
test("pusula bir ölçer: 0–360, adında hedef rota", () => {
  const s = renderTest(() => <CompassLab />)
  const g = s.get(".lab-rose .m-gauge")!
  expect(g.getAttribute("role")).toBe("meter")
  expect(g.getAttribute("aria-valuemax")).toBe("360")
  expect(g.getAttribute("aria-label")).toContain("Gemi")
})

// Proves the rose mode: the scale turns by minus the heading (30° → −30°), and +45° turns it to −75° at once
// (motion={false} on that compass). After a moment the spoken heading follows ("075°").
test("gül, yönün tersine döner; okunan yön izler", async () => {
  const s = renderTest(() => <CompassLab />)
  expect(angle(s.get(".lab-rose .m-gauge-scale"))).toBe(-30)
  await s.click(".lab-right")
  expect(angle(s.get(".lab-rose .m-gauge-scale"))).toBe(-75)
  await s.wait(300)
  expect(s.get(".lab-rose .m-gauge")!.getAttribute("aria-valuetext")).toContain("075°")
})

// Proves the needle mode (a fixed rose with a north needle) and your own names and readout.
test("ibre kipi, kendi yön adları ve göstergesi", () => {
  const s = renderTest(() => <CompassLab />)
  expect(s.get(".lab-needle .m-compass-north")).toBeTruthy()
  expect(s.get(".lab-needle .m-compass-lubber")).toBeFalsy()
  expect(s.all(".lab-own .m-gauge-label").map((x) => x.textContent)).toContain("K")
  expect(s.get(".lab-own b")!.textContent).toBe("30 derece")
})

// Proves customization: the bare compass has no face, labels, readout or bearing mark, and carries its class.
test("kapalı parçalar ve kendi sınıfı", () => {
  const s = renderTest(() => <CompassLab />)
  expect(s.get(".lab-bare .m-gauge")!.getAttribute("class")).toContain("m-gauge-bare")
  expect(s.get(".lab-bare .m-gauge-label")).toBeFalsy()
  expect(s.get(".lab-bare .m-compass-readout")).toBeFalsy()
  expect(s.get(".lab-bare .m-compass")!.getAttribute("class")).toContain("lab-mine")
})
