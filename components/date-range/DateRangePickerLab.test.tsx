// Tests for DateRangePickerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DateRangePickerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.click(target) clicks like
//   a user (target = a visible text or an element) and waits for the view to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
// s.type(input, text) types into a date field and waits for the view; s.dispose() removes this render when a test is done.
import { test, expect, renderTest } from "march/testing"
import { DateRangePickerLab } from "./DateRangePickerLab.tsx"

// The presets are a radiogroup, so each preset is a role=radio button. This finds one by its visible text.
const radio = (root: Element, text: string) => [...root.querySelectorAll("[role=radio]")].find((b) => b.textContent?.trim() === text)

// Your own `presets` replace the built-in ones (here with id "lab-own" on the picker, and custom={false} removes the
// "Custom" choice). Picking a preset sets the value to its range, shown in the "A:" line, and that radio becomes
// aria-checked.
test("kendi hazır aralığım seçilince değer o aralık olur; custom={false} Özel'i kaldırır", async () => {
  const s = renderTest(() => <DateRangePickerLab />)
  const a = s.container.querySelector(".lab-a")!
  expect(a.querySelector("#lab-own")).not.toBe(null)
  expect(radio(a, "Bu hafta")?.getAttribute("aria-checked")).toBe("true")
  expect(radio(a, "Özel")).toBe(undefined)
  await s.click(radio(a, "Hafta sonu")!)
  expect(s.text()).toContain("A: 2026-11-21 → 2026-11-22")
  expect(radio(a, "Hafta sonu")?.getAttribute("aria-checked")).toBe("true")
  s.dispose()
})

// A range that matches no preset (the spring dates) opens in "Custom" (the from / to fields), with the separator mark
// between them. We type an end date into the "to" field: a valid date updates the value, a date after `max` is marked
// aria-invalid and the value stays as it was. The placeholder comes from picker={{ placeholder }}.
test("hiçbir hazıra uymayan aralık Özel'de açılır: → işareti, bitiş yazılır, max dışı geçersiz", async () => {
  const s = renderTest(() => <DateRangePickerLab />)
  const b = s.container.querySelector(".lab-b")!
  expect(radio(b, "Özel")?.getAttribute("aria-checked")).toBe("true")
  expect(b.querySelector(".m-daterange-sep")?.textContent).toBe("→")
  const to = b.querySelector('[aria-label="Bitiş"]') as HTMLInputElement
  expect(to.getAttribute("placeholder")).toBe("gg.aa.yyyy")
  await s.type(to, "2026-03-20")
  expect(s.text()).toContain("B: 2026-03-02 → 2026-03-20")
  await s.type(to, "2027-01-05")
  expect(to.getAttribute("aria-invalid")).toBe("true")
  expect(s.text()).toContain("B: 2026-03-02 → 2026-03-20")
  s.dispose()
})

// presets={false}: no radiogroup, just the two date fields. separator={false} and picker={{ icon: false }} remove the
// separator mark and the calendar button. `labelledby` points the root role=group at the title element. Typing a start
// date updates the value.
test("presets={false}: yalnız iki tarih alanı; işaret ve takvim düğmesi yok, labelledby grupta", async () => {
  const s = renderTest(() => <DateRangePickerLab />)
  const c = s.container.querySelector(".lab-c")!
  expect(c.getAttribute("role")).toBe("group")
  expect(c.getAttribute("aria-labelledby")).toBe("lab-c-title")
  expect(c.querySelector("[role=radiogroup]")).toBe(null)
  expect(c.querySelector(".m-daterange-sep")).toBe(null)
  expect(c.querySelector(".m-date-btn")).toBe(null)
  const from = c.querySelectorAll("input.m-date-input")[0] as HTMLInputElement
  await s.type(from, "2026-11-25")
  expect(s.text()).toContain("C: 2026-11-25 → 2026-11-30")
  s.dispose()
})

// disabled turns off every button and field; readonly keeps the value visible but locks the presets (their radios are
// disabled) while the current choice stays aria-checked.
test("disabled her şeyi kapatır, readonly hazır aralıkları kilitler", () => {
  const s = renderTest(() => <DateRangePickerLab />)
  const off = s.container.querySelector(".lab-disabled")!
  expect([...off.querySelectorAll("button")].every((x) => x.disabled)).toBe(true)
  expect((off.querySelector('[aria-label="Kapalı bitiş"]') as HTMLInputElement).disabled).toBe(true)
  const ro = s.container.querySelector(".lab-readonly")!
  expect([...ro.querySelectorAll("[role=radio]")].every((x) => (x as HTMLButtonElement).disabled)).toBe(true)
  expect(radio(ro, "Bu hafta")?.getAttribute("aria-checked")).toBe("true")
  s.dispose()
})
