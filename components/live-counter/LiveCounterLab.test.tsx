import { test, expect, renderTest } from "march/testing"
import { LiveCounterLab } from "./LiveCounterLab.tsx"

// LiveCounterLab'in testleri: kaydedince Testler sekmesinde çalışır
test("etiket, ön ve son ek, başlangıç değeri", () => {
  const s = renderTest(() => <LiveCounterLab />)
  expect(s.get(".lab-lc .m-lc-label")?.textContent).toBe("kişi sırada")
  expect(s.get(".lab-lc .m-lc-text")?.textContent).toBe("120")
  expect(s.get(".lab-lc .m-lc-plain")?.textContent).toBe("👥 120 kişi")
})

test("değer artınca sayı değişir", async () => {
  const s = renderTest(() => <LiveCounterLab />)
  await s.click("+5 kişi")
  expect(s.get(".lab-lc .m-lc-text")?.textContent).toBe("125")
})

test("kendi canlı noktası; anahtar kapatınca gider", async () => {
  const s = renderTest(() => <LiveCounterLab />)
  expect(s.get(".lab-lc .lab-dot")).not.toBe(null)
  await s.click("Canlı nokta")
  expect(s.container.querySelector(".lab-lc .m-lc-dot-own")).toBe(null)
})

test("taklit büyüme from değerinden başlar", async () => {
  const s = renderTest(() => <LiveCounterLab />)
  await s.click("Taklit büyüme")
  expect(s.get(".lab-lc .m-lc-text")?.textContent).toBe("500")
})
