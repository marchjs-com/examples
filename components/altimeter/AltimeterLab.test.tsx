// AltimeterLab.test.tsx: tests for the full-featured Altimeter example.
// They run in the MarchIDE "Tests" tab each time you save. What they cover: the altimeter's spoken altitude and
// pressure, the three hands' ratios, the pressure window (hPa and inHg) and the parts you can switch off.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <AltimeterLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.wait(ms) lets time pass (the spoken text follows at most 4 times a second).
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// The tests check what users and screen readers observe, not the component's private state.
import { test, expect, renderTest } from "march/testing"
import { AltimeterLab } from "./AltimeterLab.tsx"

// Reads a hand's rotation in degrees from its SVG transform, within one turn.
const angle = (el: Element | null) => Number(/rotate\(([-\d.]+)/.exec(el!.getAttribute("transform")!)![1])

// Proves accessibility: the altimeter is an image named with the altitude and the pressure.
test("altimetre bir görsel: irtifa ve basınç okunur", () => {
  const s = renderTest(() => <AltimeterLab />)
  const root = s.get(".lab-std .m-alt")!
  expect(root.getAttribute("role")).toBe("img")
  expect(root.getAttribute("aria-label")).toContain("Laboratuvar")
  expect(root.getAttribute("aria-label")).toContain("ft")
  expect(root.getAttribute("aria-label")).toContain("1013 hPa")
})

// Proves the hand ratios: at 12,500 ft the hundreds hand is half a turn round (±180°) and the thousands hand a quarter
// (90°); +1000 ft leaves the hundreds hand where it was and moves the thousands hand by 36° (motion={false}).
test("ibreler: yüzler yarım tur, binler çeyrek; +1000 ft binleri 36° döndürür", async () => {
  const s = renderTest(() => <AltimeterLab />)
  expect(Math.abs(angle(s.get(".lab-std .m-alt-100")))).toBe(180)
  expect(angle(s.get(".lab-std .m-alt-1k"))).toBe(90)
  await s.click(".lab-climb")
  expect(Math.abs(angle(s.get(".lab-std .m-alt-100")))).toBe(180)
  expect(angle(s.get(".lab-std .m-alt-1k"))).toBe(126)
})

// Proves the pressure window: inHg on the metric one (the number's decimal mark follows the page's language), and
// the standard one's hPa setting follows the button in the spoken name.
test("basınç penceresi: hPa ve inHg", async () => {
  const s = renderTest(() => <AltimeterLab />)
  expect(s.get(".lab-metric .m-alt-window")!.textContent).toContain("inHg")
  await s.click(".lab-qnh")
  await s.wait(300)
  expect(s.get(".lab-std .m-alt")!.getAttribute("aria-label")).toContain("1015 hPa")
})

// Proves customization: the bare altimeter has no window, no ten-thousands pointer and no face, and carries its class.
test("kapalı parçalar ve kendi sınıfı", () => {
  const s = renderTest(() => <AltimeterLab />)
  expect(s.get(".lab-bare .m-alt-window")).toBeFalsy()
  expect(s.get(".lab-bare .m-alt-10k")).toBeFalsy()
  expect(s.get(".lab-bare .m-gauge")!.getAttribute("class")).toContain("m-gauge-bare")
  expect(s.get(".lab-bare .m-alt")!.getAttribute("class")).toContain("lab-mine")
})
