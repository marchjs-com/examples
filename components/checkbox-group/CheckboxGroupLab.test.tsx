import { test, expect, renderTest } from "march/testing"
import { CheckboxGroupLab } from "./CheckboxGroupLab.tsx"

// CheckboxGroupLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir güne basınca değere eklenir, yeniden basınca çıkar", async () => {
  const s = renderTest(() => <CheckboxGroupLab />)
  await s.click("Pzt")
  expect(s.text().includes("Seçili: Sal, Per, Pzt")).toBe(true)
  await s.click("Sal")
  expect(s.text().includes("Seçili: Per, Pzt")).toBe(true)
})

test("kart görünümü onChange'i çağırır; kapalı seçenek seçilemez", async () => {
  const s = renderTest(() => <CheckboxGroupLab />)
  await s.click("Ücretsiz")
  expect(s.text().includes("Planlar: team, free · 1 değişiklik")).toBe(true)
  const boxes = s.all('[aria-label="Planlar"] input[type=checkbox]') as HTMLInputElement[]
  expect(boxes.length).toBe(3)
  expect(boxes[2]?.disabled).toBe(true)
})

test("grup role=group ve aria-label taşır; id ve name ilk kutuya gider", () => {
  const s = renderTest(() => <CheckboxGroupLab />)
  const days = s.get('[aria-label="Günler"]')
  expect(days?.getAttribute("role")).toBe("group")
  const first = s.get("#lab-days") as HTMLInputElement
  expect(first?.getAttribute("name")).toBe("days")
  expect(first?.checked).toBe(false)
})

test("invalid, labelledby, describedby; disabled ve readonly kutuları kilitler", () => {
  const s = renderTest(() => <CheckboxGroupLab />)
  const terms = s.get(".lab-terms")
  expect(terms?.getAttribute("aria-invalid")).toBe("true")
  expect(terms?.getAttribute("aria-labelledby")).toBe("lab-terms-title")
  expect(terms?.getAttribute("aria-describedby")).toBe("lab-terms-error")
  for (const name of ["Devre dışı grup", "Salt okunur grup"])
    expect(s.all(`[aria-label="${name}"] input`).every((i: Element) => (i as HTMLInputElement).disabled)).toBe(true)
})
