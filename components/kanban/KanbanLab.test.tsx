import { test, expect, renderTest } from "march/testing"
import { KanbanLab } from "./KanbanLab.tsx"

// KanbanLab'in testleri: kaydedince Testler sekmesinde çalışır
test("her pano üç sütun; sütunlar başlıklarıyla adlanır", () => {
  const s = renderTest(() => <KanbanLab />)
  const board = s.get(".lab-board")!
  const cols = Array.from(board.querySelectorAll("section")) as Element[]
  expect(cols.map((c) => c.getAttribute("aria-label"))).toEqual(["Fikir", "Tasarım", "Yayında"])
})

test("itemKey kartın data-key'i olur; card içeriği yazar", () => {
  const s = renderTest(() => <KanbanLab />)
  const first = s.get(".lab-board .m-kanban-card")!
  expect(first.getAttribute("data-key")).toBe("i1")
  expect(first.textContent).toBe("Karanlık mod")
})

test("Alt+→ kartı bir sonraki sütuna taşır ve onMove çağrılır", async () => {
  const s = renderTest(() => <KanbanLab />)
  const card = s.get(".lab-board .m-kanban-card")!
  card.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", altKey: true, bubbles: true }))
  await s.flush()
  expect(s.sees("Son hareket: Karanlık mod: a → b")).toBe(true)
  expect(s.get(".lab-board section[data-col=b]")!.textContent).toContain("Karanlık mod")
})

test("count={false} ve dot={false} sayaç ile noktayı kaldırır; kendi sayacım yazılır", () => {
  const s = renderTest(() => <KanbanLab />)
  const boards = s.all(".m-kanban")
  expect(boards[1].querySelector(".m-kanban-count.is-own")?.textContent ?? "").toContain("kart")
  expect(boards[2].querySelector(".m-kanban-count")).toBe(null)
  expect(boards[2].querySelector(".m-kanban-dot")).toBe(null)
})
