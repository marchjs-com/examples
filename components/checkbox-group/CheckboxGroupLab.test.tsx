// Tests for CheckboxGroupLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CheckboxGroupLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(textOrElement) clicks like a user and waits until the view has updated (so those tests are async and
//   await it); s.text() is all visible text; s.get / s.all find elements by CSS selector.
// - The tests check what a user or a screen reader can observe (the summary text, role, aria attributes, the
//   disabled state of the real inputs) rather than internal state, so they survive changes inside the component.
import { test, expect, renderTest } from "march/testing"
import { CheckboxGroupLab } from "./CheckboxGroupLab.tsx"

// bind:value keeps the array in sync: pressing an unchecked option appends it, pressing a checked one removes it.
// The Lab prints the array as text, so the test reads that text.
test("bir güne basınca değere eklenir, yeniden basınca çıkar", async () => {
  const s = renderTest(() => <CheckboxGroupLab />)
  await s.click("Pzt")
  expect(s.text().includes("Seçili: Sal, Per, Pzt")).toBe(true)
  await s.click("Sal")
  expect(s.text().includes("Seçili: Per, Pzt")).toBe(true)
})

// The card group uses onChange (instead of bind:value): pressing an option calls it with the new array and the Lab
// counts the calls. The third plan is disabled, so its input must be a disabled checkbox.
test("kart görünümü onChange'i çağırır; kapalı seçenek seçilemez", async () => {
  const s = renderTest(() => <CheckboxGroupLab />)
  await s.click("Ücretsiz")
  expect(s.text().includes("Planlar: team, free · 1 değişiklik")).toBe(true)
  const boxes = s.all('[aria-label="Planlar"] input[type=checkbox]') as HTMLInputElement[]
  expect(boxes.length).toBe(3)
  expect(boxes[2]?.disabled).toBe(true)
})

// Accessibility and form wiring: the group is role="group" with its aria-label; id and name go to the first real
// input, so a label or a form field can refer to the group.
test("grup role=group ve aria-label taşır; id ve name ilk kutuya gider", () => {
  const s = renderTest(() => <CheckboxGroupLab />)
  const days = s.get('[aria-label="Günler"]')
  expect(days?.getAttribute("role")).toBe("group")
  const first = s.get("#lab-days") as HTMLInputElement
  expect(first?.getAttribute("name")).toBe("days")
  expect(first?.checked).toBe(false)
})

// invalid sets aria-invalid, labelledby / describedby link the group to its title and error text, and disabled /
// readonly lock every checkbox of a group.
test("invalid, labelledby, describedby; disabled ve readonly kutuları kilitler", () => {
  const s = renderTest(() => <CheckboxGroupLab />)
  const terms = s.get(".lab-terms")
  expect(terms?.getAttribute("aria-invalid")).toBe("true")
  expect(terms?.getAttribute("aria-labelledby")).toBe("lab-terms-title")
  expect(terms?.getAttribute("aria-describedby")).toBe("lab-terms-error")
  for (const name of ["Devre dışı grup", "Salt okunur grup"])
    expect(s.all(`[aria-label="${name}"] input`).every((i: Element) => (i as HTMLInputElement).disabled)).toBe(true)
})
