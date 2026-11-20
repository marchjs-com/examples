import { test, expect, renderTest } from "march/testing"
import { NavSidebarLab } from "./NavSidebarLab.tsx"

// NavSidebarLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir öğe seçilince onSelect çalışır; Siparişler rozetini söndürür", async () => {
  const s = renderTest(() => <NavSidebarLab />)
  await s.click("Kullanıcılar")
  expect(s.sees("Sayfa: users")).toBe(true)
  await s.click("Siparişler")
  expect(s.sees("Sayfa: orders")).toBe(true)
  expect(s.sees("4 yeni sipariş")).toBe(false)
})

test("kendi metinler ve gizli öğe: Bölümler başlığı görünür, hidden öğe listelenmez", () => {
  const s = renderTest(() => <NavSidebarLab />)
  expect(s.sees("Bölümler")).toBe(true)
  expect(s.sees("Destek kutusu")).toBe(true)
  expect(s.sees("Gizli sayfa")).toBe(false)
})

test("bölüm süzgeci (visibleGroups) yalnız seçilen kategoriyi listeler", async () => {
  const s = renderTest(() => <NavSidebarLab />)
  expect(s.sees("Raporlar")).toBe(true)
  await s.click("Yönetim")
  expect(s.sees("Raporlar")).toBe(false)
  expect(s.sees("Roller")).toBe(true)
})

test("arama kutusu menüyü süzer; kendi kısayolu (shortcut) ekran okuyucuya da söylenir", async () => {
  const s = renderTest(() => <NavSidebarLab />)
  const box = await s.type("Menüde ara", "kullan")
  await s.wait(() => !s.sees("Raporlar"))
  expect(s.sees("Kullanıcılar")).toBe(true)
  expect(box.getAttribute("aria-keyshortcuts")).toBe("Control+J Meta+J")
})
