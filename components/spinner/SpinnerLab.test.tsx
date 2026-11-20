import { test, expect, renderTest } from "march/testing"
import { SpinnerLab } from "./SpinnerLab.tsx"

// SpinnerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("halka role=status ve adıyla okunur", () => {
  const s = renderTest(() => <SpinnerLab />)
  const sp = s.find("Boyut lg")
  expect(sp?.getAttribute("role")).toBe("status")
})

test("decorative halka yardımcı teknolojiden gizli, rolü yok", () => {
  const s = renderTest(() => <SpinnerLab />)
  const em = s.get(".lab-em")
  expect(em?.getAttribute("aria-hidden")).toBe("true")
  expect(em?.hasAttribute("role")).toBe(false)
})

test("renk listesi custom, color tek renk", () => {
  const s = renderTest(() => <SpinnerLab />)
  expect(s.get(".lab-pair")?.getAttribute("data-m-colors")).toBe("custom")
  expect(s.get(".lab-orange")?.getAttribute("data-m-color")).toBe("brand-orange")
})

test("label erişimcisi canlı", async () => {
  const s = renderTest(() => <SpinnerLab />)
  expect(s.get(".lab-count")?.getAttribute("aria-label")).toBe("3 dosya kaldı")
  await s.click("Bir dosya bitti")
  expect(s.get(".lab-count")?.getAttribute("aria-label")).toBe("2 dosya kaldı")
})
