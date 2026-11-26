// Tests for LineChartLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LineChartLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds an element by CSS selector; s.sees("text") says whether text is visible; s.click(".selector")
//   clicks the matching element like a user and waits until the view has updated, which is why the tests that click are
//   async and await it.
// - The tests look inside the chart's SVG and its visually hidden data table (the part screen readers use), so they check
//   what a user or a screen reader can observe rather than internal state.
// To adapt them: copy one test, change the selector or the expected value. The chart's part classes (m-chart-line,
// m-chart-area, m-chart-legend) are what the tests count.
import { test, expect, renderTest } from "march/testing"
import { LineChartLab } from "./LineChartLab.tsx"

// Two series draw two line paths; `title` and `description` are the SVG's <title> and <desc>, which is its accessible
// name and description.
test("iki seri iki çizgi; başlık ve açıklama SVG'de", () => {
  const s = renderTest(() => <LineChartLab />)
  const chart = s.get(".lab-line")!
  expect(chart.querySelectorAll(".m-chart-line").length).toBe(2)
  expect(chart.querySelector("svg title")!.textContent).toBe("Sıcaklık")
  expect(chart.querySelector("svg desc")!.textContent).toBe("İç ve dış sıcaklık, saat saat")
})

// The hidden data table has one row per hour (24). Clicking the button replaces the data signal, so the table's first
// row changes: the chart follows its data.
test("veri tablosu 24 saati taşır, veri değişince güncellenir", async () => {
  const s = renderTest(() => <LineChartLab />)
  const chart = s.get(".lab-line")!
  expect(chart.querySelectorAll("table tbody tr").length).toBe(24)
  const before = chart.querySelector("table tbody tr")!.textContent
  await s.click(".lab-shift")
  expect(chart.querySelector("table tbody tr")!.textContent).not.toBe(before)
})

// With no rows the chart shows its `empty` content instead of lines.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <LineChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Ölçüm yok")).toBe(true)
})

// The stacked AreaChart draws one area per series, and with legend={false} the legend is either not drawn or hidden.
test("yığılmış alan grafiği iki alan çizer, açıklaması yok", () => {
  const s = renderTest(() => <LineChartLab />)
  const area = s.get(".lab-area")!
  expect(area.querySelectorAll(".m-chart-area").length).toBe(2)
  const legend = area.querySelector(".m-chart-legend")
  expect(legend == null || legend.hasAttribute("hidden")).toBe(true)
})
