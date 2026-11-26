import { test, expect, renderTest } from "march/testing"
import { LevelMeterLab } from "./LevelMeterLab.tsx"

// Tests for LevelMeterLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: each channel is an accessible meter, the clip light latches and resets (and fires its callbacks),
// the dB scale marks, the horizontal meter and your own spoken text.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <LevelMeterLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.find(text) returns the element that shows a text; s.sees(text) is true when that text is on screen.
// - s.wait(ms or predicate) waits for time to pass or for a condition (useful for animations and timers).
// - expect(x).toBe(y), toContain, toBeGreaterThan, not.toContain…: the assertions, as in Jest or Vitest.

// Proves the stereo meter's accessibility and structure: two role="meter" elements named label + channel name, the
// right channel's value as 0–100, the visible channel letters, and 20 segments per channel (40 in all).
test("her kanal bir ölçer: adı ve değeri ekran okuyucuya gider, harfler görünür", () => {
  const s = renderTest(() => <LevelMeterLab />)
  const meters = s.all(".lab-stereo .m-lm-meter")
  expect(meters.length).toBe(2)
  expect(meters[0]!.getAttribute("role")).toBe("meter")
  expect(meters[0]!.getAttribute("aria-label")).toBe("Kanal, A kanalı")
  expect(meters[1]!.getAttribute("aria-valuenow")).toBe("60")
  expect(s.get(".lab-stereo")!.textContent).toContain("A")
  expect(s.all(".lab-stereo .m-lm-seg").length).toBe(40)
})

// Proves the latched clip light: two clicks on the up button push the levels past 0.95, the light turns on (is-on)
// and onClip counted; clicking the light turns it off and onClipReset runs once.
test("Yükselt kırpılma ışığını yakar; basınca söner ve sayılır", async () => {
  const s = renderTest(() => <LevelMeterLab />)
  await s.click(".lab-up")
  await s.click(".lab-up")
  const clip = s.get(".lab-stereo .m-lm-clip")!
  expect(clip.getAttribute("class")).toContain("is-on")
  expect(Number(s.get(".lab-clips")!.textContent)).toBeGreaterThan(0)
  await s.click(".lab-stereo .m-lm-clip")
  expect(s.get(".lab-stereo .m-lm-clip")!.getAttribute("class")).not.toContain("is-on")
  expect(s.get(".lab-resets")!.textContent).toBe("1")
})

// Proves the scale and the options: the dB meter's marks run from the floor (−60) to 0, the load meter is horizontal
// (m-lm-h), its spoken value comes from `format`, and clip={false} leaves no clip light.
test("dB ölçeği işaretleri, yatay ölçer ve kendi okunan metni", () => {
  const s = renderTest(() => <LevelMeterLab />)
  const marks = s.all(".lab-db .m-lm-tick").map((t) => t.textContent)
  expect(marks).toContain("-60")
  expect(marks).toContain("0")
  expect(s.get(".lab-cpu")!.getAttribute("class")).toContain("m-lm-h")
  expect(s.get(".lab-cpu .m-lm-meter")!.getAttribute("aria-valuetext")).toBe("yüzde 40")
  expect(s.get(".lab-cpu .m-lm-clip")).toBeFalsy()
})
