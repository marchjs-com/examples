import { test, expect, renderTest } from "march/testing"
import { MultiSelectLab } from "./MultiSelectLab.tsx"

// MultiSelectLab'in testleri: kaydedince Testler sekmesinde çalışır
test("yazıp seçince değer diziye eklenir; onSelect ve onChange çağrılır", async () => {
  const s = renderTest(() => <MultiSelectLab />)
  await s.type("Diller", "alm")
  await s.click("Almanca")
  expect(s.text().includes("Diller: tr, en, de · son: Almanca · değişiklik: 1")).toBe(true)
})

test("chip'in kaldır düğmesi labels.remove adıyla bulunur ve değeri çıkarır", async () => {
  const s = renderTest(() => <MultiSelectLab />)
  await s.click("Türkçe dilini kaldır")
  expect(s.text().includes("Diller: en · son: — · değişiklik: 1")).toBe(true)
  expect(s.find("Türkçe dilini kaldır")).toBe(null)
})

test("removeIcon={false} ve readonly chip'te kaldır düğmesi yok; salt okunur alan yazılamaz", () => {
  const s = renderTest(() => <MultiSelectLab />)
  expect(s.find("Çilek at")).toBe(null)
  expect(s.find("Kiraz sil") !== null).toBe(true)
  expect(s.find("İngilizce kilitli")).toBe(null)
  expect((s.find("Kilitli") as HTMLInputElement).readOnly).toBe(true)
  expect((s.find("Kapalı") as HTMLInputElement).disabled).toBe(true)
})

test("labelOf aramadan gelmemiş değeri adlandırır; geçersiz alan aria ile söylenir", () => {
  const s = renderTest(() => <MultiSelectLab />)
  expect(s.text().includes("Üye #104")).toBe(true)
  const bad = s.get("#langs-bad") as HTMLInputElement
  expect(bad.getAttribute("aria-invalid")).toBe("true")
  expect(bad.getAttribute("aria-describedby")).toBe("langs-error")
  expect(bad.name).toBe("langs")
  expect(bad.closest(".lab-multi") !== null).toBe(true)
})
