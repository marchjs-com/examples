import { test, expect, renderTest } from "march/testing"
import { ThreadNavLab } from "./ThreadNavLab.tsx"

// ThreadNavLab'in testleri: kaydedince Testler sekmesinde çalışır
test("labels.group iplikteki nav'ın adı; class köke eklenir", () => {
  const s = renderTest(() => <ThreadNavLab />)
  expect(s.find("Lab gezinme")?.tagName).toBe("NAV")
  expect(s.get(".lab-thread")).not.toBe(null)
  expect(s.get('.m-thn-bead[aria-label="Bileşenler"]')?.getAttribute("aria-current")).toBe("location")
})

test("Bir boncuk kapsülü açar; bir sayfa seçilince onNavigate yolu verir, kapsül kapanır", async () => {
  const s = renderTest(() => <ThreadNavLab />)
  await s.click("Bileşenler")
  expect(s.get('.m-thn-bead[aria-label="Bileşenler"]')?.getAttribute("aria-expanded")).toBe("true")
  expect(s.get(".m-thn-panel")).not.toBe(null)
  await s.click("Çubuk")
  expect(s.sees("Seçilen: Bileşenler › Grafikler › Çubuk")).toBe(true)
  expect(s.get(".m-thn-panel")).toBe(null)
})

test("Arama süzer, eşleşen yoksa labels.empty görünür; labels.close kapsülü kapatır", async () => {
  const s = renderTest(() => <ThreadNavLab />)
  await s.click("Görünüm")
  await s.type("Lab'da ara", "zzz")
  await s.wait(() => s.sees("Burada bir şey yok"))
  expect(s.sees("Burada bir şey yok")).toBe(true)
  await s.click("Kapsülü kapat")
  expect(s.get(".m-thn-panel")).toBe(null)
})

test("href verilen kategori bir bağlantı; kategorisiz bölüm kendisi gider", async () => {
  const s = renderTest(() => <ThreadNavLab />)
  await s.click("Hakkında")
  expect(s.find("Sürüm notları")?.closest("a")?.getAttribute("href")).toBe("https://marchjs.com")
  await s.click("Profil")
  expect(s.sees("Sayfa: Profil")).toBe(true)
})
