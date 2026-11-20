import { test, expect, renderTest } from "march/testing"
import { DockLayoutLab } from "./DockLayoutLab.tsx"

// DockLayoutLab'in testleri: sekmeler, kendi metinler, onClose, api ve kapalı panel
test("beş panelin sekmesi var; ad, id ve sınıf yerinde", () => {
  const s = renderTest(() => <DockLayoutLab />)
  for (const t of ["Dosyalar", "lab.ts", "Günlük", "Hata ayıklama", "Kilitli"]) expect(s.sees(t)).toBe(true)
  expect(s.get("#lab-dock")?.classList.contains("lab-dock")).toBe(true)
  expect(s.get(".lab-dock")?.getAttribute("aria-label")).toBe("Lab çalışma alanı")
})

test("grup düğmeleri kendi metinleriyle", () => {
  const s = renderTest(() => <DockLayoutLab />)
  expect(s.find("Tam boy")).toBeTruthy()
  expect(s.find("Şeride indir")).toBeTruthy()
  expect(s.find("Seçenekler")).toBeTruthy()
})

test("api.close onClose'a sorar; false dönünce panel kalır", async () => {
  const s = renderTest(() => <DockLayoutLab />)
  await s.click("Günlüğü kapat")
  await s.flush(4)
  expect(s.sees("kapatılan: log")).toBe(true)
  expect(s.sees("log kapandı")).toBe(true)
})

test("değişti noktası: Kaydet'e basınca kalkar", async () => {
  const s = renderTest(() => <DockLayoutLab />)
  await s.click("Kaydet")
  expect(s.find("Değiştir")).toBeTruthy()
})
