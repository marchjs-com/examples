import { test, expect, renderTest } from "march/testing"
import { BottomNavLab } from "./BottomNavLab.tsx"

// BottomNavLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir sekmeye basınca onChange değeri değiştirir ve sekme etkin olur", async () => {
  const s = renderTest(() => <BottomNavLab />)
  await s.click("Keşfet")
  expect(s.sees("Sekme: explore")).toBe(true)
})

test("120 bildirim 99+ yazılır; sekmesi açılınca sıfırlanır", async () => {
  const s = renderTest(() => <BottomNavLab />)
  expect(s.sees("99+")).toBe(true)
  await s.click("Bildirimler")
  expect(s.sees("99+")).toBe(false)
})

test("Oluştur düğmesinin adı createLabel'dan gelir; alt sayfa menüsünde başlığı görünür", async () => {
  const s = renderTest(() => <BottomNavLab />)
  await s.click("Menü: fan")
  await s.click("Menü: stack")
  expect(s.sees("Menü: sheet")).toBe(true)
  await s.click("Yeni ekle")
  expect(s.sees("Ne paylaşalım?")).toBe(true)
})

test("bir eylem seçilince onAction çalışır", async () => {
  const s = renderTest(() => <BottomNavLab />)
  await s.click("Yeni ekle")
  await s.click("Hikâye")
  await s.wait(() => s.sees("onAction: story"))
  expect(s.sees("onAction: story")).toBe(true)
})
