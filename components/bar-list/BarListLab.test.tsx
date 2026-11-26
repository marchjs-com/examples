// Tests for BarListLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <BarListLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns one element, s.all(selector) a list, s.sees(text) says whether text is on screen, and
//   s.click(el or selector) clicks like a user and waits until the view has updated (so those tests are async).
// - The tests check what a user or a screen reader can observe (the list's accessible name, the row labels in order,
//   visible text) rather than internal state. `labels` below reads the text of every row label (.m-barlist-label).
// To adapt them: copy one test, change the selector or the expected list.
import { test, expect, renderTest } from "march/testing"
import { BarListLab } from "./BarListLab.tsx"

// Helper: the label text of each row, in the order they are drawn.
const labels = (el: Element) => [...el.querySelectorAll(".m-barlist-label")].map((l) => l.textContent)

// sort={false} keeps the data order (by default rows are sorted largest first), and `title` is the list's accessible
// name.
test("sort={false}: veri sırası korunur; liste adıyla duyurulur", () => {
  const s = renderTest(() => <BarListLab />)
  const list = s.get(".lab-tasks")!
  expect(list.getAttribute("aria-label")).toBe("Görevler")
  expect(labels(list)).toEqual(["Tasarım", "Kod", "Test", "Yayın"])
})

// onSelect turns every row into a real button; the callback gets the row and its rank, which the Lab prints.
test("onSelect satırları düğme yapar; tıklanan sırasıyla gelir", async () => {
  const s = renderTest(() => <BarListLab />)
  await s.click(s.all(".lab-tasks button")[1]!)
  expect(s.get(".lab-picked")!.textContent).toBe("Seçilen: 2. Kod")
})

// limit={2} shows only the first two rows (after sorting); an empty data list shows the `empty` content.
test("limit ilk ikiyi gösterir; veri boşalınca boş metni", async () => {
  const s = renderTest(() => <BarListLab />)
  expect(labels(s.get(".lab-top")!)).toEqual(["Tasarım", "Kod"])
  await s.click(".lab-empty")
  expect(s.sees("Görev yok")).toBe(true)
})
