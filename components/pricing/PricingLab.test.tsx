import { test, expect, renderTest } from "march/testing"
import { PricingLab } from "./PricingLab.tsx"

// PricingLab'in testleri: kaydedince Testler sekmesinde çalışır
test("üç plan; öne çıkan rozetli, özel fiyat kendi metniyle", () => {
  const s = renderTest(() => <PricingLab />)
  expect(s.all(".lab-pricing .m-price-card").length).toBe(3)
  expect(s.get(".m-price-card.is-featured .m-price-badge")?.textContent).toBe("Önerilen")
  expect(s.get(".m-price-custom")?.textContent).toBe("Bize sorun")
  expect(s.get(".m-price-feat.is-off")?.textContent).toContain("dahil değil")
})

test("Yıllık'a basınca dönem değişir, fiyat ve satır güncellenir", async () => {
  const s = renderTest(() => <PricingLab />)
  const before = s.all(".m-price-plain")[1]?.textContent
  await s.click("Yıllık")
  expect(s.sees("Dönem: yearly")).toBe(true)
  expect(s.all(".m-price-plain")[1]?.textContent).not.toBe(before)
  expect(s.get(".m-price-billed")?.textContent).toBe("yıllık ödenir")
})

test("eylem sayar; kendi işaret anahtarı işareti değiştirir", async () => {
  const s = renderTest(() => <PricingLab />)
  await s.click("Pro'yu seç (0)")
  expect(s.find("Pro'yu seç (1)")).not.toBe(null)
  expect(s.get(".m-price-feat-own")).toBe(null)
  await s.click("Kendi işaretim")
  expect(s.get(".m-price-feat-own")?.textContent).toBe("✓")
})

test("dönem düğmesi ve ay satırı kapanır", async () => {
  const s = renderTest(() => <PricingLab />)
  await s.click("Dönem düğmesi")
  await s.click("Ay satırı")
  expect(s.get(".m-price-switch")).toBe(null)
  expect(s.get(".m-price-per")).toBe(null)
})
