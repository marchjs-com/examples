import { test, expect, renderTest } from "march/testing"
import { ToggleLab } from "./ToggleLab.tsx"

// ToggleLab'ın testleri: kaydedince Testler sekmesinde çalışır
// bir etiketin anahtarı: etiketi taşıyan <label>'ın içindeki düğme
const switchOf = (s: ReturnType<typeof renderTest>, text: string) => s.find(text)?.closest("label")?.querySelector("button") as HTMLButtonElement

test("anahtara basınca açılır: role=switch, aria-checked ve yazı değişir", async () => {
  const s = renderTest(() => <ToggleLab />)
  const dark = switchOf(s, "Karanlık mod")
  expect(dark.getAttribute("role")).toBe("switch")
  expect(dark.getAttribute("aria-checked")).toBe("false")
  await s.click(dark)
  expect(dark.getAttribute("aria-checked")).toBe("true")
  expect(s.text().includes("Karanlık: açık")).toBe(true)
})

test("üç durumlu anahtar: ayarlanmamış → açık → kapalı → ayarlanmamış", async () => {
  const s = renderTest(() => <ToggleLab />)
  const pressed = switchOf(s, "Basılı (pressed)")
  expect(pressed.getAttribute("role")).toBe("checkbox")
  expect(pressed.getAttribute("aria-checked")).toBe("mixed")
  await s.click(pressed)
  expect(s.text().includes("Basılı: açık")).toBe(true)
  await s.click(pressed)
  expect(s.text().includes("Basılı: kapalı")).toBe(true)
  await s.click(pressed)
  expect(pressed.getAttribute("aria-checked")).toBe("mixed")
})

test("onChange her değişiklikte çağrılır; children etiketi canlı", async () => {
  const s = renderTest(() => <ToggleLab />)
  await s.click(switchOf(s, "Açık"))
  expect(s.text().includes("1 değişiklik")).toBe(true)
  expect(s.text().includes("Sessiz")).toBe(true)
})

test("disabled ve readonly kilitler; invalid, describedby, id, name, aria-label düğmede", () => {
  const s = renderTest(() => <ToggleLab />)
  expect(switchOf(s, "Devre dışı (açık)").disabled).toBe(true)
  expect(switchOf(s, "Salt okunur").disabled).toBe(true)
  const terms = switchOf(s, "Koşulları kabul ediyorum")
  expect(terms.getAttribute("aria-invalid")).toBe("true")
  expect(terms.getAttribute("aria-describedby")).toBe("lab-terms-error")
  expect(s.get("#lab-dark")?.getAttribute("name")).toBe("dark")
  expect(s.get('[aria-label="Konum paylaşımı"]')?.getAttribute("aria-checked")).toBe("true")
})
