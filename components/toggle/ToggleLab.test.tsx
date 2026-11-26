// Tests for ToggleLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ToggleLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds the element that shows a text, s.get(selector) the first match for a selector, s.text() is all
//   visible text, and s.click(element) clicks like a user and waits until the view has updated (that is why the tests
//   that click are async and await it).
// - The tests check what a user or a screen reader can observe (role, aria-checked, disabled, visible text) rather
//   than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the label or the expected value.
import { test, expect, renderTest } from "march/testing"
import { ToggleLab } from "./ToggleLab.tsx"

// Finds the switch of a label: the label wraps the switch, so we look for the <label> around the text and take the
// button inside it.
const switchOf = (s: ReturnType<typeof renderTest>, text: string) => s.find(text)?.closest("label")?.querySelector("button") as HTMLButtonElement

// A Toggle is role="switch" with aria-checked; pressing it flips aria-checked and the text that reads the signal.
test("anahtara basınca açılır: role=switch, aria-checked ve yazı değişir", async () => {
  const s = renderTest(() => <ToggleLab />)
  const dark = switchOf(s, "Karanlık mod")
  expect(dark.getAttribute("role")).toBe("switch")
  expect(dark.getAttribute("aria-checked")).toBe("false")
  await s.click(dark)
  expect(dark.getAttribute("aria-checked")).toBe("true")
  expect(s.text().includes("Karanlık: açık")).toBe(true)
})

// tristate: it is a role="checkbox" (a switch has no third state) and starts "mixed" (not set). Each click goes on to
// on, then off, then back to not set.
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

// onChange runs on every change (the Lab counts them), and children used as the label stay live: the Badge inside it
// changes from its on text to its off text when the switch is turned off.
test("onChange her değişiklikte çağrılır; children etiketi canlı", async () => {
  const s = renderTest(() => <ToggleLab />)
  await s.click(switchOf(s, "Açık"))
  expect(s.text().includes("1 değişiklik")).toBe(true)
  expect(s.text().includes("Sessiz")).toBe(true)
})

// States and wiring reach the button: disabled and readonly both lock it, invalid becomes aria-invalid, describedby
// becomes aria-describedby, and id, name and aria-label are on the element a screen reader or a form sees.
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
