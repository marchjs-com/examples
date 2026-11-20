import { test, expect, renderTest } from "march/testing"
import { SwatchLab } from "./SwatchLab.tsx"

// SwatchLab'in testleri: kaydedince Testler sekmesinde çalışır
test("tıklanan renk seçilir: aria-pressed ve Seçili metni değişir", async () => {
  const s = renderTest(() => <SwatchLab />)
  expect(s.find("Turuncu")?.getAttribute("aria-pressed")).toBe("true")
  const blue = await s.click("Mavi")
  expect(blue.getAttribute("aria-pressed")).toBe("true")
  expect(s.find("Turuncu")?.getAttribute("aria-pressed")).toBe("false")
  expect(s.text().includes("Seçili: Mavi")).toBe(true)
})

test("devre dışı renk kutusu tıklanamaz", async () => {
  const s = renderTest(() => <SwatchLab />)
  const out = s.find("Tükendi") as HTMLButtonElement
  expect(out.disabled).toBe(true)
  await s.click(out)
  expect(s.text().includes("Seçili: Turuncu")).toBe(true)
})

test("role=radio ile seçili durum aria-checked olarak söylenir", async () => {
  const s = renderTest(() => <SwatchLab />)
  expect(s.find("Beden M")?.getAttribute("aria-checked")).toBe("true")
  await s.click("Beden L")
  expect(s.find("Beden L")?.getAttribute("aria-checked")).toBe("true")
  expect(s.find("Beden M")?.getAttribute("aria-checked")).toBe("false")
  expect(s.text().includes("Beden: L")).toBe(true)
})

test("resim, süs ve öznitelikler: label → role img, belirteç → data-m-color", () => {
  const s = renderTest(() => <SwatchLab />)
  expect(s.find("Gradyan")?.getAttribute("role")).toBe("img")
  expect(s.find("Tema belirteci")?.getAttribute("data-m-color")).toBe("brand-green")
  const own = s.get("#lab-swatch")
  expect(own?.classList.contains("lab-swatch")).toBe(true)
  expect(own?.getAttribute("title")).toBe("Kendi ipucum")
  expect(own?.getAttribute("data-code")).toBe("F2801F")
  expect(s.all("span.m-sample[aria-hidden=true]").length).toBe(1)
})
