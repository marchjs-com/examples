// BatteryGaugeLab.test.tsx: tests for the full-featured BatteryGauge example.
// They run in the MarchIDE "Tests" tab each time you save. What they cover: the battery as an accessible meter, the
// low / critical states and their event, the segments and the charging icon, and the parts you can switch off.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <BatteryGaugeLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.sees(text) is true when that text is on screen.
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// The tests check what users and screen readers observe, not the component's private state.
import { test, expect, renderTest } from "march/testing"
import { BatteryGaugeLab } from "./BatteryGaugeLab.tsx"

// Proves accessibility: a meter from 0 to 100 named "Ana pil", with the percentage as its value.
test("pil bir ölçer: 0–100, adı ve yüzdesi okunur", () => {
  const s = renderTest(() => <BatteryGaugeLab />)
  const m = s.get(".lab-fillbar .m-battery")!
  expect(m.getAttribute("role")).toBe("meter")
  expect(m.getAttribute("aria-label")).toBe("Ana pil")
  expect(m.getAttribute("aria-valuenow")).toBe("50")
})

// Proves the states: two drains take 50 to 10, through low (≤ 30) to critical (≤ 15); the class, the event and the
// spoken text all say so.
test("düşük ve kritik durumlar: sınıf, olay ve okunan metin", async () => {
  const s = renderTest(() => <BatteryGaugeLab />)
  await s.click(".lab-drain")
  expect(s.get(".lab-fillbar .m-battery")!.getAttribute("class")).toContain("is-low")
  await s.click(".lab-drain")
  expect(s.get(".lab-fillbar .m-battery")!.getAttribute("class")).toContain("is-critical")
  expect(s.sees("Durum: critical")).toBe(true)
  expect(s.get(".lab-fillbar .m-battery")!.getAttribute("aria-valuetext")).toContain("10%")
})

// Proves the segments and charging: four cells, a vertical case, your own charging icon and the outside percentage.
test("hücreler, dikey kasa, kendi şarj ikonu", () => {
  const s = renderTest(() => <BatteryGaugeLab />)
  expect(s.all(".lab-seg .m-battery-cell").length).toBe(4)
  expect(s.get(".lab-seg .m-battery")!.getAttribute("class")).toContain("is-vertical")
  expect(s.get(".lab-seg .m-battery-bolt")!.textContent).toBe("🔌")
  expect(s.get(".lab-seg .m-battery-readout.is-outside")).toBeTruthy()
})

// Proves customization: the own colour, and the bare battery without cap, frame or readout, with its own class.
test("kendi rengi, kapalı parçalar ve kendi sınıfı", () => {
  const s = renderTest(() => <BatteryGaugeLab />)
  expect(s.get(".lab-color .m-battery")!.getAttribute("style")).toContain("--m-brand-purple")
  expect(s.get(".lab-bare .m-battery-cap")).toBeFalsy()
  expect(s.get(".lab-bare .m-battery-readout")).toBeFalsy()
  expect(s.get(".lab-bare .m-battery")!.getAttribute("class")).toContain("lab-mine")
})
