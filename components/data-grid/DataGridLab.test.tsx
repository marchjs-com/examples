import { test, expect, renderTest } from "march/testing"
import { DataGridLab } from "./DataGridLab.tsx"

// DataGridLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ızgara adını ve sınıfını alır", () => {
  const s = renderTest(() => <DataGridLab />)
  expect(s.get("[role=grid]")?.getAttribute("aria-label")).toBe("Sprint görevleri")
  expect(s.get(".lab-grid")).not.toBe(null)
})

test("kendi metinleri: satır sayısı 'görev' ile yazılır", async () => {
  const s = renderTest(() => <DataGridLab />)
  await s.flush()
  expect(s.sees("6 görev")).toBe(true)
})

test("gruplayınca grup satırları eklenir: başlık + 3 grup + 6 satır (aria-rowcount)", async () => {
  const s = renderTest(() => <DataGridLab />)
  expect(s.get("[role=grid]")?.getAttribute("aria-rowcount")).toBe("7")
  await s.click("Takıma göre grupla")
  await s.flush()
  expect(s.sees("Gruplar: team")).toBe(true)
  expect(s.get("[role=grid]")?.getAttribute("aria-rowcount")).toBe("10")
})

test("liste boşalınca kendi boş ekranı görünür", async () => {
  const s = renderTest(() => <DataGridLab />)
  await s.click("Listeyi boşalt")
  await s.flush()
  expect(s.sees("Görev yok")).toBe(true)
})
