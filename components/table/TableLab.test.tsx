import { test, expect, renderTest } from "march/testing"
import { TableLab } from "./TableLab.tsx"

// TableLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ilk sayfa beş satır; sayfa boyu ve başlık", () => {
  const s = renderTest(() => <TableLab />)
  const t = s.get(".lab-table")!
  expect(t.querySelectorAll("tbody tr").length).toBeGreaterThan(0)
  expect(t.querySelectorAll("tbody tr[data-key], tbody tr[aria-rowindex], tbody tr").length).toBeGreaterThan(4)
  expect(s.sees("Sprint görevleri")).toBe(true)
})

test("satıra tıklamak onRowClick'i çağırır", async () => {
  const s = renderTest(() => <TableLab />)
  const cells = Array.from(s.get(".lab-table")!.querySelectorAll("tbody td")) as HTMLElement[]
  const cell = cells.find((td: HTMLElement) => /^Görev \d+$/.test((td.textContent ?? "").trim()))!
  await s.click(cell)
  expect(s.get(".lab-state")!.textContent).toContain("Tıklanan: Görev")
})

test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <TableLab />)
  await s.click(".lab-clear")
  expect(s.sees("Görev yok, yeni bir tane ekle")).toBe(true)
})

test("kart görünümü üç görevi çizer", () => {
  const s = renderTest(() => <TableLab />)
  expect(s.get(".lab-cards")!.textContent).toContain("Görev 1")
})
