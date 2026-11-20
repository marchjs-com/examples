import { test, expect, renderTest } from "march/testing"
import { SchedulerLab } from "./SchedulerLab.tsx"

// SchedulerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("takvim sınıfını ve kendi ipucunu alır", () => {
  const s = renderTest(() => <SchedulerLab />)
  expect(s.get(".lab-sch")).not.toBe(null)
  expect(s.sees("boş saate sürükleyip ekleyin")).toBe(true)
})

test("kendi içeriği: etkinlik başlığı ve yeri birlikte yazılır", () => {
  const s = renderTest(() => <SchedulerLab />)
  expect(s.sees("Tasarım incelemesi")).toBe(true)
  expect(s.sees("Stüdyo")).toBe(true)
})

test("görünüm düğmesi haftadan güne geçer", async () => {
  const s = renderTest(() => <SchedulerLab />)
  await s.click("Görünüm: week")
  expect(s.sees("Görünüm: day")).toBe(true)
})

test("dil düğmesi takvimin dilini değiştirir (lang)", async () => {
  const s = renderTest(() => <SchedulerLab />)
  expect(s.get(".lab-sch")?.getAttribute("lang")).toBe("tr")
  await s.click("Dil: tr")
  expect(s.get(".lab-sch")?.getAttribute("lang")).toBe("en-US")
})
