import { test, expect, renderTest } from "march/testing"
import { SiteFooterLab } from "./SiteFooterLab.tsx"

// SiteFooterLab'in testleri: kaydedince Testler sekmesinde çalışır
test("sütunlar başlıklarıyla adlandırılmış birer nav", () => {
  const s = renderTest(() => <SiteFooterLab />)
  const navs = s.all(".lab-footer nav.m-sfoot-col")
  expect(navs.length).toBe(2)
  expect(navs[0]!.getAttribute("aria-label")).toBe("Ürün")
  expect(s.container.querySelector('a[href="#kariyer"]')?.textContent).toBe("Kariyer")
})

test("telif satırı kendi metniyle; anahtar kapatınca gider", async () => {
  const s = renderTest(() => <SiteFooterLab />)
  expect(s.get(".m-sfoot-copy")?.textContent).toBe("© Atölye · İstanbul")
  await s.click("Telif satırı")
  expect(s.container.querySelector(".m-sfoot-copy")).toBe(null)
})

test("başa dön düğmesinin adı değişti; kendi markam düğümü gösterir", async () => {
  const s = renderTest(() => <SiteFooterLab />)
  expect(s.find("Yukarı çık")).not.toBe(null)
  await s.click("Başa dön")
  expect(s.container.querySelector(".m-sfoot-top-btn")).toBe(null)
  await s.click("Kendi markam")
  expect(s.container.querySelector(".lab-own-brand")).not.toBe(null)
})

test("bültene abone olunca teşekkür ve sayaç artar", async () => {
  const s = renderTest(() => <SiteFooterLab />)
  await s.type("E-posta adresin", "ayse@ornek.com")
  await s.click("Abone ol")
  await s.wait(() => s.sees("Teşekkürler, görüşürüz!"))
  expect(s.text()).toContain("1 abone")
})
