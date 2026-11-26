// Tests for NavSidebarLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <NavSidebarLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(name) clicks like a user and waits until the view has updated; s.type(name, text) types into a field and
//   returns the input element; s.sees(text) says whether the text is visible; s.wait(fn) waits until fn() is true.
//   Anything that awaits is why those tests are async.
// - The tests check what a user or a screen reader can observe (visible text, attributes) rather than internal
//   state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { NavSidebarLab } from "./NavSidebarLab.tsx"

// Choosing an item runs its onSelect: the Lab writes the page id into a badge, so the visible text proves it. The
// "orders" item also sets the unread count to 0, so its live second line (the "new orders waiting" text) disappears.
test("bir öğe seçilince onSelect çalışır; Siparişler rozetini söndürür", async () => {
  const s = renderTest(() => <NavSidebarLab />)
  await s.click("Kullanıcılar")
  expect(s.sees("Sayfa: users")).toBe(true)
  await s.click("Siparişler")
  expect(s.sees("Sayfa: orders")).toBe(true)
  expect(s.sees("4 yeni sipariş")).toBe(false)
})

// labels.categories replaces the built-in heading text; the `hidden: true` item never appears in the list, while a
// featured item does.
test("kendi metinler ve gizli öğe: Bölümler başlığı görünür, hidden öğe listelenmez", () => {
  const s = renderTest(() => <NavSidebarLab />)
  expect(s.sees("Bölümler")).toBe(true)
  expect(s.sees("Destek kutusu")).toBe(true)
  expect(s.sees("Gizli sayfa")).toBe(false)
})

// visibleGroups: the Segmented control above the menu chooses one section. Before: an item of the "Analiz"
// category is visible; after choosing the second section only its category is listed, so that item is gone and one of its own shows.
test("bölüm süzgeci (visibleGroups) yalnız seçilen kategoriyi listeler", async () => {
  const s = renderTest(() => <NavSidebarLab />)
  expect(s.sees("Raporlar")).toBe(true)
  await s.click("Yönetim")
  expect(s.sees("Raporlar")).toBe(false)
  expect(s.sees("Roller")).toBe(true)
})

// The search box filters the list as you type. Filtering is not instant, so the test waits with s.wait until the
// unrelated item is gone. The shortcut given as "mod+j" is announced through aria-keyshortcuts for both
// Control and Meta, which is what a screen reader reads.
test("arama kutusu menüyü süzer; kendi kısayolu (shortcut) ekran okuyucuya da söylenir", async () => {
  const s = renderTest(() => <NavSidebarLab />)
  const box = await s.type("Menüde ara", "kullan")
  await s.wait(() => !s.sees("Raporlar"))
  expect(s.sees("Kullanıcılar")).toBe(true)
  expect(box.getAttribute("aria-keyshortcuts")).toBe("Control+J Meta+J")
})
