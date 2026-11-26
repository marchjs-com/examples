// Tests for KanbanLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <KanbanLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.flush() waits until the view has updated after an event we dispatched
//   ourselves, s.sees(text) says whether text is on screen.
// - Dragging with the mouse is hard to fake, so the move test uses the keyboard path (Alt+Right on a focused card), which
//   goes through the same onMove.
// - The tests check observable things (labels, data attributes, visible text) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { KanbanLab } from "./KanbanLab.tsx"

// The first board has three columns, each a labelled section named by its title.
test("her pano üç sütun; sütunlar başlıklarıyla adlanır", () => {
  const s = renderTest(() => <KanbanLab />)
  const board = s.get(".lab-board")!
  const cols = Array.from(board.querySelectorAll("section")) as Element[]
  expect(cols.map((c) => c.getAttribute("aria-label"))).toEqual(["Fikir", "Tasarım", "Yayında"])
})

// itemKey becomes the card's data-key, and `card` decides what the card contains.
test("itemKey kartın data-key'i olur; card içeriği yazar", () => {
  const s = renderTest(() => <KanbanLab />)
  const first = s.get(".lab-board .m-kanban-card")!
  expect(first.getAttribute("data-key")).toBe("i1")
  expect(first.textContent).toBe("Karanlık mod")
})

// Alt+Right on a card moves it to the next column: onMove is called (the lab prints it) and the card is now in column b.
test("Alt+→ kartı bir sonraki sütuna taşır ve onMove çağrılır", async () => {
  const s = renderTest(() => <KanbanLab />)
  const card = s.get(".lab-board .m-kanban-card")!
  card.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", altKey: true, bubbles: true }))
  await s.flush()
  expect(s.sees("Son hareket: Karanlık mod: a → b")).toBe(true)
  expect(s.get(".lab-board section[data-col=b]")!.textContent).toContain("Karanlık mod")
})

// Our own counter text appears on the second board; the third has neither counter nor dot.
test("count={false} ve dot={false} sayaç ile noktayı kaldırır; kendi sayacım yazılır", () => {
  const s = renderTest(() => <KanbanLab />)
  const boards = s.all(".m-kanban")
  expect(boards[1].querySelector(".m-kanban-count.is-own")?.textContent ?? "").toContain("kart")
  expect(boards[2].querySelector(".m-kanban-count")).toBe(null)
  expect(boards[2].querySelector(".m-kanban-dot")).toBe(null)
})
