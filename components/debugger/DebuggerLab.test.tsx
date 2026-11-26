// Tests for DebuggerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DebuggerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) / s.text() read the visible text; s.click(target) and
//   s.type(target, text) act like a user (a target is a visible text, a label or an element) and wait for the view to
//   update, so tests that interact are async.
// - s.wait(fn) waits until fn() is truthy; s.find(text) returns the element that shows a text.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DebuggerLab } from "./DebuggerLab.tsx"

// Before anything runs the panel says it is idle, and `class` / `labels.title` give the root its class and accessible name.
test("başta beklemede; kendi metinleri ve başlığı görünür", () => {
  const s = renderTest(() => <DebuggerLab />)
  expect(s.sees("Beklemede")).toBe(true)
  expect(s.get(".lab-dbg")?.getAttribute("aria-label")).toBe("Toplam avı")
})

// Start runs the instrumented program; it hits the breakpoint on line 3 and the panel says it stopped there.
// onStart was called once (the Lab counts it), and Resume becomes enabled because the session is paused.
test("Koş: kesme noktasında durur, onStart sayılır", async () => {
  const s = renderTest(() => <DebuggerLab />)
  await s.click("Koş (F5)")
  await s.wait(() => s.sees("Durakta durdu"))
  expect(s.sees("Koşu: 1")).toBe(true)
  expect(s.find("Sürdür (F8)")?.hasAttribute("disabled")).toBe(false)
})

// Stop calls onStop (counted) and ends the session, so the panel goes back to idle.
test("Bitir onStop'u çağırır ve oturum biter", async () => {
  const s = renderTest(() => <DebuggerLab />)
  await s.click("Koş (F5)")
  await s.wait(() => s.sees("Durakta durdu"))
  await s.click("Bitir (Shift+F5)")
  expect(s.sees("Bitirme: 1")).toBe(true)
  expect(s.sees("Beklemede")).toBe(true)
})

// Pressing a breakpoint's line in the list calls onReveal with the file and the line (the host would open the editor
// there); the Lab writes them into a visible line.
test("kesme noktasının satırına basınca onReveal dosyayı ve satırı verir", async () => {
  const s = renderTest(() => <DebuggerLab />)
  // Click the button that shows the place (file:line), not the checkbox of the same breakpoint next to it.
  await s.click(s.get(".lab-dbg button.m-dbg-at")!)
  expect(s.sees("Git: toplam.js:3")).toBe(true)
})
