// Tests for RadioGroupLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <RadioGroupLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The radios are native inputs, so the tests read their checked and disabled state directly.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { RadioGroupLab } from "./RadioGroupLab.tsx"

// Pressing an option makes it the value and un-checks the previous one: exactly one radio is checked.
test("bir bedene basınca değer o olur, öncekinin seçimi kalkar", async () => {
  const s = renderTest(() => <RadioGroupLab />)
  await s.click("XL")
  expect(s.text().includes("Seçili: XL")).toBe(true)
  const radios = s.all('[aria-label="Beden"] input[type=radio]') as HTMLInputElement[]
  expect(radios.filter((r) => r.checked).length).toBe(1)
  expect(radios[4]?.checked).toBe(true)
})

//  In the card look, pressing an option calls onChange (the Lab counts it); an option with `disabled` is a disabled
// radio.
test("kart görünümü onChange'i çağırır; kapalı seçenek seçilemez", async () => {
  const s = renderTest(() => <RadioGroupLab />)
  await s.click("Ücretsiz")
  expect(s.text().includes("Plan: free · 1 değişiklik")).toBe(true)
  const radios = s.all('[aria-label="Plan"] input[type=radio]') as HTMLInputElement[]
  expect(radios[2]?.disabled).toBe(true)
})

//  The group has role="radiogroup"; `id` lands on the first radio and `name` on every radio (one name makes them one
// group).
test("grup role=radiogroup; id ilk düğmeye, name hepsine", () => {
  const s = renderTest(() => <RadioGroupLab />)
  expect(s.get('[aria-label="Beden"]')?.getAttribute("role")).toBe("radiogroup")
  expect(s.get("#lab-size")?.getAttribute("type")).toBe("radio")
  const names = s.all('[aria-label="Beden"] input').map((i: Element) => i.getAttribute("name"))
  expect(names).toEqual(["size", "size", "size", "size", "size"])
})

// The state props reach the DOM: invalid, labelledby and describedby become aria attributes, and disabled / readonly
// lock every radio.
test("invalid, labelledby, describedby; disabled ve readonly düğmeleri kilitler", () => {
  const s = renderTest(() => <RadioGroupLab />)
  const invoice = s.get(".lab-invoice")
  expect(invoice?.getAttribute("aria-invalid")).toBe("true")
  expect(invoice?.getAttribute("aria-labelledby")).toBe("lab-invoice-title")
  expect(invoice?.getAttribute("aria-describedby")).toBe("lab-invoice-error")
  for (const name of ["Devre dışı grup", "Salt okunur grup"])
    expect(s.all(`[aria-label="${name}"] input`).every((i: Element) => (i as HTMLInputElement).disabled)).toBe(true)
})
