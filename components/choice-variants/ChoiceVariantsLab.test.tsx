import { test, expect, renderTest } from "march/testing"
import { ChoiceVariantsLab } from "./ChoiceVariantsLab.tsx"

// ChoiceVariantsLab'in testleri: kaydedince Testler sekmesinde çalışır
test("beş görünüm aynı değeri paylaşır; birinde seçmek hepsini değiştirir", async () => {
  const s = renderTest(() => <ChoiceVariantsLab />)
  await s.click(s.get(".lab-chip")!.querySelectorAll("input, [role=checkbox]")[1] as Element)
  expect(s.sees("Günler: mon, tue")).toBe(true)
})

test("kapalı seçenek seçilemez", () => {
  const s = renderTest(() => <ChoiceVariantsLab />)
  const wed = s.get(".lab-classic")!.querySelectorAll("input")[2] as HTMLInputElement
  expect(wed.disabled).toBe(true)
})

test("radyo tek değer seçer", async () => {
  const s = renderTest(() => <ChoiceVariantsLab />)
  await s.click(s.get(".lab-radio")!.querySelectorAll("input, [role=radio]")[3] as Element)
  expect(s.sees("tek: thu")).toBe(true)
})

test("kısmi kutu indeterminate işaretlidir", () => {
  const s = renderTest(() => <ChoiceVariantsLab />)
  const box = s.get(".lab-partial input, input.lab-partial") as HTMLInputElement | null
  expect(!!box && box.indeterminate).toBe(true)
})
