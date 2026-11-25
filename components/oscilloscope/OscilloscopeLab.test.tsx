import { test, expect, renderTest } from "march/testing"
import { OscilloscopeLab } from "./OscilloscopeLab.tsx"

// OscilloscopeLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ekran bir resim; kaynak yokken 'sinyal yok' der", () => {
  const s = renderTest(() => <OscilloscopeLab />)
  const empty = s.get(".lab-empty")!
  expect(empty.getAttribute("role")).toBe("img")
  expect(empty.getAttribute("aria-label")).toContain("Boş ekran")
  expect(empty.querySelector(".m-osc-grid")).toBeFalsy()
  expect(empty.querySelector(".m-osc-idle")).toBeFalsy()
})

test("demo başlamadan iki ekran boşta; kendi bekleme metni görünür", () => {
  const s = renderTest(() => <OscilloscopeLab />)
  expect(s.get(".lab-wave")!.classList.contains("is-idle")).toBeTruthy()
  expect(s.get(".lab-crt")!.classList.contains("m-osc-crt")).toBeTruthy()
  expect(s.get(".lab-crt .m-osc-idle")!.textContent).toBe("Demo bekleniyor")
})

test("sayı kaynağı hemen çalışır: renk ve ızgara bölmeleri", () => {
  const s = renderTest(() => <OscilloscopeLab />)
  const cpu = s.get(".lab-cpu")!
  expect(cpu.classList.contains("is-idle")).toBeFalsy()
  expect(cpu.getAttribute("data-m-color")).toBe("brand-blue")
  expect((cpu as HTMLElement).style.getPropertyValue("--m-osc-gx")).toBe("6")
})
