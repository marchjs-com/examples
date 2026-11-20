import { test, expect, renderTest } from "march/testing"
import { SiteSectionLab } from "./SiteSectionLab.tsx"

// SiteSectionLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bölüm başlığıyla adlandırılmış; kimlik ve ek öznitelikler geçer", () => {
  const s = renderTest(() => <SiteSectionLab />)
  const sec = s.get("section.lab-ss")!
  const h = sec.querySelector("h2")!
  expect(sec.getAttribute("aria-labelledby")).toBe(h.id)
  expect(sec.getAttribute("id")).toBe("ozellikler")
  expect(sec.getAttribute("data-section")).toBe("features")
  expect(sec.getAttribute("aria-describedby")).toBe("lab-ss-note")
})

test("ton ve genişlik sınıfları değişir", async () => {
  const s = renderTest(() => <SiteSectionLab />)
  expect(s.get(".lab-ss")?.classList.contains("m-ss-muted")).toBe(true)
  await s.click("inverse")
  expect(s.get(".lab-ss")?.classList.contains("m-ss-inverse")).toBe(true)
  await s.click("Geniş")
  expect(s.get(".lab-ss")?.classList.contains("m-ss-w-wide")).toBe(true)
})

test("üçüncü düzey başlık", async () => {
  const s = renderTest(() => <SiteSectionLab />)
  await s.click("Üçüncü düzey")
  expect(s.get(".lab-ss h3")?.textContent).toBe("Her şey tek yerde (0)")
})

test("içerik çizilir; başlık bir sinyali izler", async () => {
  const s = renderTest(() => <SiteSectionLab />)
  expect(s.find("Bölümün içeriği burada.")).not.toBe(null)
  await s.click("Uğradım")
  expect(s.find("Her şey tek yerde (1)")).not.toBe(null)
})
