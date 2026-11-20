import { test, expect, renderTest } from "march/testing"
import { ErrorBoxLab } from "./ErrorBoxLab.tsx"

// ErrorBoxLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Error nesnesinin message'ı, metin hatası ve message gösterilir", () => {
  const s = renderTest(() => <ErrorBoxLab />)
  expect(s.sees("Bağlantı reddedildi")).toBe(true)
  expect(s.sees("Dosya bulunamadı (404)")).toBe(true)
  expect(s.sees("Yalnız message: error verilmedi.")).toBe(true)
})

test("retry düğmesi çağırır; erişimci hatası güncellenir", async () => {
  const s = renderTest(() => <ErrorBoxLab />)
  await s.click("Kodu artır")
  expect(s.sees("Yeniden deneme: 1")).toBe(true)
  expect(s.sees("Sunucu hatası (501)")).toBe(true)
})

test("hata kutusu role=alert ve class köke eklenir", () => {
  const s = renderTest(() => <ErrorBoxLab />)
  const box = s.get(".lab-error")
  expect(box?.getAttribute("role")).toBe("alert")
  expect(box?.querySelector(".m-errorbox-retry")?.textContent).toContain("Yenile")
})

test("retry verilmezse düğme yok", () => {
  const s = renderTest(() => <ErrorBoxLab />)
  const text = s.find("Dosya bulunamadı (404)")?.closest(".m-errorbox")
  expect(text?.querySelector("button")).toBe(null)
})
