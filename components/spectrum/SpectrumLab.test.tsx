import { test, expect, renderTest } from "march/testing"
import { SpectrumLab } from "./SpectrumLab.tsx"

// Tests for SpectrumLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: the spectrum's accessible role and name, idleText={false}, the variants and color options as they
// land on the root element, and the difference between a number source (runs at once) and the click-started demo.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <SpectrumLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.find(text) returns the element that shows a text; s.sees(text) is true when that text is on screen.
// - s.wait(ms or predicate) waits for time to pass or for a condition (useful for animations and timers).
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// These tests read attributes and classes only: the bars are canvas pixels, which a test does not compare.

// Proves the empty spectrum is an image named by its label, and idleText={false} leaves no idle text.
test("spektrum bir resim; kaynak yokken 'sinyal yok' der", () => {
  const s = renderTest(() => <SpectrumLab />)
  const empty = s.get(".lab-empty")!
  expect(empty.getAttribute("role")).toBe("img")
  expect(empty.getAttribute("aria-label")).toContain("Boş")
  expect(empty.querySelector(".m-spec-idle")).toBeFalsy()
})

// Proves the looks and colors: the mirror variant's class, colors="brand" written as data-m-colors="brand", a color
// list written as "custom", and the circle's own idleText while the demo is not playing.
test("görünümler ve renkler: ayna HADİ renkleri, halka kendi listesi", () => {
  const s = renderTest(() => <SpectrumLab />)
  expect(s.get(".lab-mirror")!.classList.contains("m-spec-mirror")).toBeTruthy()
  expect(s.get(".lab-mirror")!.getAttribute("data-m-colors")).toBe("brand")
  expect(s.get(".lab-circle")!.getAttribute("data-m-colors")).toBe("custom")
  expect(s.get(".lab-circle .m-spec-idle")!.textContent).toBe("Demo bekleniyor")
})

// Proves the number source is live at once (no is-idle) with its color token, while the demo-fed bars stay idle
// until someone clicks play.
test("sayı kaynağı hemen çalışır; demo başlamadan boşta", () => {
  const s = renderTest(() => <SpectrumLab />)
  expect(s.get(".lab-tone")!.classList.contains("is-idle")).toBeFalsy()
  expect(s.get(".lab-tone")!.getAttribute("data-m-color")).toBe("success")
  expect(s.get(".lab-bars")!.classList.contains("is-idle")).toBeTruthy()
})
