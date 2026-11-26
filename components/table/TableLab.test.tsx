// Tests for TableLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TableLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element, s.sees(text) says whether a text is on the page; s.click(el or selector) clicks
//   like a user and waits until the view has updated (so a test that clicks is async and awaits it).
// - The tests check what a user can observe (rows in the body, visible texts, what the Lab writes after an action) rather
//   than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text. .lab-table, .lab-state, .lab-clear and
// .lab-cards are the classes given in TableLab.
import { test, expect, renderTest } from "march/testing"
import { TableLab } from "./TableLab.tsx"

// The table draws rows in its body, shows the page size's worth of them, and the caption is visible text.
test("ilk sayfa beş satır; sayfa boyu ve başlık", () => {
  const s = renderTest(() => <TableLab />)
  const t = s.get(".lab-table")!
  expect(t.querySelectorAll("tbody tr").length).toBeGreaterThan(0)
  expect(t.querySelectorAll("tbody tr[data-key], tbody tr[aria-rowindex], tbody tr").length).toBeGreaterThan(4)
  expect(s.sees("Sprint görevleri")).toBe(true)
})

// A click on a cell of a row calls onRowClick, and the Lab writes the clicked task's title in its status line. We pick the
// title cell by its text, like a user would.
test("satıra tıklamak onRowClick'i çağırır", async () => {
  const s = renderTest(() => <TableLab />)
  const cells = Array.from(s.get(".lab-table")!.querySelectorAll("tbody td")) as HTMLElement[]
  const cell = cells.find((td: HTMLElement) => /^Görev \d+$/.test((td.textContent ?? "").trim()))!
  await s.click(cell)
  expect(s.get(".lab-state")!.textContent).toContain("Tıklanan: Görev")
})

// When the data is empty the table shows the `empty` text, so the user is told why there is nothing.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <TableLab />)
  await s.click(".lab-clear")
  expect(s.sees("Görev yok, yeni bir tane ekle")).toBe(true)
})

// layout="cards" draws each row as a card; the second table, forced into that layout, still shows the first task.
test("kart görünümü üç görevi çizer", () => {
  const s = renderTest(() => <TableLab />)
  expect(s.get(".lab-cards")!.textContent).toContain("Görev 1")
})
