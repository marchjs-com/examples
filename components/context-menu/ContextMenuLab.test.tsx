import { test, expect, renderTest } from "march/testing"
import { ContextMenuLab } from "./ContextMenuLab.tsx"

// ContextMenuLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Menü tuşu odaklı öğede menüyü açar; öğe hedefi bilir", async () => {
  const s = renderTest(() => <ContextMenuLab />)
  await s.press("ContextMenu", s.get(".lab-on"))
  await s.flush(2)
  expect(s.sees("Hedefi yaz")).toBe(true)
  expect(s.get(".lab-menu")?.getAttribute("aria-label")).toBe("Lab menüsü")
  await s.click("Hedefi yaz")
  await s.flush(2)
  expect(s.get(".lab-last")?.textContent).toContain("hedef: Açılır")
})

test("when false döndürünce menü açılmaz", async () => {
  const s = renderTest(() => <ContextMenuLab />)
  await s.press("ContextMenu", s.get(".lab-off"))
  await s.flush(2)
  expect(s.sees("Hedefi yaz")).toBe(false)
  expect(s.get(".lab-area")).toBeTruthy()
})
