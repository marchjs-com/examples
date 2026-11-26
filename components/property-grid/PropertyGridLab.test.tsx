// Tests for PropertyGridLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PropertyGridLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - s.type(label, text) types into the field found by its label and fires the events a user would; s.wait(predicate)
//   waits until something shows up (validation and saving finish a little later than the click).
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { PropertyGridLab } from "./PropertyGridLab.tsx"

// `groups={["Plan", "Kimlik"]}` puts the Plan group first; a row with hidden() returning true is not on the page;
// the footer says there are no changes yet.
test("grup sırası Plan önce; gizli satır kapalıyken görünmez", () => {
  const s = renderTest(() => <PropertyGridLab />)
  const text = s.get(".lab-pg")?.textContent ?? ""
  expect(text.indexOf("Plan")).toBeGreaterThan(-1)
  expect(text.indexOf("Plan") < text.indexOf("Kimlik")).toBe(true)
  expect(s.sees("Paylaşım bağlantısı")).toBe(false)
  expect(s.sees("Değişiklik yok")).toBe(true)
})

// A row with `control` uses our own component: pressing its button sets the value through setValue, onChange counts
// the edit and the footer counts one unsaved change.
test("kendi denetimi: simgeye basınca değer değişir, alt çubuk sayar", async () => {
  const s = renderTest(() => <PropertyGridLab />)
  await s.click("🌙")
  expect(s.sees("düzenleme: 1")).toBe(true)
  expect(s.sees("1 kaydedilmemiş")).toBe(true)
})

// Editing a field and pressing Save calls onSave; the Lab stores the values as `saved`, so the footer goes back to
// "no changes".
test("Kaydet onSave'i çalıştırır, kayıtlı değerler güncellenir", async () => {
  const s = renderTest(() => <PropertyGridLab />)
  await s.type("Ad", "Venüs")
  await s.click("Kaydet")
  await s.wait(() => s.sees("kayıtlı ad: Venüs"))
  expect(s.sees("kayıtlı ad: Venüs")).toBe(true)
  expect(s.sees("Değişiklik yok")).toBe(true)
})

// validate() returns an error text for a value over the limit; the grid shows it next to the field.
test("doğrulama: bütçe sınırı aşılınca hata yazar", async () => {
  const s = renderTest(() => <PropertyGridLab />)
  await s.type("Bütçe", "20000")
  await s.wait(() => s.sees("En çok 10 000 ₺"))
  expect(s.sees("En çok 10 000 ₺")).toBe(true)
})

// With our own `history` object the Undo button in the header calls it: undoing the only change leaves no changes.
test("history: kendi yığını; başlıktaki Geri al son değişikliği geri alır", async () => {
  const s = renderTest(() => <PropertyGridLab />)
  await s.click("🌙")
  expect(s.sees("1 kaydedilmemiş")).toBe(true)
  await s.click(".m-pg-history button")
  await s.wait(() => s.sees("Değişiklik yok"))
  expect(s.sees("Değişiklik yok")).toBe(true)
})
