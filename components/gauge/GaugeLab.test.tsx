import { test, expect, renderTest } from "march/testing"
import { GaugeLab } from "./GaugeLab.tsx"

// Tests for GaugeLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: the gauge's accessibility (a role="meter" with its min, max, value and spoken text), the redline and
// peak events, the tachometer and VU variants, and the parts you can switch off.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <GaugeLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.find(text) returns the element that shows a text; s.sees(text) is true when that text is on screen.
// - s.wait(ms or predicate) waits for time to pass or for a condition (useful for animations and timers).
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// The selectors combine the lab-* wrapper classes of GaugeLab.tsx with the gauge's own class hooks (m-gauge, m-gauge-…).

// Proves the speedometer is an accessible meter: role, name (label), maximum and the spoken value with its unit.
test("kadran bir ölçer: en az, en çok, değer ve birim okunur", () => {
  const s = renderTest(() => <GaugeLab />)
  const g = s.get(".lab-speed .m-gauge")!
  expect(g.getAttribute("role")).toBe("meter")
  expect(g.getAttribute("aria-label")).toBe("Hız")
  expect(g.getAttribute("aria-valuemax")).toBe("100")
  expect(g.getAttribute("aria-valuetext")).toBe("40 km/h")
})

// Proves the redline behaviour: two clicks on the up button take 40 to 90, past redline 80. The root gets the
// is-redline class, onRedline(true) flips the log, and onPeak counted two new highest values (65 and 90).
test("kırmızı çizgiyi geçince kadran kızarır, onRedline ve onPeak haber verir", async () => {
  const s = renderTest(() => <GaugeLab />)
  await s.click(".lab-up")
  await s.click(".lab-up")
  expect(s.get(".lab-speed .m-gauge")!.getAttribute("class")).toContain("is-redline")
  expect(s.sees("Kırmızıda: evet")).toBe(true)
  expect(s.sees("Yeni tepe: 2")).toBe(true)
})

// Proves the variants' defaults: the tachometer labels thousands ("8" means 8000) and shows an odometer readout; the
// VU dial prints its "VU" caption and uses a dB scale that starts at −20.
test("devir göstergesi ×1000 etiketli ve çarklı; VU kadranı dB ölçeğinde", () => {
  const s = renderTest(() => <GaugeLab />)
  const labels = s.all(".lab-tach .m-gauge-label").map((x) => x.textContent)
  expect(labels).toContain("8")
  expect(s.get(".lab-tach .m-odo")).toBeTruthy()
  expect(s.get(".lab-vu .m-gauge-caption")!.textContent).toBe("VU")
  expect(s.get(".lab-vu .m-gauge")!.getAttribute("aria-valuemin")).toBe("-20")
})

// Proves customization: a readout function renders your own node, parts={{ ticks: false }} removes the ticks, and a
// gauge without face and readout gets the bare look (m-gauge-bare) and no readout element.
test("kendi göstergesi ve kapalı parçalar", () => {
  const s = renderTest(() => <GaugeLab />)
  expect(s.get(".lab-own b")!.textContent).toBe("40 puan")
  expect(s.get(".lab-own .m-gauge-ticks")).toBeFalsy()
  expect(s.get(".lab-bare .m-gauge")!.getAttribute("class")).toContain("m-gauge-bare")
  expect(s.get(".lab-bare .m-gauge-readout")).toBeFalsy()
})
