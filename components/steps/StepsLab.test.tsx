import { test, expect, renderTest } from "march/testing"
import { StepsLab } from "./StepsLab.tsx"

// StepsLab'in testleri: kaydedince Testler sekmesinde çalışır
test("onSelect ile adımlar düğme; Başla'ya basınca geçerli adım olur", async () => {
  const s = renderTest(() => <StepsLab />)
  expect(s.all(".lab-steps button").length).toBe(3)
  await s.click("Başla")
  expect(s.get('.lab-steps [aria-current="step"] .m-step2-title')?.textContent).toBe("Başla")
  expect(s.find("Seçilen: Başla")).not.toBe(null)
})

test("onSelect yoksa düğme yok; doneIcon={false} numarayı, connector={false} çizgisiz sınıfı verir", () => {
  const s = renderTest(() => <StepsLab />)
  expect(s.all(".lab-numbers button").length).toBe(0)
  expect(s.get(".lab-numbers .m-step2-dot")?.textContent).toBe("1")
  expect(s.get(".lab-numbers")?.getAttribute("class")).toContain("m-steps2-bare")
  expect(s.get(".lab-text .m-step2-dot")?.textContent).toBe("✔")
})

test("renderDot her noktanın içeriğini verir", () => {
  const s = renderTest(() => <StepsLab />)
  expect(s.all(".lab-dots .m-step2-dot").map((d: Element) => d.textContent)).toEqual(["★", "B", "C"])
})

test("İleri hepsini ilerletir; dikey liste kendi sınıfını alır", async () => {
  const s = renderTest(() => <StepsLab />)
  expect(s.get(".lab-vertical")?.getAttribute("class")).toContain("m-steps2-v")
  await s.click("İleri")
  expect(s.get('.lab-vertical [aria-current="step"] .m-step2-title')?.textContent).toBe("Başla")
  expect(s.get(".lab-dots .m-step2-dot")?.textContent).toBe("★")
  expect(s.all(".lab-dots .is-done").length).toBe(2)
})
