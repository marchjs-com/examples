import { test, expect, renderTest } from "march/testing"
import { ColorInputLab } from "./ColorInputLab.tsx"

// ColorInputLab'in testleri: kaydedince Testler sekmesinde çalışır
test("metin alanına yazılan renk değeri ve bağlı renk kutularını değiştirir", async () => {
  const s = renderTest(() => <ColorInputLab />)
  await s.type("Ana renk", "#1d9ad6")
  expect(s.text().includes("Seçili: #1d9ad6")).toBe(true)
  expect(s.text().includes("Değişiklik: 0")).toBe(false)
  expect((s.find("Yalnız kutu") as HTMLInputElement).value).toBe("#1d9ad6")
  expect((s.find("Yalnız metin") as HTMLInputElement).value).toBe("#1d9ad6")
})

test("yarım bir renk kodu geçersiz sayılır, tamamlanınca düzelir", async () => {
  const s = renderTest(() => <ColorInputLab />)
  const field = await s.type("Ana renk", "#1d9")
  expect(field.getAttribute("aria-invalid")).toBe("true")
  await s.type("Ana renk", "#1d9ad6")
  expect(field.hasAttribute("aria-invalid")).toBe(false)
  expect(field.hasAttribute("required")).toBe(true)
})

test("swatch={false}: yalnız metin alanı; id, name, class ve describedby yerinde", () => {
  const s = renderTest(() => <ColorInputLab />)
  const code = s.get("#lab-code")
  expect(code?.getAttribute("name")).toBe("accentCode")
  expect(code?.getAttribute("aria-describedby")).toBe("lab-hint")
  expect(s.get(".lab-code")).not.toBe(null)
  expect(s.get(".lab-code input[type=color]")).toBe(null)
})

test("salt okunur ve devre dışı renkler değiştirilemez", () => {
  const s = renderTest(() => <ColorInputLab />)
  expect((s.find("Salt okunur renk") as HTMLInputElement).disabled).toBe(true)
  expect((s.find("Salt okunur kod") as HTMLInputElement).readOnly).toBe(true)
  expect((s.find("Kapalı renk") as HTMLInputElement).disabled).toBe(true)
  expect((s.find("Kapalı kod") as HTMLInputElement).disabled).toBe(true)
})
