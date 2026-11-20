import { test, expect, renderTest } from "march/testing"
import { HeroLab } from "./HeroLab.tsx"

// HeroLab'in testleri: kaydedince Testler sekmesinde çalışır
test("başlık ikinci düzeyde, vurgulu kısım ayrı bir öğede", () => {
  const s = renderTest(() => <HeroLab />)
  const h = s.container.querySelector("h2")
  expect(h?.textContent).toContain("Bugün kiminle buluşuyorsun?")
  expect(h?.querySelector(".m-hero-hl")?.textContent).toBe("buluşuyorsun")
})

test("ilk eylem sayar: Katıl (0) → Katıl (1)", async () => {
  const s = renderTest(() => <HeroLab />)
  await s.click("Katıl (0)")
  expect(s.find("Katıl (1)")).not.toBe(null)
})

test("üst etiket bir bağlantı; not ve içerik görünür", () => {
  const s = renderTest(() => <HeroLab />)
  expect(s.container.querySelector('a[href="#yenilikler"]')).not.toBe(null)
  expect(s.container.textContent).toContain("Ücretsiz · kart gerekmez")
  expect(s.container.textContent).toContain("12 şehirde, 40 bin kişi")
})

test("ürün görünümünde pencere çubuğu var; anahtar kapatınca gider", async () => {
  const s = renderTest(() => <HeroLab />)
  expect(s.container.querySelector(".m-hero-frame-bar")).not.toBe(null)
  await s.click("Pencere çubuğu")
  expect(s.container.querySelector(".m-hero-frame-bar")).toBe(null)
})
