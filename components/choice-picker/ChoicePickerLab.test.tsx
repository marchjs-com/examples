import { test, expect, renderTest } from "march/testing"
import { ChoicePickerLab } from "./ChoicePickerLab.tsx"

// ChoicePickerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("görünümü seçenek sayısından kendisi seçer: 3 → segmented, 8 → chip, 12 → combobox", () => {
  const s = renderTest(() => <ChoicePickerLab />)
  expect(s.get(".auto-segmented .m-segmented") !== null).toBe(true)
  expect(s.get(".auto-chips .m-picker-chips") !== null).toBe(true)
  expect(s.get(".auto-combobox input[role=combobox]") !== null).toBe(true)
})

test("segment'e basınca değer, onChange ve aria-checked değişir", async () => {
  const s = renderTest(() => <ChoicePickerLab />)
  const month = s.get(".auto-segmented [role=radio]:last-child") as HTMLElement
  await s.click(month)
  expect(month.getAttribute("aria-checked")).toBe("true")
  expect(s.text().includes("Dönem: Ay · değişiklik: 1")).toBe(true)
})

test("chip'e basınca aynı değeri paylaşan combobox da yeni şehri gösterir", async () => {
  const s = renderTest(() => <ChoicePickerLab />)
  await s.click("Trabzon")
  expect(s.text().includes("Şehir: Trabzon")).toBe(true)
  expect((s.get(".auto-combobox input") as HTMLInputElement).value).toBe("Trabzon")
})

test("devre dışı ve salt okunur seçenekler kilitli; geçersiz grup aria-invalid taşır", () => {
  const s = renderTest(() => <ChoicePickerLab />)
  const off = s.find("Kapalı") as Element
  expect(off.querySelectorAll("button:disabled").length).toBe(2)
  const locked = s.find("Kilitli") as Element
  expect(locked.querySelectorAll("button:disabled").length).toBe(2)
  expect(s.find("Hatalı")?.getAttribute("aria-invalid")).toBe("true")
})
