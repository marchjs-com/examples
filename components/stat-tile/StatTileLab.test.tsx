import { test, expect, renderTest } from "march/testing"
import { StatTileLab } from "./StatTileLab.tsx"

// StatTileLab'in testleri: kaydedince Testler sekmesinde çalışır
test("onClick düğme yapar; basınca sayaç ve erişimci değer artar", async () => {
  const s = renderTest(() => <StatTileLab />)
  const b = s.get(".lab-btn")!
  expect(b.tagName).toBe("BUTTON")
  await s.click(b)
  await s.wait(400)
  expect(s.sees("80")).toBe(true)
})

test("href bağlantı yapar; disabled düğme basılamaz", () => {
  const s = renderTest(() => <StatTileLab />)
  expect(s.find("Rapor")!.closest("a")!.getAttribute("href")).toBe("#rapor")
  expect((s.find("Kapalı")!.closest("button") as HTMLButtonElement).disabled).toBe(true)
})

test("term dl içinde dt + dd çizer; partClass ve öznitelikler yazılır", () => {
  const s = renderTest(() => <StatTileLab />)
  const dl = s.get(".lab-dl")!
  expect(dl.querySelector("dt")!.classList.contains("lab-label")).toBe(true)
  expect(dl.querySelector("dd")!.classList.contains("lab-value")).toBe(true)
  expect(s.get("[data-kind=ayrıntı]")).not.toBe(null)
})
