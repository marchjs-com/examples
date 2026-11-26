import { test, expect, renderTest } from "march/testing"
import { RadarChartLab } from "./RadarChartLab.tsx"

// Tests for RadarChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the drawing, selection, the empty state and the "everything off" second chart, so a change to
// RadarChart that breaks any of them shows up here first.

// Proves the geometry: two series give two shapes, five rows give five spokes, and levels={5} gives five rings.
test("iki karakter iki şekil; beş kol, beş halka", () => {
  const s = renderTest(() => <RadarChartLab />)
  const radar = s.get(".lab-radar")!
  expect(radar.querySelectorAll(".m-radar-shape").length).toBe(2)
  expect(radar.querySelectorAll(".m-radar-spoke").length).toBe(5)
  expect(radar.querySelectorAll(".m-radar-ring").length).toBe(5)
})

// Proves onSelect: a click on a spoke's hit area calls it, and the Lab writes the selected skill with Ada's and
// Bora's values. s.flush() waits for the reactive update before reading the text.
test("bir kola tıklamak o beceriyi seçer", async () => {
  const s = renderTest(() => <RadarChartLab />)
  s.get(".lab-radar .m-radar-hit")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Ada")
})

// Proves the empty state: emptying the data shows the `empty` text instead of a broken chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <RadarChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Karakter yok")).toBe(true)
})

// Proves the switches of the second chart: dots={false} draws no dots, and curve="smooth" really draws a curve
// (an SVG path with a "C" cubic command), not straight line segments.
test("yalnız çizgili, noktasız, yumuşak şekil", () => {
  const s = renderTest(() => <RadarChartLab />)
  expect(s.get(".lab-circle .m-radar-dot")).toBe(null)
  expect(s.get(".lab-circle .m-radar-shape")!.getAttribute("d")).toContain("C")
})
