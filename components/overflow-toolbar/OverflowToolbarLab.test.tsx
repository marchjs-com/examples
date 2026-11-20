import { test, expect, renderTest } from "march/testing"
import { OverflowToolbarLab } from "./OverflowToolbarLab.tsx"

// OverflowToolbarLab'in testleri: kaydedince Testler sekmesinde çalışır
test("araç çubuğu: adı, sınıfı ve rengi kökte; sonda hiç taşmayan içerik", () => {
  const s = renderTest(() => <OverflowToolbarLab />)
  const bar = s.get(".lab-otb")
  expect(bar?.getAttribute("role")).toBe("toolbar")
  expect(bar?.getAttribute("aria-label")).toBe("Yazı araçları")
  expect(bar?.getAttribute("data-m-color")).toBe("brand-purple")
  expect(s.get(".lab-otb .m-otb-end")?.textContent).toBe("Taslak")
})

test("Kaydet onSelect'i çalıştırır; Kalın aç / kapa düğmesidir", async () => {
  const s = renderTest(() => <OverflowToolbarLab />)
  await s.click("Kaydet")
  await s.click("Kaydet")
  expect(s.sees("2 kez kaydedildi")).toBe(true)
  const bold = await s.click("Kalın")
  expect(bold.getAttribute("aria-pressed")).toBe("true")
})

test("disabled öğe basılamaz; danger öğe tehlike tonunda", () => {
  const s = renderTest(() => <OverflowToolbarLab />)
  // find gives the innermost match (the button's label); its button is the one to look at
  expect(s.find("Yinele")?.closest("button")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Sil")?.closest("button")?.classList.contains("is-danger")).toBe(true)
})

test("dar çubukta sığmayanlar kendi adlı Daha fazla menüsüne geçer", async () => {
  const s = renderTest(() => <OverflowToolbarLab />)
  await s.wait(() => !s.get(".lab-narrow .m-otb-more")?.hasAttribute("hidden"))
  const more = s.get(".lab-narrow .m-otb-more button")
  expect(more?.getAttribute("aria-label")).toBe("Diğer araçlar")
  expect(s.all(".lab-narrow .m-otb-item[hidden]").length).toBeGreaterThan(0)
})
