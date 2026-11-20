import { test, expect, renderTest } from "march/testing"
import { KeyframeTimelineLab } from "./KeyframeTimelineLab.tsx"

// KeyframeTimelineLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kendi metinleri: izler, kareler ve hız seçenekleri", () => {
  const s = renderTest(() => <KeyframeTimelineLab />)
  expect(s.find("Roket · x izi")).not.toBe(null)
  expect(s.find("Roket rotate 2. kare")).not.toBe(null)
  expect(s.sees("3×")).toBe(true)
  expect(s.sees("Bir kare seç")).toBe(true)
})

test("bir kareye odaklanınca denetçi açılır; zaman yazılınca değer değişir", async () => {
  const s = renderTest(() => <KeyframeTimelineLab />)
  await s.focus("Roket x 1. kare")
  await s.flush()
  expect(s.find("Kareyi sil")).not.toBe(null)
  await s.type("Zaman", 300)
  expect(s.sees("ilk x karesi: 300 ms")).toBe(true)
  expect(s.sees("değişiklik: 1")).toBe(true)
})

test("oynat düğmesi duraklat olur", async () => {
  const s = renderTest(() => <KeyframeTimelineLab />)
  await s.click("Oynat")
  expect(s.find("Duraklat")).not.toBe(null)
  await s.click("Duraklat")
})

test("kilitliyken kareler devre dışı", async () => {
  const s = renderTest(() => <KeyframeTimelineLab />)
  await s.click(s.find("Kilitle")!.closest("label")!.querySelector("[role=switch]")!)
  expect(s.find("Roket x 1. kare")?.hasAttribute("disabled")).toBe(true)
  expect(s.get(".lab-kt")?.className).toContain("is-readonly")
})
