import { test, expect, renderTest } from "march/testing"
import { LiveStatusLab } from "./LiveStatusLab.tsx"

// LiveStatusLab'in testleri: kaydedince Testler sekmesinde çalışır
test("durum satırı role=status, kibar; class ve öznitelikler köke gider", () => {
  const s = renderTest(() => <LiveStatusLab />)
  const st = s.get(".lab-count")
  expect(st?.getAttribute("role")).toBe("status")
  expect(st?.getAttribute("aria-live")).toBe("polite")
  expect(st?.getAttribute("data-kind")).toBe("sayaç")
})

test("text erişimcisi düğmeyle güncellenir", async () => {
  const s = renderTest(() => <LiveStatusLab />)
  await s.click("Bir tane ekle")
  await s.click("Bir tane ekle")
  expect(s.get(".lab-count")?.textContent).toBe("2 öğe eklendi")
})

test("visible={false} görsel olarak gizler, as öğeyi seçer", () => {
  const s = renderTest(() => <LiveStatusLab />)
  const hidden = s.get(".lab-hidden")
  expect(hidden?.tagName).toBe("P")
  expect(hidden?.classList.contains("m-sr-only")).toBe(true)
  expect(s.find("Children ile söylenen, araya giren durum")?.getAttribute("aria-live")).toBe("assertive")
})

test("help satırı helpId ve helpClass ile durumdan önce gelir", () => {
  const s = renderTest(() => <LiveStatusLab />)
  const help = s.get("#lab-help")
  expect(help?.classList.contains("lab-help")).toBe(true)
  expect(help?.nextElementSibling?.textContent).toBe("Yardım satırı önce gelir")
})
