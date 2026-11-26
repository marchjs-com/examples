// Tests for SliderLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SliderLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(field, value) sets the value of the field (found by its aria-label or a selector) and fires the events a user
//   would; for a range input it moves the slider. It returns the input element and waits until the view has updated, which
//   is why the tests that use it are async and await it.
// - s.get(selector) finds one element (or null) by CSS selector, s.text() is all visible text.
// - The tests check what a user or a screen reader can observe (the value text next to the slider, the attributes of the
//   native input, which attributes mark a state) rather than internal state, so they keep passing when the internals
//   change.
// To adapt them: copy one test, change the aria-label or the expected value. The slider is a native range input with its
// value in an output element next to it.
import { test, expect, renderTest } from "march/testing"
import { SliderLab } from "./SliderLab.tsx"

// Moving the slider changes the bound value and the formatted text in the output element (format turns 40 into the
// percent text). onCommit is called once when the change is finished, which the Lab counts.
test("kaydırınca değer ve format'lı gösterim değişir; bırakınca onCommit", async () => {
  const s = renderTest(() => <SliderLab />)
  const volume = await s.type("Ses", 40)
  expect((volume as HTMLInputElement).value).toBe("40")
  expect(s.text().includes("Ses: 40 · 1 bırakış")).toBe(true)
  expect(volume.parentElement?.querySelector("output")?.textContent).toBe("%40")
})

// min, max and step end up as attributes of the native input; valueText becomes aria-valuetext (what a screen reader
// reads), and it follows the value. onChange runs on the move, which the Lab counts.
test("min, max, step ve valueText input'ta; onChange sayar", async () => {
  const s = renderTest(() => <SliderLab />)
  const temp = s.get('[aria-label="Sıcaklık"]') as HTMLInputElement
  expect([temp.min, temp.max, temp.step]).toEqual(["16", "30", "0.5"])
  expect(temp.getAttribute("aria-valuetext")).toBe("21.5 derece")
  await s.type("Sıcaklık", 24)
  expect(s.text().includes("Termostat: 24 °C · 1 hareket")).toBe(true)
  expect(temp.getAttribute("aria-valuetext")).toBe("24 derece")
})

// showValue={false} leaves no output element; a slider with `track` gets the "own track" class, and its format function is
// still used for the text.
test("showValue={false} değeri kaldırır; track kendi izini çizer", () => {
  const s = renderTest(() => <SliderLab />)
  expect(s.get('[aria-label="Parlaklık"]')?.parentElement?.querySelector("output")).toBe(null)
  const battery = s.get('[aria-label="Pil"]')
  expect(battery?.classList.contains("m-slider-own")).toBe(true)
  expect(battery?.closest(".m-slider-wrap")?.querySelector("output")?.textContent).toBe("yüksek")
})

// States and form props: disabled and readonly both disable the native input; invalid becomes aria-invalid,
// describedby becomes aria-describedby, and id and name land on the input.
test("disabled ve readonly kilitler; invalid, describedby, id, name input'ta", () => {
  const s = renderTest(() => <SliderLab />)
  expect((s.get('[aria-label="Kilitli"]') as HTMLInputElement).disabled).toBe(true)
  expect((s.get('[aria-label="Salt okunur"]') as HTMLInputElement).disabled).toBe(true)
  const budget = s.get('[aria-label="Bütçe"]')
  expect(budget?.getAttribute("aria-invalid")).toBe("true")
  expect(budget?.getAttribute("aria-describedby")).toBe("lab-budget-error")
  expect(s.get("#lab-volume")?.getAttribute("name")).toBe("volume")
})
