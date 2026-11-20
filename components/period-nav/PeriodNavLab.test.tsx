import { test, expect, renderTest } from "march/testing"
import { PeriodNavLab } from "./PeriodNavLab.tsx"

// PeriodNavLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Oklar onPrev / onNext'i, bugün düğmesi onToday'i çağırır; labels adları verir", async () => {
  const s = renderTest(() => <PeriodNavLab />)
  await s.click("Sonraki hafta")
  await s.click("Sonraki hafta")
  expect(s.sees("hafta +2")).toBe(true)
  await s.click("Bu hafta")
  expect(s.sees("hafta +0")).toBe(true)
  expect(s.find("Hafta seçici")?.getAttribute("role")).toBe("group")
})

test("title okların arasında ve canlı; partClass ve class parçalarda", async () => {
  const s = renderTest(() => <PeriodNavLab />)
  const title = s.get(".lab-month .lab-title")
  const before = title?.textContent
  await s.click("Sonraki ay")
  expect(title?.textContent).not.toBe(before)
  expect(s.find("Önceki ay")?.classList.contains("lab-prev")).toBe(true)
  expect(s.find("● Şimdi")?.closest("button")?.classList.contains("lab-today")).toBe(true)
})

test("prevDisabled / nextDisabled uçlarda okları kapatır; today={false} düğmeyi kaldırır", async () => {
  const s = renderTest(() => <PeriodNavLab />)
  expect(s.find("Geri sayfa")?.hasAttribute("disabled")).toBe(true)
  await s.click("İleri sayfa")
  await s.click("İleri sayfa")
  expect(s.sees("Sayfa 3 / 3")).toBe(true)
  expect(s.find("İleri sayfa")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Sayfa seçici")?.querySelectorAll("button").length).toBe(2)
})

test("arrows={false} okları kaldırır, bugün düğmesi kalır", () => {
  const s = renderTest(() => <PeriodNavLab />)
  expect(s.find("Oksuz dönem")?.querySelectorAll("button").length).toBe(1)
  expect(s.find("Sıfırla")).not.toBe(null)
})
