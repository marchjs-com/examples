import { test, expect, renderTest } from "march/testing"
import { GridLab } from "./GridLab.tsx"

// GridLab'in testleri: kaydedince Testler sekmesinde çalışır
test("her ızgara bütün kartlarını çizer", () => {
  const s = renderTest(() => <GridLab />)
  expect(s.all(".lab-cols .sc-tile").length).toBe(5)
  expect(s.all(".lab-min .sc-tile").length).toBe(4)
})

test("fill son satırın sınıfını verir", () => {
  const s = renderTest(() => <GridLab />)
  expect(s.get(".lab-last")?.className).toContain("m-grid-fill-last")
})

test("balance ızgarayı dengeli kipe alır", () => {
  const s = renderTest(() => <GridLab />)
  expect(s.get(".lab-balance")?.className).toContain("m-grid-balance")
})
