// Tests for ChoicePickerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ChoicePickerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element; s.find(text) finds the element carrying a text or an aria-label;
//   s.click(textOrElement) clicks like a user and waits until the view has updated (so those tests are async and
//   await it); s.text() is all visible text.
// - The tests check what a user or a screen reader can observe (roles, aria-checked, disabled buttons, the printed
//   summary) rather than internal state, so they survive changes inside the component.
import { test, expect, renderTest } from "march/testing"
import { ChoicePickerLab } from "./ChoicePickerLab.tsx"

// kind="auto": the picker chooses its own look from the options. Three short labels become a Segmented control, eight
// options chips (a radio group), twelve options a Combobox. The Lab wraps each in a class so the test can find it.
test("görünümü seçenek sayısından kendisi seçer: 3 → segmented, 8 → chip, 12 → combobox", () => {
  const s = renderTest(() => <ChoicePickerLab />)
  expect(s.get(".auto-segmented .m-segmented") !== null).toBe(true)
  expect(s.get(".auto-chips .m-picker-chips") !== null).toBe(true)
  expect(s.get(".auto-combobox input[role=combobox]") !== null).toBe(true)
})

// Pressing a segment changes the value, calls onChange (the Lab counts the calls) and moves aria-checked, which is
// how a screen reader knows the selected radio.
test("segment'e basınca değer, onChange ve aria-checked değişir", async () => {
  const s = renderTest(() => <ChoicePickerLab />)
  const month = s.get(".auto-segmented [role=radio]:last-child") as HTMLElement
  await s.click(month)
  expect(month.getAttribute("aria-checked")).toBe("true")
  expect(s.text().includes("Dönem: Ay · değişiklik: 1")).toBe(true)
})

// The chip group and the combobox are bound to the same $city value (bind:value), so choosing a chip must also
// update the text shown inside the combobox input.
test("chip'e basınca aynı değeri paylaşan combobox da yeni şehri gösterir", async () => {
  const s = renderTest(() => <ChoicePickerLab />)
  await s.click("Trabzon")
  expect(s.text().includes("Şehir: Trabzon")).toBe(true)
  expect((s.get(".auto-combobox input") as HTMLInputElement).value).toBe("Trabzon")
})

// disabled and readonly lock every option of a group (the buttons are disabled) and invalid sets aria-invalid.
test("devre dışı ve salt okunur seçenekler kilitli; geçersiz grup aria-invalid taşır", () => {
  const s = renderTest(() => <ChoicePickerLab />)
  const off = s.find("Kapalı") as Element
  expect(off.querySelectorAll("button:disabled").length).toBe(2)
  const locked = s.find("Kilitli") as Element
  expect(locked.querySelectorAll("button:disabled").length).toBe(2)
  expect(s.find("Hatalı")?.getAttribute("aria-invalid")).toBe("true")
})
