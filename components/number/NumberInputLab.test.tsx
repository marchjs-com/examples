// Tests for NumberInputLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <NumberInputLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(nameOrSelector, text) types into a field (by accessible name or CSS selector) and returns the input element;
//   s.find(name) finds an element by its accessible name; s.get(selector) uses a CSS selector; s.text() is all visible
//   text; s.flush() waits until the view has updated. Anything that awaits is why those tests are async.
// - A blur event is sent by hand (dispatchEvent) because min / max clamping and reformatting happen when a field is
//   left, and typing alone does not leave it.
// - The tests check what a user or a screen reader can observe (visible text, the field's text, aria attributes)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { NumberInputLab } from "./NumberInputLab.tsx"

// Typing 7 stores 7 and onChange fires once. Typing 25 is above max={10}: the stored value follows the text while
// typing, but when the field is left it is clamped to the maximum, both in the stored value and in the field's text.
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

// With locale tr-TR a comma is the decimal mark: "2500,5" is read as 2500.5 (the stored value is a plain number).
// After blur the field is shown formatted: thousands dots, two decimals.
test("virgüllü ondalık okunur, binlik ayırıcıyla gösterilir", async () => {
  const s = renderTest(() => <NumberInputLab />)
  const el = await s.type("Tutar", "2500,5") as HTMLInputElement
  expect(s.text().includes("Saklanan tutar: 2500.5")).toBe(true)
  el.dispatchEvent(new Event("blur"))
  await s.flush()
  expect(el.value).toBe("2.500,50")
})

// scale={1000}: the field shows per-mille, the stored value is the ratio (40 shown gives 0.04). The German field checks
// that another locale writes the same number its own way, and that readonly reaches the input.
test("ölçek: binde 40 yazılınca 0.04 saklanır; başka dil kendi biçimiyle", async () => {
  const s = renderTest(() => <NumberInputLab />)
  await s.type("Binde oran", "40")
  expect(s.text().includes("Saklanan oran: 0.04")).toBe(true)
  expect((s.find("Almanca biçim") as HTMLInputElement).value).toBe("1.234.567,89")
  expect(s.find("Almanca biçim")?.hasAttribute("readonly")).toBe(true)
})

// The form field: an empty required field is marked invalid, and the attributes of the props reach the input
// (required, inputmode, the ref callback ran). A valid number clears the invalid mark; text that is not a number never
// becomes NaN: the field is marked invalid again and the stored value stays the last good one. The last line checks
// that `disabled` reaches the locked input.
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
