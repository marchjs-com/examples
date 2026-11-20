import { test, expect, renderTest } from "march/testing"
import { ButtonGroupLab } from "./ButtonGroupLab.tsx"

// ButtonGroupLab'in testleri: kaydedince Testler sekmesinde çalışır
test("grup role=group ve label'ı erişilebilir ad olarak taşır", () => {
  const s = renderTest(() => <ButtonGroupLab />)
  const g = s.find("Geçmiş")
  expect(g?.getAttribute("role")).toBe("group")
  expect(g?.className.includes("m-btn-group")).toBe(true)
  expect(g?.className.includes("m-btn-group-attached")).toBe(false)
})

test("attached bitişik şerit yapar, class gruba eklenir", () => {
  const s = renderTest(() => <ButtonGroupLab />)
  const g = s.get(".lab-marks")
  expect(g?.className.includes("m-btn-group-attached")).toBe(true)
  expect(g?.querySelectorAll("button").length).toBe(3)
})

test("canlı label: bir biçim seçilince grubun adı değişir", async () => {
  const s = renderTest(() => <ButtonGroupLab />)
  expect(s.get(".lab-marks")?.getAttribute("aria-label")).toBe("Biçim: Kalın")
  const italic = await s.click("Eğik")
  expect(italic.getAttribute("aria-pressed")).toBe("true")
  expect(s.get(".lab-marks")?.getAttribute("aria-label")).toBe("Biçim: Kalın, Eğik")
})

test("m:color gruba renk kapsamı verir; düğme sayacı artar", async () => {
  const s = renderTest(() => <ButtonGroupLab />)
  expect(s.find("Kaydet")?.getAttribute("data-m-color")).toBe("brand-purple")
  await s.click("Kaydet (0)")
  expect(s.find("Kaydet (1)")).not.toBe(null)
})
