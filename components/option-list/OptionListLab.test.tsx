// Tests for OptionListLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <OptionListLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements by CSS selector, s.text() is all visible text, s.type(name, text)
//   types into a field, and s.click(element) clicks like a user and waits until the view has updated, which is why the
//   tests that click or type are async and await.
// - The rows are found by their ARIA role (radio, option, menuitem), not by class names: the role is part of the
//   accessible contract of the list, so the tests keep passing when the markup inside a row changes.
// - The tests check what a user or a screen reader can observe (aria-checked, aria-multiselectable, visible text)
//   rather than internal state.
// To adapt them: copy one test, change the name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { OptionListLab } from "./OptionListLab.tsx"

// The default mode is a radio group. Clicking a row checks it (aria-checked) and updates the bound value, which the Lab
// prints. A disabled row ignores the click: the value stays the same.
test("radyo: satıra basınca seçilir, aria-checked ve değer güncellenir; devre dışı satır seçilmez", async () => {
  const s = renderTest(() => <OptionListLab />)
  const list = s.get(".lab-theme")!
  expect(list.getAttribute("role")).toBe("radiogroup")
  const row = (name: string) => [...list.querySelectorAll('[role="radio"]')].find((r: Element) => (r.textContent ?? "").includes(name))!
  await s.click(row("Açık"))
  expect(row("Açık").getAttribute("aria-checked")).toBe("true")
  expect(s.text().includes("Tema: light")).toBe(true)
  await s.click(row("Yüksek"))
  expect(s.text().includes("Tema: light")).toBe(true)
})

// `multiple` turns the list into a listbox with aria-multiselectable; clicking adds a value and clicking a chosen row
// again removes it.
test("çoklu seçim: listbox aria-multiselectable, basınca eklenir ve çıkar", async () => {
  const s = renderTest(() => <OptionListLab />)
  const box = s.all('[role="listbox"]').find((l: Element) => l.getAttribute("aria-multiselectable") === "true")!
  const opt = (name: string) => [...box.querySelectorAll('[role="option"]')].find((o: Element) => (o.textContent ?? "").includes(name))!
  await s.click(opt("yayın"))
  expect(s.text().includes("Etiketler: ürün, yayın")).toBe(true)
  await s.click(opt("ürün"))
  expect(s.text().includes("Etiketler: yayın")).toBe(true)
})

// mode="menu": rows are menuitems and nothing stays chosen; choosing calls onPick with the row's value, which the Lab
// prints.
test("menü: menuitem'e basınca onPick çalışır", async () => {
  const s = renderTest(() => <OptionListLab />)
  const item = s.all('[role="menuitem"]').find((m: Element) => (m.textContent ?? "").includes("Sabitle"))!
  await s.click(item)
  expect(s.text().includes("Son işlem: pin")).toBe(true)
})

// keysFrom: the list is driven by a text field, so the test types into the field and the list (whose options are a
// function of the text) shrinks to the one match. With no match the `empty` text appears.
test("alanın tuşları: arama süzer, eşleşme yoksa boş liste metni görünür", async () => {
  const s = renderTest(() => <OptionListLab />)
  await s.type("Tema ara", "koy")
  const results = s.all('[role="listbox"]').find((l: Element) => l.getAttribute("aria-label") === "Arama sonuçları")!
  expect(results.querySelectorAll('[role="option"]').length).toBe(1)
  await s.type("Tema ara", "zzz")
  expect(s.text().includes("Eşleşen tema yok")).toBe(true)
})
