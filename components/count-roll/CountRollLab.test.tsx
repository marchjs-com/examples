import { test, expect, renderTest } from "march/testing"
import { CountRollLab } from "./CountRollLab.tsx"

// CountRollLab'in testleri: kaydedince Testler sekmesinde çalışır
test("formatter kendi metnini yazar ve değer değişince güncellenir", async () => {
  const s = renderTest(() => <CountRollLab />)
  expect(s.get(".lab-own")?.textContent).toContain("0 beğeni")
  await s.click("+5")
  await s.flush(2)
  expect(s.get(".lab-own")?.textContent).toContain("5 beğeni")
})

test("hideZero sıfırı göstermez", () => {
  const s = renderTest(() => <CountRollLab />)
  expect(s.get(".lab-zero")?.textContent?.trim()).toBe("")
})
