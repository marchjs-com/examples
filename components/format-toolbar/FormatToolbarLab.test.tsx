import { test, expect, renderTest } from "march/testing"
import { FormatToolbarLab } from "./FormatToolbarLab.tsx"

// FormatToolbarLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Kalın'a basınca basılı olur, adı ve çubuğun adı canlı değişir", async () => {
  const s = renderTest(() => <FormatToolbarLab />)
  const b = await s.click("Kalın: kapalı")
  expect(b.getAttribute("aria-pressed")).toBe("true")
  expect(b.getAttribute("aria-label")).toBe("Kalın: açık")
  expect(s.find("Biçim (1)")?.getAttribute("role")).toBe("toolbar")
  expect(s.sees("Son araç: bold")).toBe(true)
})

test("name işlevi, keys, attrs ve prefix bağlantı düğmesine yazılır", () => {
  const s = renderTest(() => <FormatToolbarLab />)
  const link = s.find("Bağlantı ekle")
  expect(link?.getAttribute("aria-keyshortcuts")).toBe("Control+L")
  expect(link?.getAttribute("aria-haspopup")).toBe("dialog")
  expect(link?.className).toContain("lab-tool")
  expect(link?.className).toContain("lab-link")
  expect(s.get(".lab-bar")?.className).toContain("lab-toolbar")
})

test("redo tek başına, ikinci çubuk tümüyle devre dışı", () => {
  const s = renderTest(() => <FormatToolbarLab />)
  expect(s.get(".lab-bar")?.querySelectorAll("button[disabled]").length).toBe(1)
  const off = s.find("Kapalı çubuk")?.querySelectorAll("button") ?? []
  expect([...off].every((b) => b.hasAttribute("disabled"))).toBe(true)
})

test("Büyük çubuğun ipucunda kısayol var; Küçült onu kaldırır", async () => {
  const s = renderTest(() => <FormatToolbarLab />)
  expect(s.find("Eğik")?.getAttribute("title")).not.toBe("Eğik")
  await s.click("Küçült")
  expect(s.find("Eğik")?.getAttribute("title")).toBe("Eğik")
})
