// Tests for GradientEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <GradientEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(textOrElement) clicks like a user and waits until the view has updated (so those tests are async);
//   s.sees(text) says whether text is on screen; s.find(text) finds an element by its accessible name or text.
// - The tests check what a user can observe (visible text, which buttons exist) rather than internal state, so they keep
//   passing when the component's internals change.
import { test, expect, renderTest } from "march/testing"
import { GradientEditorLab } from "./GradientEditorLab.tsx"

// Pressing a preset: its button name comes from our labels.preset function, and the value becomes that preset's CSS (and onChange fired once).
test("hazır bir gradyana basınca değer o olur", async () => {
  const s = renderTest(() => <GradientEditorLab />)
  await s.click("Hazır: Deniz")
  expect(s.sees("linear-gradient(90deg, #4cc3e0 0%, #13233a 100%)")).toBe(true)
  expect(s.sees("değişiklik: 1")).toBe(true)
})

// A quick angle button sets the angle: the CSS string now starts with the chosen angle.
test("hızlı açı düğmesi açıyı değiştirir", async () => {
  const s = renderTest(() => <GradientEditorLab />)
  await s.click("90 derece")
  expect(s.sees("linear-gradient(90deg")).toBe(true)
})

// Only the types we gave are offered, with our own names: the conic type is there, the radial one is not.
test("yalnız verilen türler sunulur, kendi metinleriyle", () => {
  const s = renderTest(() => <GradientEditorLab />)
  expect(s.find("Pasta")).not.toBe(null)
  expect(s.find("Halka")).toBe(null)
})

// readonly: after the lock switch is turned on, pressing a preset changes nothing (the counter stays at zero).
test("kilitliyken hazırlar değeri değiştirmez", async () => {
  const s = renderTest(() => <GradientEditorLab />)
  await s.click(s.find("Kilitle")!.closest("label")!.querySelector("[role=switch]")!)
  await s.click("Hazır: Deniz")
  expect(s.sees("değişiklik: 0")).toBe(true)
})
