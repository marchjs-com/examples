import { test, expect, renderTest } from "march/testing"
import { OscilloscopeLab } from "./OscilloscopeLab.tsx"

// Tests for OscilloscopeLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: the scope's accessible role and name, the parts you can switch off, the idle state before a
// click-started source plays, and a number source that runs at once with its color and grid settings.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <OscilloscopeLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.find(text) returns the element that shows a text; s.sees(text) is true when that text is on screen.
// - s.wait(ms or predicate) waits for time to pass or for a condition (useful for animations and timers).
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// These tests read attributes and classes only: the trace itself is canvas pixels, which a test does not compare.

// Proves the empty scope is an image named by its label, and that grid={false} and idleText={false} really remove
// the graticule and the idle text.
test("ekran bir resim; kaynak yokken 'sinyal yok' der", () => {
  const s = renderTest(() => <OscilloscopeLab />)
  const empty = s.get(".lab-empty")!
  expect(empty.getAttribute("role")).toBe("img")
  expect(empty.getAttribute("aria-label")).toContain("Boş ekran")
  expect(empty.querySelector(".m-osc-grid")).toBeFalsy()
  expect(empty.querySelector(".m-osc-idle")).toBeFalsy()
})

// Proves the idle state: before the demo is started the scopes carry is-idle, the CRT look adds its class, and the
// custom idleText is shown.
test("demo başlamadan iki ekran boşta; kendi bekleme metni görünür", () => {
  const s = renderTest(() => <OscilloscopeLab />)
  expect(s.get(".lab-wave")!.classList.contains("is-idle")).toBeTruthy()
  expect(s.get(".lab-crt")!.classList.contains("m-osc-crt")).toBeTruthy()
  expect(s.get(".lab-crt .m-osc-idle")!.textContent).toBe("Demo bekleniyor")
})

// Proves a number source starts by itself (no is-idle), the color prop lands as data-m-color, and the grid's
// x divisions are written as the --m-osc-gx CSS variable.
test("sayı kaynağı hemen çalışır: renk ve ızgara bölmeleri", () => {
  const s = renderTest(() => <OscilloscopeLab />)
  const cpu = s.get(".lab-cpu")!
  expect(cpu.classList.contains("is-idle")).toBeFalsy()
  expect(cpu.getAttribute("data-m-color")).toBe("brand-blue")
  expect((cpu as HTMLElement).style.getPropertyValue("--m-osc-gx")).toBe("6")
})
