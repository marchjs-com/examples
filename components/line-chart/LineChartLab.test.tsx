import { test, expect, renderTest } from "march/testing"
import { LineChartLab } from "./LineChartLab.tsx"

// LineChartLab's tests: they run in MarchIDE's Tests tab when you save. They read what a user or a screen reader
// gets (lines, the hidden data table, texts), so they do not depend on how far an animation has run.

// Proves the series, the accessible name and description reach the SVG.
test("iki seri iki çizgi; başlık ve açıklama SVG'de", () => {
  const s = renderTest(() => <LineChartLab />)
  const chart = s.get(".lab-line")!
  expect(chart.querySelectorAll(".m-chart-line").length).toBe(2)
  expect(chart.querySelector("svg title")!.textContent).toBe("Sıcaklık")
  expect(chart.querySelector("svg desc")!.textContent).toBe("İç ve dış sıcaklık, saat saat")
})

// Proves the hidden table mirrors the data and follows a change (screen readers and CSV export read it).
test("veri tablosu 24 saati taşır, veri değişince güncellenir", async () => {
  const s = renderTest(() => <LineChartLab />)
  const chart = s.get(".lab-line")!
  expect(chart.querySelectorAll("table tbody tr").length).toBe(24)
  const before = chart.querySelectorAll("table tbody tr")[5]!.textContent
  await s.click(".lab-shift")
  expect(chart.querySelectorAll("table tbody tr")[5]!.textContent).not.toBe(before)
})

// Proves the reference marks draw with their labels and the empty text replaces the chart.
test("referans çizgileri yazılarıyla; veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <LineChartLab />)
  expect(s.get(".lab-line")!.textContent).toContain("Konfor")
  expect(s.get(".lab-line")!.textContent).toContain("Mesai")
  await s.click(".lab-empty")
  expect(s.sees("Ölçüm yok")).toBe(true)
})

// Proves ComboChart draws bars plus a line and opens a right axis with its title.
test("karma grafik: çubuklar, bir çizgi ve sağ eksen", () => {
  const s = renderTest(() => <LineChartLab />)
  const combo = s.get(".lab-combo")!
  expect(combo.querySelectorAll(".m-chart-bar").length).toBe(24)
  expect(combo.querySelectorAll(".m-chart-line").length).toBe(1)
  expect(combo.querySelector(".m-chart-axis-right")).toBeTruthy()
})

// Proves the live window keeps its data table complete while the feed grows, and the navigator offers two sliders.
test("canlı pencere ve aralık gezgini", async () => {
  const s = renderTest(() => <LineChartLab />)
  const live = s.get(".lab-live")!
  await s.click(".lab-feed")
  expect(live.querySelectorAll("table tbody tr").length).toBe(13)
  expect(live.querySelectorAll(".m-chart-nav [role=slider]").length).toBe(2)
})
