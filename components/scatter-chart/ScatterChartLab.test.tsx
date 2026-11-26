import { test, expect, renderTest } from "march/testing"
import { ScatterChartLab } from "./ScatterChartLab.tsx"

// Tests for ScatterChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the points, the per-series trend lines, selection, the empty state and the no-animation draw, so a change
// to ScatterChart that breaks any of them shows up here first.

// Proves grouping: five people give five points, the two teams give two trend lines (trend="linear" fits one line per
// series) and two legend items. If grouping or the trend fit broke, these counts would change.
test("beş kişi beş nokta; iki takımın iki eğilim çizgisi var", () => {
  const s = renderTest(() => <ScatterChartLab />)
  const chart = s.get(".lab-scatter")!
  expect(chart.querySelectorAll(".m-scatter-point").length).toBe(5)
  expect(chart.querySelectorAll(".m-scatter-trend").length).toBe(2)
  expect(chart.querySelectorAll(".m-chart-legend-item").length).toBe(2)
})

// Proves onSelect and `key`: the point is found by its data-key (the `key="ad"` prop), a click calls onSelect with that
// person, and the name lands in `.lab-picked`. s.flush() waits for the reactive update before reading the text.
test("bir noktaya tıklamak onu adıyla seçer", async () => {
  const s = renderTest(() => <ScatterChartLab />)
  s.get('.lab-scatter .m-scatter-point[data-key="Cem"]')!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Cem")
})

// Proves the empty state: emptying the data shows the `empty` text instead of a broken chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <ScatterChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Kimse yok")).toBe(true)
})

// Proves animate={false} and radius: without animation the points are drawn at full size right away, so the circle
// path already holds the 3 px arc ("a3,3") instead of growing from zero.
test("animasyonsuz grafik noktaları hemen tam boyda çizer", () => {
  const s = renderTest(() => <ScatterChartLab />)
  expect(s.get(".lab-plain .m-scatter-point")!.getAttribute("d")).toContain("a3,3")
})
