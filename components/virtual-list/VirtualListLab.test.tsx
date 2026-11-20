import { test, expect, renderTest } from "march/testing"
import { VirtualListLab } from "./VirtualListLab.tsx"

// VirtualListLab'in testleri: kaydedince Testler sekmesinde çalışır
test("liste adını, kimliğini ve rolünü alır", () => {
  const s = renderTest(() => <VirtualListLab />)
  const list = s.get("#lab-vlist")
  expect(list?.getAttribute("role")).toBe("list")
  expect(s.get(".lab-vlist")).not.toBe(null)
})

test("başlık ve son satırı çizer", () => {
  const s = renderTest(() => <VirtualListLab />)
  expect(s.sees("Başlık: 1 000 satır")).toBe(true)
  expect(s.sees("Liste sonu")).toBe(true)
})

test("1 000 satırın hepsi DOM'a girmez", async () => {
  const s = renderTest(() => <VirtualListLab />)
  await s.flush()
  expect(s.all("[role=listitem]").length < 1000).toBe(true)
})

test("ara düğmesi değeri değiştirir", async () => {
  const s = renderTest(() => <VirtualListLab />)
  await s.click("Ara: 0")
  expect(s.sees("Ara: 8")).toBe(true)
})
