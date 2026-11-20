import { test, expect, renderTest } from "march/testing"
import { ImageCropperLab } from "./ImageCropperLab.tsx"

// ImageCropperLab'in testleri: kaydedince Testler sekmesinde çalışır
test("sağa çevir 90° döndürür, aynala aynalar", async () => {
  const s = renderTest(() => <ImageCropperLab />)
  await s.click("Sağa çevir")
  expect(s.sees("dönüş: 90°")).toBe(true)
  await s.click("Aynala")
  expect(s.sees("ayna: evet")).toBe(true)
  expect(s.sees("değişiklik: 2")).toBe(true)
})

test("API ile sıfırla başlangıca döndürür", async () => {
  const s = renderTest(() => <ImageCropperLab />)
  await s.click("Sola çevir")
  expect(s.sees("dönüş: -90°")).toBe(true)
  await s.click("API ile sıfırla")
  expect(s.sees("dönüş: 0°")).toBe(true)
})

test("kendi oranları görünür; Kare sabit oranı açınca seçenekler gizlenir", async () => {
  const s = renderTest(() => <ImageCropperLab />)
  expect(s.find("2:1")).not.toBe(null)
  await s.click("Kare")
  expect(s.find("2:1")).toBe(null)
})

test("kilitliyken düğmeler devre dışı", async () => {
  const s = renderTest(() => <ImageCropperLab />)
  await s.click(s.find("Kilitle")!.closest("label")!.querySelector("[role=switch]")!)
  expect(s.find("Sağa çevir")?.hasAttribute("disabled")).toBe(true)
  expect(s.get(".lab-crop")?.className).toContain("is-readonly")
})
