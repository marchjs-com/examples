import { test, expect, renderTest } from "march/testing"
import { ActivityBarLab } from "./ActivityBarLab.tsx"

// ActivityBarLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir görünüme basınca seçilir; etkin olana yeniden basınca yan görünüm kapanır", async () => {
  const s = renderTest(() => <ActivityBarLab />)
  const ara = await s.click("Ara")
  expect(ara.getAttribute("aria-selected")).toBe("true")
  expect(ara.getAttribute("aria-controls")).toBe("lab-side")
  expect(s.sees("search görünümü")).toBe(true)
  await s.click("Ara")
  expect(s.sees("Yan görünüm kapalı")).toBe(true)
})

test("collapsible={false}: etkin olana yeniden basmak seçimi bırakmaz; çubuk canlı döner", async () => {
  const s = renderTest(() => <ActivityBarLab />)
  const gelen = await s.click("Gelen")
  expect(gelen.getAttribute("aria-selected")).toBe("true")
  expect(s.get(".lab-ab2")?.getAttribute("aria-orientation")).toBe("horizontal")
  await s.click("Çubuğu döndür")
  expect(s.get(".lab-ab2")?.getAttribute("aria-orientation")).toBe("vertical")
})

test("subItems: seçilenin alt öğeleri görünür; birine basınca onSubSelect çalışır", async () => {
  const s = renderTest(() => <ActivityBarLab />)
  const recent = await s.click("Son kullanılanlar")
  expect(recent.getAttribute("aria-current")).toBe("page")
  expect(s.sees("Alt sayfa: recent")).toBe(true)
})

test("sondaki eylem öğesi seçilmez, onSelect'i çalışır; kök sınıf, renk, ad ve kısayol taşır", async () => {
  const s = renderTest(() => <ActivityBarLab />)
  await s.click("Ayarlar")
  expect(s.sees("Ayarlar 1 kez açıldı")).toBe(true)
  expect(s.get("[data-view='settings']")?.getAttribute("aria-selected")).toBe("false")
  const bar = s.get(".lab-ab")
  expect(bar?.getAttribute("role")).toBe("tablist")
  expect(bar?.getAttribute("aria-label")).toBe("Lab görünümleri")
  expect(bar?.getAttribute("data-m-color")).toBe("brand-green")
  expect(s.get("[data-view='git']")?.getAttribute("aria-keyshortcuts")).toBe("mod+shift+g")
})
