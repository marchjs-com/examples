import { test, expect, renderTest } from "march/testing"
import { DatePickerLab } from "./DatePickerLab.tsx"

// DatePickerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("dilin sırasıyla yazılan tarih ISO değer olur", async () => {
  const s = renderTest(() => <DatePickerLab />)
  await s.type("Teslim tarihi", "18.03.2026")
  expect(s.text().includes("Değer: 2026-03-18")).toBe(true)
  expect(s.text().includes("Değişiklik: 1")).toBe(true)
  await s.type("ABD tarihi", "4/7/2026")
  expect(s.text().includes("Ay/gün/yıl: 2026-04-07")).toBe(true)
})

test("olmayan ya da sınır dışı tarih geçersiz sayılır, değer değişmez", async () => {
  const s = renderTest(() => <DatePickerLab />)
  const field = await s.type("Teslim tarihi", "31.02.2026")
  expect(field.getAttribute("aria-invalid")).toBe("true")
  await s.type("Teslim tarihi", "01.01.2027")
  expect(field.getAttribute("aria-invalid")).toBe("true")
  expect(s.text().includes("Değer: 2026-03-14")).toBe(true)
})

test("takvim düğmesi takvimi açar, gün seçilince değer değişir ve takvim kapanır", async () => {
  const s = renderTest(() => <DatePickerLab />)
  const open = await s.click("Takvimi aç")
  expect(open.getAttribute("aria-expanded")).toBe("true")
  await s.wait(() => s.get('[data-date="2026-03-20"]'))
  expect(s.get('[data-date="2026-03-22"]')?.getAttribute("aria-disabled")).toBe("true")
  await s.click('[data-date="2026-03-20"]')
  expect(s.text().includes("Değer: 2026-03-20")).toBe(true)
  expect(open.getAttribute("aria-expanded")).toBe("false")
})

test("öznitelikler, icon={false}, salt okunur ve devre dışı", () => {
  const s = renderTest(() => <DatePickerLab />)
  const due = s.get(".lab-date input") as HTMLInputElement
  expect(due.name).toBe("due")
  expect(due.required).toBe(true)
  expect(due.placeholder).toBe("GG.AA.YYYY")
  expect(s.get(".lab-noicon .m-date-btn")).toBe(null)
  const plain = s.get("#lab-plain")
  expect(plain?.getAttribute("aria-describedby")).toBe("lab-hint")
  expect(plain?.getAttribute("aria-invalid")).toBe("true")
  expect((s.find("Salt okunur tarih") as HTMLInputElement).readOnly).toBe(true)
  expect((s.find("Kapalı tarih") as HTMLInputElement).disabled).toBe(true)
  expect((s.get(".lab-disabled .m-date-btn") as HTMLButtonElement | null)?.disabled).toBe(true)
})
