// AnalogClockLab.test.tsx: tests for the full-featured AnalogClock example.
// They run in the MarchIDE "Tests" tab each time you save. What they cover: the clock's accessible name with the
// time, the hands following your own time source, the numeral styles and the parts you can switch off.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <AnalogClockLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// The tests check what a user (or a screen reader) can observe: names, texts, classes, the hands' rotation; never
// the component's private state.
import { test, expect, renderTest } from "march/testing"
import { AnalogClockLab } from "./AnalogClockLab.tsx"

// Reads a hand's rotation in degrees from its SVG transform ("rotate(90 100 100)" → 90).
const angle = (el: Element | null) => Number(/rotate\(([-\d.]+)/.exec(el!.getAttribute("transform")!)![1])

// Proves the clock is an image named with the time (the label and the hour), so a screen reader hears it.
test("saat bir görsel: adı ve saati okunur", () => {
  const s = renderTest(() => <AnalogClockLab />)
  const clock = s.get(".lab-own .m-clock")!
  expect(clock.getAttribute("role")).toBe("img")
  expect(clock.getAttribute("aria-label")).toContain("Laboratuvar")
  expect(clock.getAttribute("aria-label")).toContain("10:08")
})

// Proves the own time source drives the hands: +1 hour turns the hour hand by 30° (one twelfth of the dial), and the
// minute hand stays where it was. motion={false} on that clock makes the jump immediate, so no waiting is needed.
test("kendi zaman kaynağı: +1 saat akrebi 30° döndürür", async () => {
  const s = renderTest(() => <AnalogClockLab />)
  const before = angle(s.get(".lab-own .m-clock-hour"))
  const minute = angle(s.get(".lab-own .m-clock-minute"))
  await s.click(".lab-plus")
  expect(Math.round(angle(s.get(".lab-own .m-clock-hour")) - before)).toBe(30)
  expect(angle(s.get(".lab-own .m-clock-minute"))).toBe(minute)
})

// Proves the numeral styles: roman numerals start with XII, and the function form leaves odd hours empty.
test("roma rakamları ve kendi rakam işlevi", () => {
  const s = renderTest(() => <AnalogClockLab />)
  expect(s.get(".lab-roman .m-gauge-label")!.textContent).toBe("XII")
  expect(s.all(".lab-fn .m-gauge-label").map((x) => x.textContent)).toContain("10")
  expect(s.get(".lab-roman .m-clock-second")).toBeFalsy()
})

// Proves customization: the bare clock has no face (m-gauge-bare), no numbers and no glass, and carries its class.
test("kapalı parçalar ve kendi sınıfı", () => {
  const s = renderTest(() => <AnalogClockLab />)
  expect(s.get(".lab-bare .m-gauge")!.getAttribute("class")).toContain("m-gauge-bare")
  expect(s.get(".lab-bare .m-gauge-label")).toBeFalsy()
  expect(s.get(".lab-bare .m-gauge-glass")).toBeFalsy()
  expect(s.get(".lab-bare .m-clock")!.getAttribute("class")).toContain("lab-mine")
})
