import { test, expect, renderTest } from "march/testing"
import { NumberInputLab } from "./NumberInputLab.tsx"

// NumberInputLab'in testleri: kaydedince Testler sekmesinde çalışır
test("yazılan sayı saklanır; alandan çıkınca en büyük değere iner", async () => {
  const s = renderTest(() => <NumberInputLab />)
  const el = await s.type("Adet", "7")
  expect(s.text().includes("Adet: 7 · değişiklik: 1")).toBe(true)
  await s.type("Adet", "25")
  el.dispatchEvent(new Event("blur"))
  await s.flush()
  expect(s.text().includes("Adet: 10")).toBe(true)
  expect((el as HTMLInputElement).value).toBe("10")
})

test("virgüllü ondalık okunur, binlik ayırıcıyla gösterilir", async () => {
  const s = renderTest(() => <NumberInputLab />)
  const el = await s.type("Tutar", "2500,5") as HTMLInputElement
  expect(s.text().includes("Saklanan tutar: 2500.5")).toBe(true)
  el.dispatchEvent(new Event("blur"))
  await s.flush()
  expect(el.value).toBe("2.500,50")
})

test("ölçek: binde 40 yazılınca 0.04 saklanır; başka dil kendi biçimiyle", async () => {
  const s = renderTest(() => <NumberInputLab />)
  await s.type("Binde oran", "40")
  expect(s.text().includes("Saklanan oran: 0.04")).toBe(true)
  expect((s.find("Almanca biçim") as HTMLInputElement).value).toBe("1.234.567,89")
  expect(s.find("Almanca biçim")?.hasAttribute("readonly")).toBe(true)
})

test("boş zorunlu alan geçersiz; yazınca geçerli olur; harf yazmak NaN üretmez", async () => {
  const s = renderTest(() => <NumberInputLab />)
  const el = s.get("#lab-weight") as HTMLInputElement
  expect(el.getAttribute("aria-invalid")).toBe("true")
  expect(el.hasAttribute("required")).toBe(true)
  expect(el.getAttribute("inputmode")).toBe("decimal")
  expect(s.text().includes("ref: input")).toBe(true)
  await s.type("#lab-weight", "72,5")
  expect(s.text().includes("Kilo: 72.5")).toBe(true)
  expect(el.getAttribute("aria-invalid")).toBe(null)
  await s.type("#lab-weight", "yetmiş")
  expect(el.getAttribute("aria-invalid")).toBe("true")
  expect(s.text().includes("Kilo: 72.5")).toBe(true)
  expect(s.find("Kilitli sayı")?.hasAttribute("disabled")).toBe(true)
})
