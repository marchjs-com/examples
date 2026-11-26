// Tests for CheckboxLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CheckboxLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) returns the element that carries a text (or an aria-label); s.click(textOrElement) clicks like a
//   user and waits until the view has updated (so those tests are async and await it); s.text() is all visible text.
// - The tests check what a user or a screen reader can observe (the printed summary, the disabled / required /
//   indeterminate state of the real input, aria attributes) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { CheckboxLab } from "./CheckboxLab.tsx"

// Helper: from a label's text element to the real <input> of that checkbox (the drawn box is only decoration).
const boxOf = (el: Element | null) => el?.closest("label")?.querySelector("input") as HTMLInputElement

// bind:value and onChange on one checkbox: pressing the label flips the value and calls onChange with the new state;
// the Lab prints both, so the test reads the text. A second press goes back.
test("Koşullara basınca değer ve onChange birlikte değişir", async () => {
  const s = renderTest(() => <CheckboxLab />)
  expect(s.text().includes("Onay: hayır")).toBe(true)
  await s.click("Koşulları kabul ediyorum")
  expect(s.text().includes("Onay: evet · son: işaretlendi")).toBe(true)
  await s.click("Koşulları kabul ediyorum")
  expect(s.text().includes("Onay: hayır · son: kaldırıldı")).toBe(true)
})

// States are announced by the real input: disabled and readonly boxes are disabled, required is the native required
// attribute, and invalid sets aria-invalid with aria-describedby pointing at the error text.
test("devre dışı ve salt okunur kutular tıklanamaz; zorunlu ve geçersiz aria ile söylenir", () => {
  const s = renderTest(() => <CheckboxLab />)
  expect(boxOf(s.find("Devre dışı")).disabled).toBe(true)
  expect(boxOf(s.find("Salt okunur")).disabled).toBe(true)
  expect(boxOf(s.find("Koşulları kabul ediyorum")).required).toBe(true)
  const kvkk = boxOf(s.find("KVKK metnini okudum"))
  expect(kvkk.getAttribute("aria-invalid")).toBe("true")
  expect(kvkk.getAttribute("aria-describedby")).toBe("kvkk-error")
})

// `indeterminate` is the native property of the input (the dash state), and a checkbox without a value is unchecked.
test("kısmi durum kutuya indeterminate olarak geçer", () => {
  const s = renderTest(() => <CheckboxLab />)
  expect(boxOf(s.find("Bazı dosyalar seçili")).indeterminate).toBe(true)
  expect(boxOf(s.find("Animasyonsuz")).checked).toBe(false)
})

// A checkbox without a visible label is found by its aria-label; id, name and class land on the element that is
// expected, and onClick runs on a real click (the Lab counts the clicks).
test("etiketsiz kutu aria-label ile bulunur; id, name, class ve onClick ona gider", async () => {
  const s = renderTest(() => <CheckboxLab />)
  const row = s.find("Satırı seç") as HTMLInputElement
  expect(row.tagName).toBe("INPUT")
  expect(row.id).toBe("row-1")
  expect(row.name).toBe("rows")
  expect(row.closest(".lab-row") !== null).toBe(true)
  await s.click(row)
  expect(row.checked).toBe(true)
  expect(s.text().includes("Tıklama: 1")).toBe(true)
})
