// Tests for ColorPickerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ColorPickerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(textOrName) finds the element that carries a text or an accessible name; s.type(name, text) types into a
//   field like a user; s.click(textOrElement) clicks like a user; s.sees(text) says whether a text is visible. Tests
//   that type or click are async and await them, so the view has updated before the next line runs.
// - The tests check what a user can observe (the printed value and change counter, your own label texts, the
//   readonly state class) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { ColorPickerLab } from "./ColorPickerLab.tsx"

// Typing a colour into the value field updates the value (written in the chosen format, here hsl) and calls onChange,
// which the Lab counts.
test("değer alanına yazılan renk değeri ve sayacı günceller", async () => {
  const s = renderTest(() => <ColorPickerLab />)
  await s.type("Vurgu rengi", "#ff0000")
  // format="hsl": the value is written back as hsl(...)
  expect(s.sees("hsl(0")).toBe(true)
  expect(s.sees("değişiklik: 1")).toBe(true)
})

// A swatch of your own palette is a button named by its colour; pressing it picks that colour and calls onChange.
test("kendi paletindeki bir renge basınca seçilir", async () => {
  const s = renderTest(() => <ColorPickerLab />)
  await s.click("#6a3093")
  expect(s.sees("değişiklik: 1")).toBe(true)
  expect(s.sees("Gün batımı")).toBe(true)
})

// `labels` replaces the built-in texts: the hue slider and the contrast row use your wording, and aria-label names
// the whole picker.
test("kendi metinleri: ton kaydırıcısı ve kontrast satırı", () => {
  const s = renderTest(() => <ColorPickerLab />)
  expect(s.find("Ton")).not.toBe(null)
  expect(s.sees("beyazda")).toBe(true)
  expect(s.get(".lab-cp")?.getAttribute("aria-label")).toBe("Vurgu rengi")
})

// While `readonly` is on, the picker is marked is-readonly and choosing a palette colour does not change the value.
test("salt okunurken palet seçimi değeri değiştirmez", async () => {
  const s = renderTest(() => <ColorPickerLab />)
  await s.click(s.find("Kilitle (salt okunur)")!.closest("label")!.querySelector("[role=switch]")!)
  expect(s.get(".lab-cp")?.className).toContain("is-readonly")
  await s.click("#6a3093")
  expect(s.sees("değişiklik: 0")).toBe(true)
})
