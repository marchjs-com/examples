import { test, expect, renderTest } from "march/testing"
import { SectionHeadLab } from "./SectionHeadLab.tsx"

// SectionHeadLab'in testleri: kaydedince Testler sekmesinde çalışır
test("üst etiket bir bağlantı; başlık kendi öğesi ve kimliğiyle", () => {
  const s = renderTest(() => <SectionHeadLab />)
  expect(s.get('.lab-head a.m-section-head-eyebrow')?.getAttribute("href")).toBe("#yenilikler")
  const h = s.get(".lab-head h3")!
  expect(h.id).toBe("lab-head-title")
  expect(h.textContent).toBe("Ekibinle birlikte üret (0)")
})

test("ilk eylem sayar; kendi düğümü ve not görünür", async () => {
  const s = renderTest(() => <SectionHeadLab />)
  await s.click("Beğen")
  expect(s.find("Ekibinle birlikte üret (1)")).not.toBe(null)
  expect(s.get(".lab-head .lab-own-action")?.getAttribute("href")).toBe("#iletisim")
  expect(s.text()).toContain("14 gün ücretsiz · kart gerekmez")
  expect(s.find("2.400 ekip kullanıyor")).not.toBe(null)
})

test("ölçek ve hiza sınıfları izler", async () => {
  const s = renderTest(() => <SectionHeadLab />)
  await s.click("xl")
  expect(s.get(".lab-head")?.classList.contains("m-section-head-xl")).toBe(true)
  await s.click("son")
  expect(s.get(".lab-head")?.classList.contains("m-section-head-end")).toBe(true)
})

test("tam genişlik ve h1", async () => {
  const s = renderTest(() => <SectionHeadLab />)
  await s.click("Tam genişlik")
  expect(s.get(".lab-head")?.classList.contains("m-section-head-full")).toBe(true)
  await s.click("Sayfa başlığı (h1)")
  expect(s.get(".lab-head h1")).not.toBe(null)
})
