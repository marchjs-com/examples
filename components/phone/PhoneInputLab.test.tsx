import { test, expect, renderTest } from "march/testing"
import { PhoneInputLab } from "./PhoneInputLab.tsx"

// PhoneInputLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ulusal numara ülke koduyla saklanır: baştaki 0, boşluk ve tireler gider", async () => {
  const s = renderTest(() => <PhoneInputLab />)
  await s.type("Türkiye numarası", "0532 111-22-33")
  expect(s.text().includes("Saklanan: +905321112233 · değişiklik: 1")).toBe(true)
  expect(s.text().includes("+90")).toBe(true)
})

test("ülke kodu yokken 00 + olur, + korunur", async () => {
  const s = renderTest(() => <PhoneInputLab />)
  await s.type("Uluslararası numara", "0049 151 2345 6789")
  expect(s.text().includes("Uluslararası: +4915123456789")).toBe(true)
  await s.type("Uluslararası numara", "+44 (20) 7946 0000")
  expect(s.text().includes("Uluslararası: +442079460000")).toBe(true)
})

test("eksik numara geçersiz; form öznitelikleri yerinde", async () => {
  const s = renderTest(() => <PhoneInputLab />)
  const el = s.get("#lab-office-phone") as HTMLInputElement
  expect(el.getAttribute("aria-invalid")).toBe(null)
  expect(el.getAttribute("type")).toBe("tel")
  expect(el.hasAttribute("required")).toBe(true)
  expect(el.getAttribute("name")).toBe("office-phone")
  expect(el.getAttribute("autocomplete")).toBe("tel-national")
  expect(el.getAttribute("aria-describedby")).toBe("lab-phone-hint")
  await s.type("#lab-office-phone", "212 555")
  expect(el.getAttribute("aria-invalid")).toBe("true")
  expect(s.text().includes("Numara eksik")).toBe(true)
})

test("önek, sonek, devre dışı ve salt okunur", () => {
  const s = renderTest(() => <PhoneInputLab />)
  const pbx = s.find("Santral") as HTMLInputElement
  expect(pbx.closest(".m-affix")?.textContent).toContain("dahili 12")
  expect(pbx.closest(".m-affix")?.querySelector("svg")).not.toBe(null)
  expect(s.find("Kilitli numara")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Salt okunur numara")?.hasAttribute("readonly")).toBe(true)
  // ülke kodu önekte; alan ulusal kısmı gösterir
  expect((s.find("Salt okunur numara") as HTMLInputElement).value).toBe("2079460000")
})
