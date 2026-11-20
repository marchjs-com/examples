import { test, expect, renderTest } from "march/testing"
import { SiteNavLab } from "./SiteNavLab.tsx"

// SiteNavLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kendi adıyla bir gezinme; geçerli sayfa işaretli", () => {
  const s = renderTest(() => <SiteNavLab />)
  expect(s.get("header.lab-nav")?.classList.contains("m-snav-floating")).toBe(true)
  expect(s.get('nav[aria-label="Site"]')).not.toBe(null)
  expect(s.get('a[aria-current="page"]')?.textContent).toBe("Keşfet")
})

test("bir bağlantıya basınca geçerli sayfa değişir", async () => {
  const s = renderTest(() => <SiteNavLab />)
  await s.click(s.get('a[href="#lab-blog"]')!)
  expect(s.get('a[aria-current="page"]')?.textContent).toBe("Blog")
  expect(s.sees("Seçili sayfa: #lab-blog")).toBe(true)
})

test("eylem düğmesi sayar", async () => {
  const s = renderTest(() => <SiteNavLab />)
  await s.click("Katıl (0)")
  expect(s.find("Katıl (1)")).not.toBe(null)
})

test("hap ve menü düğmesi anahtarlarla kapanır", async () => {
  const s = renderTest(() => <SiteNavLab />)
  expect(s.get(".m-snav-pill")).not.toBe(null)
  expect(s.get('[aria-label="Menüyü göster"]')).not.toBe(null)
  await s.click("Hap")
  await s.click("Menü düğmesi")
  expect(s.get(".m-snav-pill")).toBe(null)
  expect(s.get('[aria-label="Menüyü göster"]')).toBe(null)
})
