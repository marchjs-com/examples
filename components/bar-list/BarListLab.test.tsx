import { test, expect, renderTest } from "march/testing"
import { BarListLab } from "./BarListLab.tsx"

// BarListLab'in testleri: kaydedince Testler sekmesinde çalışır
const labels = (el: Element) => [...el.querySelectorAll(".m-barlist-label")].map((l) => l.textContent)

test("sort={false}: veri sırası korunur; liste adıyla duyurulur", () => {
  const s = renderTest(() => <BarListLab />)
  const list = s.get(".lab-tasks")!
  expect(list.getAttribute("aria-label")).toBe("Görevler")
  expect(labels(list)).toEqual(["Tasarım", "Kod", "Test", "Yayın"])
})

test("onSelect satırları düğme yapar; tıklanan sırasıyla gelir", async () => {
  const s = renderTest(() => <BarListLab />)
  await s.click(s.all(".lab-tasks button")[1]!)
  expect(s.get(".lab-picked")!.textContent).toBe("Seçilen: 2. Kod")
})

test("limit ilk ikiyi gösterir; veri boşalınca boş metni", async () => {
  const s = renderTest(() => <BarListLab />)
  expect(labels(s.get(".lab-top")!)).toEqual(["Tasarım", "Kod"])
  await s.click(".lab-empty")
  expect(s.sees("Görev yok")).toBe(true)
})
