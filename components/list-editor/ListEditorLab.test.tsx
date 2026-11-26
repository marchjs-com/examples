// Tests for ListEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ListEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type("label", value) finds an input by its accessible name (aria-label, placeholder or label text) and types into
//   it; s.click("text") clicks a button by its text or accessible name. Both wait until the view has updated, which is
//   why every test that acts is async and awaits them.
// - s.find("text") finds an element by visible text or aria-label; s.get("selector") by CSS selector; s.text() is all
//   the visible text.
// - The tests check what a user or a screen reader can observe (the text the Lab prints, aria-invalid, disabled,
//   readonly) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the label or the expected text.
import { test, expect, renderTest } from "march/testing"
import { ListEditorLab } from "./ListEditorLab.tsx"

// Typing in the add field (found by its placeholder) and pressing the add button appends the item. The Lab prints the
// list and the onChange counter, and the new row is named by `labels.item` (the fourth-drink name).
test("yazıp Ekle'ye basınca öğe listenin sonuna eklenir ve onChange sayar", async () => {
  const s = renderTest(() => <ListEditorLab />)
  await s.type("İçecek ekle", "ayran")
  await s.click("Ekle")
  expect(s.text().includes("Liste: kahve · çay · su · ayran")).toBe(true)
  expect(s.text().includes("Değişiklik: 1")).toBe(true)
  expect(s.find("4. içecek")?.tagName).toBe("INPUT")
})

// By default a duplicate is not added (the tea entry is already there). With unique={false} the same name can be added twice.
test("unique varsayılan: aynı öğe eklenmez; unique={false} ekler", async () => {
  const s = renderTest(() => <ListEditorLab />)
  await s.type("İçecek ekle", "çay")
  await s.click("Ekle")
  expect(s.text().includes("Liste: kahve · çay · su")).toBe(true)
  await s.type("Sıraya ad yaz", "Ali")
  await s.click("Yine de ekle")
  expect(s.text().includes("Sıra: Ali · Ali")).toBe(true)
})

// The remove buttons carry the name from `labels.remove`. Removing all three drinks empties the list: the Lab then
// marks the editor invalid and links it to the error text (aria-invalid and aria-describedby on the add field).
test("kaldırma düğmesi kendi adıyla siler; liste boşalınca alan geçersiz olur", async () => {
  const s = renderTest(() => <ListEditorLab />)
  for (let i = 0; i < 3; i++) await s.click("Listeden çıkar")
  expect(s.text().includes("En az bir içecek gerekli")).toBe(true)
  expect(s.get("#lab-drink-input")?.getAttribute("aria-invalid")).toBe("true")
  expect(s.get("#lab-drink-input")?.getAttribute("aria-describedby")).toBe("lab-drinks-error")
})

// No clicks needed: with max={3} and three items the add button (labelled "Dolu") is disabled; the readonly list's field
// is readonly; and the group is a role="group" named by the visible heading through labelledby.
test("max dolunca Ekle kilitlenir; salt okunur listede düğme yoktur", () => {
  const s = renderTest(() => <ListEditorLab />)
  expect(s.find("Dolu")?.closest("button")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Salt okunur satır")?.hasAttribute("readonly")).toBe(true)
  expect(s.get(".lab-drinks")?.getAttribute("role")).toBe("group")
  expect(s.get(".lab-drinks")?.getAttribute("aria-labelledby")).toBe("lab-drinks")
})
