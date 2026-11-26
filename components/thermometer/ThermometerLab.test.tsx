// ThermometerLab.test.tsx: tests for the full-featured Thermometer example.
// They run in the MarchIDE "Tests" tab each time you save. What they cover: the thermometer as an accessible meter,
// the column following the value, °F with a secondary scale, the zone colour of the liquid and the parts you can
// switch off.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <ThermometerLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.wait(ms) lets time pass (the spoken value follows at most 4 times a second).
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy, toBeGreaterThan…: the assertions, as in Jest or Vitest.
// The tests check what users and screen readers observe, not the component's private state.
import { test, expect, renderTest } from "march/testing"
import { ThermometerLab } from "./ThermometerLab.tsx"

// Proves accessibility: a meter named "Oda" with its scale in °C and the value spoken with its unit.
test("termometre bir ölçer: ölçek ve değer birimle okunur", () => {
  const s = renderTest(() => <ThermometerLab />)
  const m = s.get(".lab-c .m-thermo")!
  expect(m.getAttribute("role")).toBe("meter")
  expect(m.getAttribute("aria-label")).toBe("Oda")
  expect(m.getAttribute("aria-valuemin")).toBe("-10")
  expect(m.getAttribute("aria-valuetext")).toContain("°C")
})

// Proves the column follows the value: +8 °C raises it (a smaller y is higher in the SVG), and past 30 °C the liquid
// takes the danger zone's colour (motion={false} on that one, so no waiting).
test("sütun değeri izler; sıcak bölgede sıvı kırmızı", async () => {
  const s = renderTest(() => <ThermometerLab />)
  const before = Number(s.get(".lab-c .m-thermo-column")!.getAttribute("y"))
  await s.click(".lab-up")
  expect(before).toBeGreaterThan(Number(s.get(".lab-c .m-thermo-column")!.getAttribute("y")))
  expect(s.get(".lab-c .m-thermo-liquid")!.getAttribute("style")).toContain("--m-danger")
})

// Proves the units: the °F thermometer speaks °F and draws the °C scale on its other side.
test("°F ölçeği ve ikinci °C ölçeği", async () => {
  const s = renderTest(() => <ThermometerLab />)
  await s.wait(300)
  expect(s.get(".lab-f .m-thermo")!.getAttribute("aria-valuetext")).toContain("°F")
  expect(s.get(".lab-f .m-thermo-scale.is-secondary")).toBeTruthy()
})

// Proves customization: the own liquid colour, and the bare one without readout or labels, with its own class.
test("kendi rengi, kapalı parçalar ve kendi sınıfı", () => {
  const s = renderTest(() => <ThermometerLab />)
  expect(s.get(".lab-color .m-thermo-liquid")!.getAttribute("style")).toContain("--m-brand-blue")
  expect(s.get(".lab-bare .m-thermo-readout")).toBeFalsy()
  expect(s.get(".lab-bare .m-thermo-label")).toBeFalsy()
  expect(s.get(".lab-bare .m-thermo")!.getAttribute("class")).toContain("lab-mine")
})
