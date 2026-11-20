import { test, expect, renderTest } from "march/testing"
import { SpacerLab } from "./SpacerLab.tsx"

// SpacerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Spacer bir m-spacer öğesi çizer", () => {
  const s = renderTest(() => <SpacerLab />)
  expect(s.all(".lab-one .m-spacer").length).toBe(1)
  expect(s.all(".lab-two .m-spacer").length).toBe(2)
})

test("iki Spacer üç düğmeyi ayırır", () => {
  const s = renderTest(() => <SpacerLab />)
  expect(s.all(".lab-two button").length).toBe(3)
})
