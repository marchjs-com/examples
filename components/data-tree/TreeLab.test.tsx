import { test, expect, renderTest } from "march/testing"
import { TreeLab } from "./TreeLab.tsx"

// TreeLab'in testleri: kaydedince Testler sekmesinde çalışır
test("üç ağaç da role=tree ve kendi adıyla", () => {
  const s = renderTest(() => <TreeLab />)
  const trees = s.all("[role=tree]")
  expect(trees.length).toBe(3)
  expect(trees.map((t: Element) => t.getAttribute("aria-label"))).toEqual(["Ağaç A", "Ağaç B", "Ağaç C"])
})

test("bir satıra basınca seçim değişir ve onSelect sayar", async () => {
  const s = renderTest(() => <TreeLab />)
  await s.click("Uyarılar")
  expect(s.sees("Seçili: alerts")).toBe(true)
  expect(s.sees("seçim sayısı: 1")).toBe(true)
  expect(s.all("[aria-selected=true]").length).toBe(3)
})

test("expanded ile açılan dal aria-expanded=true", () => {
  const s = renderTest(() => <TreeLab />)
  const fav = s.all("[role=treeitem][aria-expanded]")[0]
  expect(fav.getAttribute("aria-expanded")).toBe("true")
})

test("chevron={false} oku kaldırır, class ağaca eklenir", () => {
  const s = renderTest(() => <TreeLab />)
  const c = s.get(".lab-tree")
  expect(c?.getAttribute("aria-label")).toBe("Ağaç C")
  expect(c?.querySelector("[data-chev]")).toBe(null)
})
