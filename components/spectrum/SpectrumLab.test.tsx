import { test, expect, renderTest } from "march/testing"
import { SpectrumLab } from "./SpectrumLab.tsx"

// SpectrumLab'in testleri: kaydedince Testler sekmesinde çalışır
test("spektrum bir resim; kaynak yokken 'sinyal yok' der", () => {
  const s = renderTest(() => <SpectrumLab />)
  const empty = s.get(".lab-empty")!
  expect(empty.getAttribute("role")).toBe("img")
  expect(empty.getAttribute("aria-label")).toContain("Boş")
  expect(empty.querySelector(".m-spec-idle")).toBeFalsy()
})

test("görünümler ve renkler: ayna HADİ renkleri, halka kendi listesi", () => {
  const s = renderTest(() => <SpectrumLab />)
  expect(s.get(".lab-mirror")!.classList.contains("m-spec-mirror")).toBeTruthy()
  expect(s.get(".lab-mirror")!.getAttribute("data-m-colors")).toBe("brand")
  expect(s.get(".lab-circle")!.getAttribute("data-m-colors")).toBe("custom")
  expect(s.get(".lab-circle .m-spec-idle")!.textContent).toBe("Demo bekleniyor")
})

test("sayı kaynağı hemen çalışır; demo başlamadan boşta", () => {
  const s = renderTest(() => <SpectrumLab />)
  expect(s.get(".lab-tone")!.classList.contains("is-idle")).toBeFalsy()
  expect(s.get(".lab-tone")!.getAttribute("data-m-color")).toBe("success")
  expect(s.get(".lab-bars")!.classList.contains("is-idle")).toBeTruthy()
})
