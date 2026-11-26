// Tests for PixelFontLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PixelFontLab />) mounts the Lab; s.get(selector) finds a screen by its class; s.sees(text) looks
//   for visible text.
// - The letters are LEDs on a canvas, so the tests check the spoken name (the text itself) and the screen's width in
//   LEDs, which comes from the text.
import { test, expect, renderTest } from "march/testing"
import { PixelFontLab } from "./PixelFontLab.tsx"

// A screen reader hears the text itself; a label replaces it.
test("ekran okuyucu metnin kendisini duyar; label onun yerine geçer", () => {
  const s = renderTest(() => <PixelFontLab />)
  expect(s.get(".lab-5x7")?.getAttribute("aria-label")).toBe("ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ")
  expect(s.get(".lab-all")?.getAttribute("aria-label")).toBe("Bakiye 1.250 lira")
})

// The same text is wider in the bolder font; a fixed cols wins over the text's width.
test("8x8 daha geniş; cols sabit genişlik verir", () => {
  const s = renderTest(() => <PixelFontLab />)
  const cols = (sel: string) => Number((s.get(sel) as HTMLElement).style.getPropertyValue("--m-led-cols"))
  expect(cols(".lab-8x8")).toBeGreaterThan(cols(".lab-5x7"))
  expect(cols(".lab-all")).toBe(60)
})

// textWidth reports the width in LEDs, and wrapText gives lines that fit.
test("yardımcılar: genişlik ve satırlara bölme", () => {
  const s = renderTest(() => <PixelFontLab />)
  expect(s.sees("\"HADİ\" genişliği: 21 LED")).toBe(true)
  expect(s.get(".lab-help")!.querySelectorAll(".m-led").length).toBeGreaterThan(1)
})
