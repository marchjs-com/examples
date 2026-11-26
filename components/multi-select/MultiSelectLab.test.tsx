// Tests for MultiSelectLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <MultiSelectLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(name, text) types into the field with that accessible name; s.click(textOrElement) clicks like a user.
//   Both wait until the view has updated, which is why the tests that use them are async and await them.
// - s.text() is all visible text, s.find(name) looks up an element by its accessible name (null when missing),
//   s.get(selector) uses a CSS selector.
// - The tests check what a user or a screen reader can observe (visible text, accessible names, aria attributes,
//   readOnly / disabled) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { MultiSelectLab } from "./MultiSelectLab.tsx"

// Typing "alm" filters the list down to one option; clicking it adds it to the array. The summary line proves three
// things at once: the value changed (tr, en, de), onSelect got the option ("son: Almanca") and onChange fired once.
test("yazıp seçince değer diziye eklenir; onSelect ve onChange çağrılır", async () => {
  const s = renderTest(() => <MultiSelectLab />)
  await s.type("Diller", "alm")
  await s.click("Almanca")
  expect(s.text().includes("Diller: tr, en, de · son: Almanca · değişiklik: 1")).toBe(true)
})

// The remove button of a chip is found by the name that labels.remove builds, which also proves the button has an
// accessible name. After clicking it the value loses "tr" and onChange fired once; the "son" part stays empty
// because removing is not selecting (onSelect did not run).
test("chip'in kaldır düğmesi labels.remove adıyla bulunur ve değeri çıkarır", async () => {
  const s = renderTest(() => <MultiSelectLab />)
  await s.click("Türkçe dilini kaldır")
  expect(s.text().includes("Diller: en · son: — · değişiklik: 1")).toBe(true)
  expect(s.find("Türkçe dilini kaldır")).toBe(null)
})

// Three "cannot remove" cases in one test: removeIcon={false} draws no button; a normal chip still has one (the
// control case, so the test cannot pass just because every button is missing); a readonly chip has no remove
// button and its input is readOnly; the disabled field's input is disabled.
test("removeIcon={false} ve readonly chip'te kaldır düğmesi yok; salt okunur alan yazılamaz", () => {
  const s = renderTest(() => <MultiSelectLab />)
  expect(s.find("Çilek at")).toBe(null)
  expect(s.find("Kiraz sil") !== null).toBe(true)
  expect(s.find("İngilizce kilitli")).toBe(null)
  expect((s.find("Kilitli") as HTMLInputElement).readOnly).toBe(true)
  expect((s.find("Kapalı") as HTMLInputElement).disabled).toBe(true)
})

// labelOf: the preselected id 104 shows as its label without any search having run. The rest checks the
// accessibility wiring of `invalid`: aria-invalid, aria-describedby pointing at the error text's id, and that id,
// name and class reached the right elements.
test("labelOf aramadan gelmemiş değeri adlandırır; geçersiz alan aria ile söylenir", () => {
  const s = renderTest(() => <MultiSelectLab />)
  expect(s.text().includes("Üye #104")).toBe(true)
  const bad = s.get("#langs-bad") as HTMLInputElement
  expect(bad.getAttribute("aria-invalid")).toBe("true")
  expect(bad.getAttribute("aria-describedby")).toBe("langs-error")
  expect(bad.name).toBe("langs")
  expect(bad.closest(".lab-multi") !== null).toBe(true)
})
