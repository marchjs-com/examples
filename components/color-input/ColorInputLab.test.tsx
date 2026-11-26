// Tests for ColorInputLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ColorInputLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(labelOrName) finds the real input by its label or accessible name; s.type(labelOrName, text) types into it
//   like a user and returns the element; s.get(selector) finds one element; s.text() is all visible text. The tests
//   that type are async and await it.
// - The tests check what a user or a screen reader can observe (values, aria-invalid, required, disabled, readOnly, the
//   printed summary) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { ColorInputLab } from "./ColorInputLab.tsx"

// Typing a valid hex into the text field updates the shared value, so the text summary and the other two inputs
// bound to the same value (swatch only, text only) show the new colour. onChange also ran, so the change counter
// is no longer zero.
test("metin alanına yazılan renk değeri ve bağlı renk kutularını değiştirir", async () => {
  const s = renderTest(() => <ColorInputLab />)
  await s.type("Ana renk", "#1d9ad6")
  expect(s.text().includes("Seçili: #1d9ad6")).toBe(true)
  expect(s.text().includes("Değişiklik: 0")).toBe(false)
  expect((s.find("Yalnız kutu") as HTMLInputElement).value).toBe("#1d9ad6")
  expect((s.find("Yalnız metin") as HTMLInputElement).value).toBe("#1d9ad6")
})

// The Lab sets invalid from the value: an incomplete code is invalid (aria-invalid="true") and the field is required;
// finishing the code clears aria-invalid.
test("yarım bir renk kodu geçersiz sayılır, tamamlanınca düzelir", async () => {
  const s = renderTest(() => <ColorInputLab />)
  const field = await s.type("Ana renk", "#1d9")
  expect(field.getAttribute("aria-invalid")).toBe("true")
  await s.type("Ana renk", "#1d9ad6")
  expect(field.hasAttribute("aria-invalid")).toBe(false)
  expect(field.hasAttribute("required")).toBe(true)
})

// swatch={false} draws only the text field (no colour input); id, name and describedby are on the text input, and the
// class is on the control root.
test("swatch={false}: yalnız metin alanı; id, name, class ve describedby yerinde", () => {
  const s = renderTest(() => <ColorInputLab />)
  const code = s.get("#lab-code")
  expect(code?.getAttribute("name")).toBe("accentCode")
  expect(code?.getAttribute("aria-describedby")).toBe("lab-hint")
  expect(s.get(".lab-code")).not.toBe(null)
  expect(s.get(".lab-code input[type=color]")).toBe(null)
})

// readonly and disabled controls cannot be changed: the swatch input is disabled and the text field is readOnly or
// disabled.
test("salt okunur ve devre dışı renkler değiştirilemez", () => {
  const s = renderTest(() => <ColorInputLab />)
  expect((s.find("Salt okunur renk") as HTMLInputElement).disabled).toBe(true)
  expect((s.find("Salt okunur kod") as HTMLInputElement).readOnly).toBe(true)
  expect((s.find("Kapalı renk") as HTMLInputElement).disabled).toBe(true)
  expect((s.find("Kapalı kod") as HTMLInputElement).disabled).toBe(true)
})
