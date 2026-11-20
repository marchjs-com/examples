import { test, expect, renderTest } from "march/testing"
import { BreadcrumbsLab } from "./BreadcrumbsLab.tsx"

// BreadcrumbsLab'in testleri: kaydedince Testler sekmesinde çalışır
test("nav adı, sınıfı ve rengi taşır; son parça geçerli sayfadır; ayraç kendi metnin", () => {
  const s = renderTest(() => <BreadcrumbsLab />)
  const nav = s.get(".lab-bc")
  expect(nav?.tagName).toBe("NAV")
  expect(nav?.getAttribute("aria-label")).toBe("Belge yolu")
  expect(nav?.getAttribute("data-m-color")).toBe("brand-blue")
  expect(s.get(".lab-bc .is-current")?.textContent).toBe("Özet")
  expect(s.get(".lab-bc .m-bc-sep")?.textContent).toBe("/")
})

test("onSelect'li parça bir düğmedir; separator={false} ayraçsız, bir ikon da ayraç olur", async () => {
  const s = renderTest(() => <BreadcrumbsLab />)
  await s.click("Bölüm")
  expect(s.sees("Bölüm ve Belgeler 1 kez açıldı")).toBe(true)
  expect(s.all(".lab-bc2 .m-bc-sep").length).toBe(0)
  expect(s.get(".lab-bc3 .m-bc-sep svg")).not.toBe(null)
})

test("kardeş menüsü goTo adıyla açılır; bir kardeşe basınca dosya değişir", async () => {
  const s = renderTest(() => <BreadcrumbsLab />)
  await s.click("rapor.md yanındakiler")
  await s.click("notlar.md")
  expect(s.sees("açık dosya: notlar.md")).toBe(true)
  expect(s.find("notlar.md yanındakiler")).not.toBe(null)
})

test("ortadaki parçaların … menüsü kendi adını ve içeriğini taşır (sığmayınca görünür)", () => {
  const s = renderTest(() => <BreadcrumbsLab />)
  const more = s.get(".lab-bc .m-bc-more button")
  expect(more?.getAttribute("aria-label")).toBe("Aradaki klasörler")
  expect(more?.textContent).toBe("···")
})
