import { test, expect, renderTest } from "march/testing"
import { StepperLab } from "./StepperLab.tsx"

// StepperLab'in testleri: kaydedince Testler sekmesinde çalışır
test("labels: kendi düğme metinleri, panelin adı ve sayaç", () => {
  const s = renderTest(() => <StepperLab />)
  // ilk adımda Önceki kapalı, Devam açık
  expect((s.find("Önceki")?.closest("button") as HTMLButtonElement | null)?.disabled).toBe(true)
  expect((s.find("Devam")?.closest("button") as HTMLButtonElement | null)?.disabled).toBe(false)
  expect(s.get(".lab-main .m-stepper-frame")?.getAttribute("aria-label")).toBe("Aşama 1 / 3")
  expect(s.get(".lab-main .m-stepper-count")?.textContent).toBe("1. adım, toplam 3")
})

test("Devam bir sonraki adıma geçer; son adımda düğme Bitir olur ve onFinish çalışır", async () => {
  const s = renderTest(() => <StepperLab />)
  await s.click("Morph kapat")
  await s.click("Devam")
  expect(s.get('.lab-main [aria-current="step"] .m-step2-title')?.textContent).toBe("Doğrula")
  expect(s.get(".lab-main .m-stepper-pane")?.textContent).toBe("Gelen kodu gir.")
  await s.click("Devam")
  await s.click("Bitir")
  expect(s.find("Bitirme sayısı: 1")).not.toBe(null)
})

test("highlight, counter ve nav kapalı; renderDot ve çizgisiz Steps", async () => {
  const s = renderTest(() => <StepperLab />)
  expect(s.get(".lab-bare .m-stepper-blob")).toBe(null)
  expect(s.get(".lab-bare .m-stepper-nav")).toBe(null)
  expect(s.get(".lab-main .m-stepper-blob")).not.toBe(null)
  expect(s.get(".lab-bare .m-steps2")?.getAttribute("class")).toContain("m-steps2-bare")
  await s.click("Başla")
  expect(s.all(".lab-bare .m-step2-dot").map((d: Element) => d.textContent)).toEqual(["✓", "✓", "C"])
})

test("vertical canlı: aynı stepper döner", async () => {
  const s = renderTest(() => <StepperLab />)
  const main = s.get(".lab-main")
  await s.click("Dikey yap")
  expect(s.get(".lab-main")).toBe(main)
  expect(main?.getAttribute("class")).toContain("m-stepper-v")
})
