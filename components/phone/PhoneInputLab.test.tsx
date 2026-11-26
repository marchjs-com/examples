// Tests for PhoneInputLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PhoneInputLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(name) looks up an element by its accessible name (null when missing), s.get(selector) uses a CSS selector,
//   s.text() is all visible text, and s.type(nameOrSelector, text) types into a field like a user and waits until the view
//   has updated, which is why the tests that type are async and await it.
// - The tests check what a user or a screen reader can observe (the stored value the Lab prints, aria and input attributes)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name, the text you type or the expected value.
import { test, expect, renderTest } from "march/testing"
import { PhoneInputLab } from "./PhoneInputLab.tsx"

// With country="+90" a national number is stored with its calling code: the leading 0, the spaces and the dashes are
// dropped, so "0532 111-22-33" becomes "+905321112233". The code is also visible as the field's prefix.
test("ulusal numara ülke koduyla saklanır: baştaki 0, boşluk ve tireler gider", async () => {
  const s = renderTest(() => <PhoneInputLab />)
  await s.type("Türkiye numarası", "0532 111-22-33")
  expect(s.text().includes("Saklanan: +905321112233 · değişiklik: 1")).toBe(true)
  expect(s.text().includes("+90")).toBe(true)
})

// Without a country, "00" at the start means "+" (the international prefix), and a typed "+" is kept. Punctuation is
// removed in both cases.
test("ülke kodu yokken 00 + olur, + korunur", async () => {
  const s = renderTest(() => <PhoneInputLab />)
  await s.type("Uluslararası numara", "0049 151 2345 6789")
  expect(s.text().includes("Uluslararası: +4915123456789")).toBe(true)
  await s.type("Uluslararası numara", "+44 (20) 7946 0000")
  expect(s.text().includes("Uluslararası: +442079460000")).toBe(true)
})

// The form field: it starts valid; the attributes of the props reach the input (type="tel" for the phone keypad, required,
// name, autocomplete, aria-describedby). After typing a short number the field is marked invalid (aria-invalid) and the
// Lab's hint text says so.
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

// prefix and suffix render around the input (an icon and a text, inside the shared affix wrapper); disabled and readonly
// reach the input; for a readonly number the calling code is in the prefix and the field shows only the national part.
test("önek, sonek, devre dışı ve salt okunur", () => {
  const s = renderTest(() => <PhoneInputLab />)
  const pbx = s.find("Santral") as HTMLInputElement
  expect(pbx.closest(".m-affix")?.textContent).toContain("dahili 12")
  expect(pbx.closest(".m-affix")?.querySelector("svg")).not.toBe(null)
  expect(s.find("Kilitli numara")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Salt okunur numara")?.hasAttribute("readonly")).toBe(true)
  // the calling code is in the prefix; the field shows the national part
  expect((s.find("Salt okunur numara") as HTMLInputElement).value).toBe("2079460000")
})
