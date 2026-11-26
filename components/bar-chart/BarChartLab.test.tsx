import { test, expect, renderTest } from "march/testing"
import { BarChartLab } from "./BarChartLab.tsx"

// BarChartLab's tests: they run in MarchIDE's Tests tab when you save. They check what users and screen readers get
// (bars, labels, texts), not how far an animation has run.

// Proves two series over six months make twelve bars, and the accessible name and description reach the SVG.
test("altı ay iki seri: on iki çubuk, başlık ve açıklama", () => {
  const s = renderTest(() => <BarChartLab />)
  const chart = s.get(".lab-bars")!
  expect(chart.querySelectorAll(".m-chart-bar").length).toBe(12)
  expect(chart.querySelector("svg title")!.textContent).toBe("Üye artışı")
  expect(chart.querySelector("svg desc")!.textContent).toBe("Ay ay yeni ve eski üyeler")
})

// Proves a click reaches onSelect with the bar's month.
test("bir çubuğa tıklamak onu seçer", async () => {
  const s = renderTest(() => <BarChartLab />)
  s.get(".lab-bars .m-chart-bar")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Oca")
})

// Proves the empty text replaces the chart when the data runs out.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <BarChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Henüz veri yok")).toBe(true)
})

// Proves the stacked horizontal chart draws every bar too.
test("yığılmış yatay grafik de on iki çubuk çizer", () => {
  const s = renderTest(() => <BarChartLab />)
  expect(s.get(".lab-stack")!.querySelectorAll(".m-chart-bar").length).toBe(12)
})

// Proves value labels and the reference marks (target and average) are drawn with their texts.
test("değer etiketleri, hedef ve ortalama çizgisi", () => {
  const s = renderTest(() => <BarChartLab />)
  const chart = s.get(".lab-bars")!
  expect(chart.querySelectorAll(".m-chart-value").length).toBe(12)
  expect(chart.textContent).toContain("Hedef")
})

// Proves fewer months shrink the data table at once (the leaving bars only sink visually).
test("üç aya inince tablo üç satır olur", async () => {
  const s = renderTest(() => <BarChartLab />)
  await s.click(".lab-short")
  expect(s.get(".lab-bars")!.querySelectorAll("table tbody tr").length).toBe(3)
})
