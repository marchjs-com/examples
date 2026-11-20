import { test, expect, renderTest } from "march/testing"
import { LogoCloudLab } from "./LogoCloudLab.tsx"

// LogoCloudLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ızgarada dört hücre, başlık ve tek ton", () => {
  const s = renderTest(() => <LogoCloudLab />)
  expect(s.all(".lab-logos .m-logos-cell").length).toBe(4)
  expect(s.get(".m-logos-title")?.textContent).toBe("Bize güvenen 4 ekip")
  expect(s.get(".lab-logos")?.classList.contains("is-mono")).toBe(true)
})

test("resimli logonun alt metni, bağlantılı logonun adı var", () => {
  const s = renderTest(() => <LogoCloudLab />)
  expect(s.get('.lab-logos img[alt="Dalga"]')).not.toBe(null)
  expect(s.get('.lab-logos a[href="#turuncu"]')?.getAttribute("aria-label")).toBe("Turuncu")
})

test("başlık bir işlev: düğmeyle değişir", async () => {
  const s = renderTest(() => <LogoCloudLab />)
  await s.click("Ekip ekle")
  expect(s.get(".m-logos-title")?.textContent).toBe("Bize güvenen 5 ekip")
})

test("marquee'ye geçince şerit gelir; tek ton kapanır", async () => {
  const s = renderTest(() => <LogoCloudLab />)
  await s.click("marquee")
  await s.click("Tek ton")
  expect(s.get(".lab-logos .m-logos-marquee")).not.toBe(null)
  expect(s.get(".lab-logos")?.classList.contains("is-mono")).toBe(false)
})
