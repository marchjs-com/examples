import { test, expect, renderTest } from "march/testing"
import { GaugeLab } from "./GaugeLab.tsx"

// GaugeLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kadran bir ölçer: en az, en çok, değer ve birim okunur", () => {
  const s = renderTest(() => <GaugeLab />)
  const g = s.get(".lab-speed .m-gauge")!
  expect(g.getAttribute("role")).toBe("meter")
  expect(g.getAttribute("aria-label")).toBe("Hız")
  expect(g.getAttribute("aria-valuemax")).toBe("100")
  expect(g.getAttribute("aria-valuetext")).toBe("40 km/h")
})

test("kırmızı çizgiyi geçince kadran kızarır, onRedline ve onPeak haber verir", async () => {
  const s = renderTest(() => <GaugeLab />)
  await s.click(".lab-up")
  await s.click(".lab-up")
  expect(s.get(".lab-speed .m-gauge")!.getAttribute("class")).toContain("is-redline")
  expect(s.sees("Kırmızıda: evet")).toBe(true)
  expect(s.sees("Yeni tepe: 2")).toBe(true)
})

test("devir göstergesi ×1000 etiketli ve çarklı; VU kadranı dB ölçeğinde", () => {
  const s = renderTest(() => <GaugeLab />)
  const labels = s.all(".lab-tach .m-gauge-label").map((x) => x.textContent)
  expect(labels).toContain("8")
  expect(s.get(".lab-tach .m-odo")).toBeTruthy()
  expect(s.get(".lab-vu .m-gauge-caption")!.textContent).toBe("VU")
  expect(s.get(".lab-vu .m-gauge")!.getAttribute("aria-valuemin")).toBe("-20")
})

test("kendi göstergesi ve kapalı parçalar", () => {
  const s = renderTest(() => <GaugeLab />)
  expect(s.get(".lab-own b")!.textContent).toBe("40 puan")
  expect(s.get(".lab-own .m-gauge-ticks")).toBeFalsy()
  expect(s.get(".lab-bare .m-gauge")!.getAttribute("class")).toContain("m-gauge-bare")
  expect(s.get(".lab-bare .m-gauge-readout")).toBeFalsy()
})
