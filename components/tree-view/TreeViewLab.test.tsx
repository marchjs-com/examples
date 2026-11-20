import { test, expect, renderTest } from "march/testing"
import { TreeViewLab } from "./TreeViewLab.tsx"

// TreeViewLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ağaç adını, sınıfını ve çoklu seçimi duyurur", () => {
  const s = renderTest(() => <TreeViewLab />)
  const tree = s.get("[role=tree]")
  expect(tree?.getAttribute("aria-label")).toBe("Posta klasörleri")
  expect(tree?.getAttribute("aria-multiselectable")).toBe("true")
  expect(s.get(".lab-tv")).not.toBe(null)
})

test("seçim tek'e geçince aria-multiselectable kalkar", async () => {
  const s = renderTest(() => <TreeViewLab />)
  await s.click("Seçim: multiple")
  expect(s.sees("Seçim: single")).toBe(true)
  expect(s.get("[role=tree]")?.hasAttribute("aria-multiselectable")).toBe(false)
})

test("arama düğmesi aramayı açar ve kapatır", async () => {
  const s = renderTest(() => <TreeViewLab />)
  await s.click("“fatura” ara")
  expect(s.sees("Aramayı temizle")).toBe(true)
  await s.click("Aramayı temizle")
  expect(s.sees("“fatura” ara")).toBe(true)
})
