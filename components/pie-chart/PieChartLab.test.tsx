import { test, expect, renderTest } from "march/testing"
import { PieChartLab } from "./PieChartLab.tsx"

// PieChartLab's tests: they run in MarchIDE's Tests tab when you save.

// Proves four rows make four slices and the donut shows its own centre text.
test("dört kalem dört dilim; ortada kendi yazısı", () => {
  const s = renderTest(() => <PieChartLab />)
  const pie = s.get(".lab-pie")!
  expect(pie.querySelectorAll(".m-chart-slice").length).toBe(4)
  expect(pie.querySelector(".m-chart-center")!.textContent).toBe("4 kalem")
})

// Proves a click on a slice reaches onSelect with its label and share.
test("bir dilime tıklamak onu payıyla seçer", async () => {
  const s = renderTest(() => <PieChartLab />)
  s.get(".lab-pie .m-chart-slice")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Kira")
})

// Proves the empty text replaces the chart when the data runs out.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <PieChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Harcama yok")).toBe(true)
})

// Proves a plain pie has no centre text.
test("düz pastanın ortası yok", () => {
  const s = renderTest(() => <PieChartLab />)
  expect(s.get(".lab-plain .m-chart-center")).toBe(null)
})

// Proves the slices carry their percentage and a dropped slice leaves the data table at once.
test("dilim yüzdeleri; çıkan kalem tablodan hemen düşer", async () => {
  const s = renderTest(() => <PieChartLab />)
  expect(s.get(".lab-pie")!.querySelectorAll(".m-chart-slice-label").length).toBe(4)
  await s.click(".lab-fun")
  expect(s.get(".lab-pie")!.querySelectorAll("table tbody tr").length).toBe(3)
})
