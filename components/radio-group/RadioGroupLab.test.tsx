import { test, expect, renderTest } from "march/testing"
import { RadioGroupLab } from "./RadioGroupLab.tsx"

// RadioGroupLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir bedene basınca değer o olur, öncekinin seçimi kalkar", async () => {
  const s = renderTest(() => <RadioGroupLab />)
  await s.click("XL")
  expect(s.text().includes("Seçili: XL")).toBe(true)
  const radios = s.all('[aria-label="Beden"] input[type=radio]') as HTMLInputElement[]
  expect(radios.filter((r) => r.checked).length).toBe(1)
  expect(radios[4]?.checked).toBe(true)
})

test("kart görünümü onChange'i çağırır; kapalı seçenek seçilemez", async () => {
  const s = renderTest(() => <RadioGroupLab />)
  await s.click("Ücretsiz")
  expect(s.text().includes("Plan: free · 1 değişiklik")).toBe(true)
  const radios = s.all('[aria-label="Plan"] input[type=radio]') as HTMLInputElement[]
  expect(radios[2]?.disabled).toBe(true)
})

test("grup role=radiogroup; id ilk düğmeye, name hepsine", () => {
  const s = renderTest(() => <RadioGroupLab />)
  expect(s.get('[aria-label="Beden"]')?.getAttribute("role")).toBe("radiogroup")
  expect(s.get("#lab-size")?.getAttribute("type")).toBe("radio")
  const names = s.all('[aria-label="Beden"] input').map((i: Element) => i.getAttribute("name"))
  expect(names).toEqual(["size", "size", "size", "size", "size"])
})

test("invalid, labelledby, describedby; disabled ve readonly düğmeleri kilitler", () => {
  const s = renderTest(() => <RadioGroupLab />)
  const invoice = s.get(".lab-invoice")
  expect(invoice?.getAttribute("aria-invalid")).toBe("true")
  expect(invoice?.getAttribute("aria-labelledby")).toBe("lab-invoice-title")
  expect(invoice?.getAttribute("aria-describedby")).toBe("lab-invoice-error")
  for (const name of ["Devre dışı grup", "Salt okunur grup"])
    expect(s.all(`[aria-label="${name}"] input`).every((i: Element) => (i as HTMLInputElement).disabled)).toBe(true)
})
