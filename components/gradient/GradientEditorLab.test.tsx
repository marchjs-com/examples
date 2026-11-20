import { test, expect, renderTest } from "march/testing"
import { GradientEditorLab } from "./GradientEditorLab.tsx"

// GradientEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("hazır bir gradyana basınca değer o olur", async () => {
  const s = renderTest(() => <GradientEditorLab />)
  await s.click("Hazır: Deniz")
  expect(s.sees("linear-gradient(90deg, #4cc3e0 0%, #13233a 100%)")).toBe(true)
  expect(s.sees("değişiklik: 1")).toBe(true)
})

test("hızlı açı düğmesi açıyı değiştirir", async () => {
  const s = renderTest(() => <GradientEditorLab />)
  await s.click("90 derece")
  expect(s.sees("linear-gradient(90deg")).toBe(true)
})

test("yalnız verilen türler sunulur, kendi metinleriyle", () => {
  const s = renderTest(() => <GradientEditorLab />)
  expect(s.find("Pasta")).not.toBe(null)
  expect(s.find("Halka")).toBe(null)
})

test("kilitliyken hazırlar değeri değiştirmez", async () => {
  const s = renderTest(() => <GradientEditorLab />)
  await s.click(s.find("Kilitle")!.closest("label")!.querySelector("[role=switch]")!)
  await s.click("Hazır: Deniz")
  expect(s.sees("değişiklik: 0")).toBe(true)
})
