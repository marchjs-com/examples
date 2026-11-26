import { test, expect, renderTest } from "march/testing"
import { StereoVuLab } from "./StereoVuLab.tsx"

// Tests for StereoVuLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: the panel is a group of two meters named with your texts, the peak lights come on over the level
// and turn off when pressed (with their callbacks), and the parts options.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <StereoVuLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - expect(x).toBe(y), toContain, toBeGreaterThan, toBeFalsy…: the assertions, as in Jest or Vitest.
// The tests read roles, names, classes and counters: what a user and a screen reader observe, not the needle angles.

// Proves the accessible structure: a group named by `label` holding two meters named with the channel names, and
// the visible letters from `labels`.
test("panel bir grup; her kanal adıyla bir ölçer", () => {
  const s = renderTest(() => <StereoVuLab />)
  const pair = s.get(".lab-pair")!
  expect(pair.getAttribute("role")).toBe("group")
  expect(pair.getAttribute("aria-label")).toBe("Karşılaştırma")
  const meters = s.all(".lab-pair .m-gauge")
  expect(meters.length).toBe(2)
  expect(meters[0]!.getAttribute("role")).toBe("meter")
  expect(meters[1]!.getAttribute("aria-label")).toBe("Karşılaştırma, sağ")
  expect(s.get(".lab-pair .m-svu-label")!.textContent).toBe("S")
})

// Proves the peak lights: the "too loud" button pushes both channels over +1 VU, both lights come on (is-on) and onPeak
// counts; pressing a light turns it off and onPeakReset counts once.
test("Çok yüksek tepe ışıklarını yakar; basınca söner", async () => {
  const s = renderTest(() => <StereoVuLab />)
  await s.click(".lab-loud")
  const light = s.get(".lab-pair .m-svu-light")!
  expect(light.getAttribute("class")).toContain("is-on")
  expect(Number(s.get(".lab-peaks")!.textContent)).toBeGreaterThan(0)
  await s.click(".lab-pair .m-svu-light")
  expect(s.get(".lab-pair .m-svu-light")!.getAttribute("class")).not.toContain("is-on")
  expect(s.get(".lab-resets")!.textContent).toBe("1")
})

// Proves the parts options: the live pair has no lights and no glass, the bare pair has no housing and no letters.
test("parçalar: ışıksız, camsız ve gövdesiz paneller", () => {
  const s = renderTest(() => <StereoVuLab />)
  expect(s.get(".lab-live .m-svu-light")).toBeFalsy()
  expect(s.get(".lab-live")!.getAttribute("class")).toContain("m-svu-noglass")
  expect(s.get(".lab-bare")!.getAttribute("class")).toContain("m-svu-bare")
  expect(s.get(".lab-bare .m-svu-label")).toBeFalsy()
})
