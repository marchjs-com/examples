// Tests for SegmentedLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SegmentedLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click("name") clicks the control with that visible text or aria-label and returns the element; it waits until the
//   view has updated, which is why the tests that click are async and await it.
// - s.find("name") finds an element by its text or aria-label, s.get(selector) / s.all(selector) find by CSS selector,
//   s.text() is all visible text.
// - The tests check what a user or a screen reader can observe (aria-checked, accessible names, disabled, the text the
//   Lab prints) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { SegmentedLab } from "./SegmentedLab.tsx"

// Each segment is a role="radio" button; the chosen one has aria-checked="true". The Lab prints the bound value.
test("bir parçaya basınca seçilir (aria-checked) ve değer yazıya çıkar", async () => {
  const s = renderTest(() => <SegmentedLab />)
  const day = await s.click("Gün")
  expect(day.getAttribute("aria-checked")).toBe("true")
  expect(s.find("Hafta")?.getAttribute("aria-checked")).toBe("false")
  expect(s.text().includes("Seçili: Gün")).toBe(true)
})

// A segment with label "" and an icon has no text, so its accessible name is its `title`. The onChange callback runs
// once for the click (the Lab counts the changes).
test("yalnız ikonlu parçanın adı title'dan gelir; onChange sayar", async () => {
  const s = renderTest(() => <SegmentedLab />)
  const system = await s.click("Sisteme uy")
  expect(system.getAttribute("aria-label")).toBe("Sisteme uy")
  expect(s.text().includes("Tema: system · 1 değişiklik")).toBe(true)
})

// `disabled: true` on an option disables its button and `title` explains why; clicking it must not change the value,
// so the previously chosen plan stays checked.
test("kapalı seçenek ipucuyla devre dışı; tıklamak değeri değiştirmez", async () => {
  const s = renderTest(() => <SegmentedLab />)
  const life = s.find("Ömür boyu") as HTMLButtonElement
  expect(life.disabled).toBe(true)
  expect(life.getAttribute("title")).toBe("Yakında")
  await s.click(life)
  expect(s.find("Aylık")?.getAttribute("aria-checked")).toBe("true")
})

// The accessibility and form props: the group is a radiogroup named by aria-label; `id` lands on the first segment;
// invalid becomes aria-invalid and `labelledby` points to a visible heading; a disabled or readonly group has every
// button disabled.
test("role=radiogroup, id ilk parçada; invalid, labelledby, disabled, readonly", () => {
  const s = renderTest(() => <SegmentedLab />)
  expect(s.get('[aria-label="Dönem"]')?.getAttribute("role")).toBe("radiogroup")
  expect(s.get("#lab-period")?.textContent).toBe("Gün")
  const size = s.get(".lab-size")
  expect(size?.getAttribute("aria-invalid")).toBe("true")
  expect(size?.getAttribute("aria-labelledby")).toBe("lab-size-title")
  for (const name of ["Devre dışı", "Salt okunur"])
    expect(s.all(`[aria-label="${name}"] button`).every((b: Element) => (b as HTMLButtonElement).disabled)).toBe(true)
})
