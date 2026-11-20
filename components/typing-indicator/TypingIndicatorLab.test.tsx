import { test, expect, renderTest } from "march/testing"
import { TypingIndicatorLab } from "./TypingIndicatorLab.tsx"

// TypingIndicatorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("label kendi cümlesini yazar", () => {
  const s = renderTest(() => <TypingIndicatorLab />)
  expect(s.sees("Elif ve Can karalıyor")).toBe(true)
})

test("bir durum bölgesi (role=status)", () => {
  const s = renderTest(() => <TypingIndicatorLab />)
  expect(s.all("[role=status]").length).toBeGreaterThan(0)
})
