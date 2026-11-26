import { test, expect, renderTest } from "march/testing"
import { AudioReactiveLab } from "./AudioReactiveLab.tsx"

// Tests for AudioReactiveLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: where the effect class, the color and the accessible name land (on the wrapper, around the
// children), how `vars` renames or leaves out the CSS variables, and how `as` and a list of effects shape the element.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <AudioReactiveLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.find(text) returns the element that shows a text; s.sees(text) is true when that text is on screen.
// - s.wait(ms or predicate) waits for time to pass or for a condition (useful for animations and timers).
// - expect(x).toBe(y), toContain, toBeTruthy…: the assertions, as in Jest or Vitest.
// The tests read the first state only (variables written as 0 before the first reading), so they do not depend on
// the motion clock's timing.

// Proves the wrapper carries the ring effect class, the color token (data-m-color) and the passed-through
// aria-label, while the Avatar stays inside it as a child.
test("halka efekti, renk ve erişilebilir ad sarmalayıcının üstünde; içerik içinde", () => {
  const s = renderTest(() => <AudioReactiveLab />)
  const ring = s.get(".lab-ring")!
  expect(ring.getAttribute("class")).toContain("m-ar-ring")
  expect(ring.getAttribute("data-m-color")).toBe("brand-pink")
  expect(ring.getAttribute("aria-label")).toBe("Konuşan: Ada")
  expect(ring.querySelector(".m-avatar")).toBeTruthy()
})

// Proves `vars`: the chosen variables are written as 0.000 before the first reading (so CSS never reads an unset
// variable); a renamed level appears as --ses and not as --m-level; peak: false leaves --m-peak out; and a list
// writes only what it names (--m-bass, not --m-treble).
test("değişkenler ilk okumadan önce 0 ile yazılır; vars adları değiştirir ya da dışarıda bırakır", () => {
  const s = renderTest(() => <AudioReactiveLab />)
  const vars = s.get(".lab-vars") as HTMLElement
  expect(vars.style.getPropertyValue("--ses")).toBe("0.000")
  expect(vars.style.getPropertyValue("--m-level")).toBe("")
  expect(vars.style.getPropertyValue("--m-peak")).toBe("")
  const list = s.get(".lab-list") as HTMLElement
  expect(list.style.getPropertyValue("--m-bass")).toBe("0.000")
  expect(list.style.getPropertyValue("--m-treble")).toBe("")
})

// Proves `as` picks the tag (a SPAN, while the default is a DIV), and a list of effects becomes one class per effect.
test("as etiketi seçer; birden çok efekt sınıf olur", () => {
  const s = renderTest(() => <AudioReactiveLab />)
  const span = s.get(".lab-span")!
  expect(span.tagName).toBe("SPAN")
  expect(span.getAttribute("class")).toContain("m-ar-pulse")
  expect(span.getAttribute("class")).toContain("m-ar-glow")
  expect(s.get(".lab-ring")!.tagName).toBe("DIV")
})
