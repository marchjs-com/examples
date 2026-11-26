import { test, expect, renderTest } from "march/testing"
import { OdometerLab } from "./OdometerLab.tsx"

// Tests for OdometerLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: zero padding and the fraction drum, the accessible name, rolling only the drums that changed,
// changing the drum count live, the variants, your own spoken text, and the still (motion={false}) counter.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <OdometerLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.find(text) returns the element that shows a text; s.sees(text) is true when that text is on screen.
// - s.wait(ms or predicate) waits for time to pass or for a condition (useful for animations and timers).
// - expect(x).toBe(y), toContain, toBeGreaterThan, toBeFalsy…: the assertions, as in Jest or Vitest.

// Reads what the drums show right now as one string: every digit cell (.m-roll-d) and every other character such as
// the decimal mark (.m-roll-s).
// The decimal mark follows the page's language (a comma in Turkish), so it is normalized to "." before comparing.
const drums = (el: Element | null) => [...(el?.querySelectorAll(".m-roll-d, .m-roll-s") ?? [])].map((c) => c.textContent).join("").replace(",", ".") // the decimal mark follows the language

// Proves the mechanical counter's basics: digits={6} pads 1234.5 to 001234.5, decimals adds the fraction drum
// (the is-frac class), and the counter is one image whose accessible name includes the unit.
test("hane sayısı sıfırla doldurur, kesir çarkı ayrılır, ad birimle okunur", () => {
  const s = renderTest(() => <OdometerLab />)
  expect(drums(s.get(".lab-mech .m-roll-vis"))).toBe("001234.5")
  expect(s.get(".lab-mech .m-odo-roll")!.getAttribute("class")).toContain("is-frac")
  expect(s.get(".lab-mech .m-odo")!.getAttribute("role")).toBe("img")
  expect(s.get(".lab-mech .m-odo")!.getAttribute("aria-label")).toContain("km")
})

// Proves the rolling and the live drum count: after +11.1 the value reads 001245.6 and roll slots exist (the drums
// that changed are animating); toggling digits to 4 removes the padding (1245.6).
test("artınca yalnız değişen çarklar döner; hane sayısı canlı değişir", async () => {
  const s = renderTest(() => <OdometerLab />)
  await s.click(".lab-up")
  expect(drums(s.get(".lab-mech .m-roll-vis"))).toBe("001245.6")
  expect(s.all(".lab-mech .m-roll-slot").length).toBeGreaterThan(0)
  await s.click(".lab-digits")
  expect(drums(s.get(".lab-mech .m-roll-vis"))).toBe("1245.6")
})

// Proves the looks and the opt-outs: the digital variant's class, the flip counter's own spoken text in its name,
// the frameless counter's bare class with no unit, and that motion={false} never creates roll slots after a change.
test("görünüm, kendi okunuş metni, çerçevesiz ve hareketsiz sayaç", async () => {
  const s = renderTest(() => <OdometerLab />)
  expect(s.get(".lab-digital .m-odo")!.getAttribute("class")).toContain("m-odo-digital")
  expect(s.get(".lab-flip .m-odo")!.getAttribute("aria-label")).toBe("Adımlar: 1234 adım")
  expect(s.get(".lab-still .m-odo")!.getAttribute("class")).toContain("m-odo-bare")
  expect(s.get(".lab-still .m-odo-unit")).toBeFalsy()
  await s.click(".lab-up")
  expect(s.get(".lab-still .m-roll-slot")).toBeFalsy()
})
