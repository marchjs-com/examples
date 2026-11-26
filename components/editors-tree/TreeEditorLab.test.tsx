// Tests for TreeEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TreeEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it (or has it as its label); s.click(target) clicks like a user (a visible text or an element)
//   and waits for the view to update, so tests that click are async.
// - s.flush() lets the tree finish its first draw and validation before the checks.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { TreeEditorLab } from "./TreeEditorLab.tsx"

// Two problems exist: the port is below the schema's minimum, and the Lab's own `validate` rule rejects the name.
// The status text, the counter fed by onValidate, the tree's accessible name and the empty-value text all come from the
// Lab's `labels` / props.
test("şema ve validate sorunları sayılır, kendi metinlerle yazılır", async () => {
  const s = renderTest(() => <TreeEditorLab />)
  await s.flush()
  expect(s.get(".lab-tree .m-tre-status")?.textContent).toBe("2 düzeltilecek yer")
  expect(s.sees("0 değişiklik · 2 sorun")).toBe(true)
  expect(s.get(".lab-tree [role=tree]")?.getAttribute("aria-label")).toBe("Sunucu")
  expect(s.get(".lab-tree .m-tre-empty")?.textContent).toBe("boş")
})

// actions={["add", "delete"]} keeps only those row actions: an add button exists, a duplicate button does not.
test("yalnız listelenen satır eylemleri: ekle ve sil, çoğalt yok", async () => {
  const s = renderTest(() => <TreeEditorLab />)
  await s.flush()
  expect(s.get(".lab-tree .m-tre-add")).not.toBe(null)
  expect(s.get(".lab-tree .m-tre-dup")).toBe(null)
})

// Delete removes the "note" row and counts one change; the Undo button (history) brings the row back. Rows are found by
// their data-ptr (the JSON pointer of the row).
test("Sil bir alanı kaldırır, Geri al geri getirir", async () => {
  const s = renderTest(() => <TreeEditorLab />)
  await s.flush()
  const row = s.get('.lab-tree [data-ptr="/note"]')
  const del = [...(row?.querySelectorAll("button") ?? [])].find((b) => b.getAttribute("aria-label") === "Sil")
  await s.click(del!)
  expect(s.get('.lab-tree [data-ptr="/note"]')).toBe(null)
  expect(s.sees("1 değişiklik")).toBe(true)
  await s.click("Geri al")
  await s.flush()
  expect(s.get('.lab-tree [data-ptr="/note"]')).not.toBe(null)
})

// The read-only copy is a second tree marked aria-readonly; it has search={false}, so only the first tree has a search
// input.
test("kopya salt okunur: eylem yok, arama yok", async () => {
  const s = renderTest(() => <TreeEditorLab />)
  await s.flush()
  const copy = s.all("[role=tree]").find((t) => t.getAttribute("aria-label") === "Salt okunur kopya")
  expect(copy?.getAttribute("aria-readonly")).toBe("true")
  expect(s.all(".m-tre-actions").length).toBeGreaterThan(0)
  expect(s.all(".m-tre-search-input").length).toBe(1)
})
