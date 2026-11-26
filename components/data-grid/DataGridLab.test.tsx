// Tests for DataGridLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DataGridLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.click(target) clicks like
//   a user (target = a visible text or an element) and waits for the view to update, so tests that click are async.
// - s.flush() lets pending timers and microtasks run, for parts that appear a moment later.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DataGridLab } from "./DataGridLab.tsx"

// `label` becomes the grid's accessible name (aria-label on role=grid) and `class` lands on the root, so a test or
// your CSS can find this instance.
test("ızgara adını ve sınıfını alır", () => {
  const s = renderTest(() => <DataGridLab />)
  expect(s.get("[role=grid]")?.getAttribute("aria-label")).toBe("Sprint görevleri")
  expect(s.get(".lab-grid")).not.toBe(null)
})

// `labels.rows` writes the row count in the toolbar ("6 items" in Turkish): proves the grid uses your texts, not its built-in ones.
// s.flush() waits for the count to be drawn.
test("kendi metinleri: satır sayısı 'görev' ile yazılır", async () => {
  const s = renderTest(() => <DataGridLab />)
  await s.flush()
  expect(s.sees("6 görev")).toBe(true)
})

// Grouping adds one header row per group: aria-rowcount counts the header row (1) + data rows (6) = 7; after
// grouping by team it is 7 + 3 group rows = 10. The count is the full size, not just the rendered window.
test("gruplayınca grup satırları eklenir: başlık + 3 grup + 6 satır (aria-rowcount)", async () => {
  const s = renderTest(() => <DataGridLab />)
  expect(s.get("[role=grid]")?.getAttribute("aria-rowcount")).toBe("7")
  await s.click("Takıma göre grupla")
  await s.flush()
  expect(s.sees("Gruplar: team")).toBe(true)
  expect(s.get("[role=grid]")?.getAttribute("aria-rowcount")).toBe("10")
})

// Passing no rows shows the `empty` node we gave (an Empty component with a "no tasks" title) instead of the built-in text.
test("liste boşalınca kendi boş ekranı görünür", async () => {
  const s = renderTest(() => <DataGridLab />)
  await s.click("Listeyi boşalt")
  await s.flush()
  expect(s.sees("Görev yok")).toBe(true)
})
