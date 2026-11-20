import { test, expect, renderTest } from "march/testing"
import { GanttLab } from "./GanttLab.tsx"

// GanttLab'in testleri: kaydedince Testler sekmesinde çalışır
test("şema adını, sınıfını ve kendi sütun başlığını alır", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.get("[role=grid]")?.getAttribute("aria-label")).toBe("Yazı süreci")
  expect(s.get(".lab-gantt")).not.toBe(null)
  expect(s.sees("Adım")).toBe(true)
})

test("barLabel çubuğun metnine yüzdeyi ekler", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.sees("Taslak · %80")).toBe(true)
  expect(s.get('[data-task="a"]')?.getAttribute("aria-label")).toContain("Taslak")
})

test("görev adları sütunu her görevi yazar", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.all("[role=rowheader]").length).toBe(3)
})

test("kilitle düğmesi metnini değiştirir", async () => {
  const s = renderTest(() => <GanttLab />)
  await s.click("Kilitle")
  expect(s.sees("Düzenlemeyi aç")).toBe(true)
})
