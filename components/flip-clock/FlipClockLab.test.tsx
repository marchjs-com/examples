import { test, expect, renderTest } from "march/testing"
import { FlipClockLab } from "./FlipClockLab.tsx"

// Tests for FlipClockLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: the clock is an image whose name is the time, a new time reaches the cards, the 12-hour flap and
// the options of the city and the still clocks.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <FlipClockLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - expect(x).toBe(y), toContain, toBeTruthy, not.toContain…: the assertions, as in Jest or Vitest.
// The spoken time depends on the page's language, so the tests look for the digits, not for a whole sentence.

// Proves the accessible image: role="img" named "Saat: …" with the minute 41, the cards hidden from screen readers,
// and a 12-hour clock with its AM / PM flap.
test("saat bir görsel; adı okunan saattir; 12 saatte ÖÖ/ÖS kanadı var", () => {
  const s = renderTest(() => <FlipClockLab />)
  const own = s.get(".lab-own")!
  expect(own.getAttribute("role")).toBe("img")
  expect(own.getAttribute("aria-label")).toContain("41")
  expect(s.get(".lab-own .m-flipclock-cards")!.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-own .m-flipclock-period")).toBeTruthy()
})

// Proves that a new time reaches the clock: "+1 dakika" moves 9:41 to 9:42 (the name follows at once; the cards flip).
test("+1 dakika saati ilerletir", async () => {
  const s = renderTest(() => <FlipClockLab />)
  await s.click(".lab-plus")
  expect(s.get(".lab-own")!.getAttribute("aria-label")).toContain("42")
  expect(s.get(".lab-still")!.getAttribute("aria-label")).toContain("42")
})

// Proves the options: the Tokyo clock has two groups (no seconds), a "." separator and no housing; the still clock
// does not blink.
test("Tokyo saati: saniye yok, nokta ayraç, gövde yok; hareketsiz saat yanıp sönmez", () => {
  const s = renderTest(() => <FlipClockLab />)
  expect(s.all(".lab-tokyo .m-odo").length).toBe(2)
  expect(s.get(".lab-tokyo .m-flipclock-sep")!.textContent).toBe(".")
  expect(s.get(".lab-tokyo")!.getAttribute("class")).toContain("m-flipclock-bare")
  expect(s.get(".lab-still")!.getAttribute("class")).not.toContain("is-blink")
})
