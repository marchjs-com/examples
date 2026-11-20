import { test, expect, renderTest } from "march/testing"
import { ColorPickerLab } from "./ColorPickerLab.tsx"

// ColorPickerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("değer alanına yazılan renk değeri ve sayacı günceller", async () => {
  const s = renderTest(() => <ColorPickerLab />)
  await s.type("Vurgu rengi", "#ff0000")
  // biçim hsl: değer hsl olarak yazılır
  expect(s.sees("hsl(0")).toBe(true)
  expect(s.sees("değişiklik: 1")).toBe(true)
})

test("kendi paletindeki bir renge basınca seçilir", async () => {
  const s = renderTest(() => <ColorPickerLab />)
  await s.click("#6a3093")
  expect(s.sees("değişiklik: 1")).toBe(true)
  expect(s.sees("Gün batımı")).toBe(true)
})

test("kendi metinleri: ton kaydırıcısı ve kontrast satırı", () => {
  const s = renderTest(() => <ColorPickerLab />)
  expect(s.find("Ton")).not.toBe(null)
  expect(s.sees("beyazda")).toBe(true)
  expect(s.get(".lab-cp")?.getAttribute("aria-label")).toBe("Vurgu rengi")
})

test("salt okunurken palet seçimi değeri değiştirmez", async () => {
  const s = renderTest(() => <ColorPickerLab />)
  await s.click(s.find("Kilitle (salt okunur)")!.closest("label")!.querySelector("[role=switch]")!)
  expect(s.get(".lab-cp")?.className).toContain("is-readonly")
  await s.click("#6a3093")
  expect(s.sees("değişiklik: 0")).toBe(true)
})
