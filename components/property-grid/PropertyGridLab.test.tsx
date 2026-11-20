import { test, expect, renderTest } from "march/testing"
import { PropertyGridLab } from "./PropertyGridLab.tsx"

// PropertyGridLab'in testleri: gruplar, gizli satır, doğrulama, kaydet, kendi denetim
test("grup sırası Plan önce; gizli satır kapalıyken görünmez", () => {
  const s = renderTest(() => <PropertyGridLab />)
  const text = s.get(".lab-pg")?.textContent ?? ""
  expect(text.indexOf("Plan")).toBeGreaterThan(-1)
  expect(text.indexOf("Plan") < text.indexOf("Kimlik")).toBe(true)
  expect(s.sees("Paylaşım bağlantısı")).toBe(false)
  expect(s.sees("Değişiklik yok")).toBe(true)
})

test("kendi denetimi: simgeye basınca değer değişir, alt çubuk sayar", async () => {
  const s = renderTest(() => <PropertyGridLab />)
  await s.click("🌙")
  expect(s.sees("düzenleme: 1")).toBe(true)
  expect(s.sees("1 kaydedilmemiş")).toBe(true)
})

test("Kaydet onSave'i çalıştırır, kayıtlı değerler güncellenir", async () => {
  const s = renderTest(() => <PropertyGridLab />)
  await s.type("Ad", "Venüs")
  await s.click("Kaydet")
  await s.wait(() => s.sees("kayıtlı ad: Venüs"))
  expect(s.sees("kayıtlı ad: Venüs")).toBe(true)
  expect(s.sees("Değişiklik yok")).toBe(true)
})

test("doğrulama: bütçe sınırı aşılınca hata yazar", async () => {
  const s = renderTest(() => <PropertyGridLab />)
  await s.type("Bütçe", "20000")
  await s.wait(() => s.sees("En çok 10 000 ₺"))
  expect(s.sees("En çok 10 000 ₺")).toBe(true)
})

test("history: kendi yığını; başlıktaki Geri al son değişikliği geri alır", async () => {
  const s = renderTest(() => <PropertyGridLab />)
  await s.click("🌙")
  expect(s.sees("1 kaydedilmemiş")).toBe(true)
  await s.click(".m-pg-history button")
  await s.wait(() => s.sees("Değişiklik yok"))
  expect(s.sees("Değişiklik yok")).toBe(true)
})
