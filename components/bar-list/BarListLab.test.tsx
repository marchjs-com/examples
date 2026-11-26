import { test, expect, renderTest } from "march/testing"
import { BarListLab } from "./BarListLab.tsx"

// Tests for BarListLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check ordering, the accessible name, selection, limit, the empty state and the exit animation, so a change to
// BarList that breaks any of them shows up here first.

// Helper: the visible row labels of a list, in DOM order.
const labels = (el: Element) => [...el.querySelectorAll(".m-barlist-label")].map((l) => l.textContent)

// Proves sort={false} keeps the data order (not largest first) and that `title` becomes the list's aria-label, so a
// screen reader announces what the list is about.
test("sort={false}: veri sırası korunur; liste adıyla duyurulur", () => {
  const s = renderTest(() => <BarListLab />)
  const list = s.get(".lab-tasks")!
  expect(list.getAttribute("aria-label")).toBe("Görevler")
  expect(labels(list)).toEqual(["Tasarım", "Kod", "Test", "Yayın"])
})

// Proves onSelect turns rows into real buttons and passes the clicked row with its 1-based rank.
test("onSelect satırları düğme yapar; tıklanan sırasıyla gelir", async () => {
  const s = renderTest(() => <BarListLab />)
  await s.click(s.all(".lab-tasks button")[1]!)
  expect(s.get(".lab-picked")!.textContent).toBe("Seçilen: 2. Kod")
})

// Proves `limit` shows only the first two rows (after sorting), and that an empty data set shows the `empty` text
// instead of a blank box.
test("limit ilk ikiyi gösterir; veri boşalınca boş metni", async () => {
  const s = renderTest(() => <BarListLab />)
  expect(labels(s.get(".lab-top")!)).toEqual(["Tasarım", "Kod"])
  await s.click(".lab-empty")
  expect(s.sees("Görev yok")).toBe(true)
})

// Proves the exit animation and its switch: on the main list (exit: false) the dropped row is gone at once; on the
// default-animated list the row cut by `limit` stays in the DOM marked .is-leaving while it shrinks, and is removed
// once the animation has finished.
test("animate: exit false satırı hemen kaldırır; varsayılan hareket çıkan satırı küçülürken tutar", async () => {
  const s = renderTest(() => <BarListLab />)
  const q = (sel: string) => s.container.querySelector<HTMLElement>(sel)
  await s.click(q(".lab-drop")!)
  expect(labels(q(".lab-tasks")!)).toEqual(["Kod", "Test", "Yayın"])
  const top = q(".lab-top")!
  expect(top.querySelector(".m-barlist-item.is-leaving")).toBeTruthy()
  // Wait for the spring to settle so the leaving row has been removed.
  await new Promise((r) => setTimeout(r, 1500))
  expect(labels(q(".lab-top")!)).toEqual(["Kod", "Test"])
})
