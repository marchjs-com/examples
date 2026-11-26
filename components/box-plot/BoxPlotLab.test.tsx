import { test, expect, renderTest } from "march/testing"
import { BoxPlotLab } from "./BoxPlotLab.tsx"

// Tests for BoxPlotLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the statistics, selection, the mode switch and the edge cases (min / max whiskers, empty data), so a
// change to BoxPlot that breaks any of them shows up here first.

// Proves the statistics: three categories give three boxes, the 1.5 × IQR rule turns exactly one value (espresso's
// 40 s) into an outlier, and showPoints draws all 24 raw values. If quartiles or whiskers were computed wrong, the
// outlier count would change.
test("üç kahve üç kutu; espressonun 40 saniyesi aykırı nokta", () => {
  const s = renderTest(() => <BoxPlotLab />)
  const chart = s.get(".lab-box")!
  expect(chart.querySelectorAll(".m-boxplot-item").length).toBe(3)
  expect(chart.querySelectorAll(".m-boxplot-outlier").length).toBe(1)
  expect(chart.querySelectorAll(".m-boxplot-dot").length).toBe(24)
})

// Proves onSelect: a click on the first box calls it with that category; the label passes through xFormat (upper
// case) and the median is the right number. s.flush() waits for the reactive update before reading the text.
test("bir kutuya tıklamak onu ortancasıyla seçer", async () => {
  const s = renderTest(() => <BoxPlotLab />)
  s.get(".lab-box .m-boxplot-item")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("ESPRESSO 25")
})

// Proves the `mode` prop is reactive: one click switches box → violin, and a real violin path (an SVG "d" with a
// move command) is drawn, not just a class name.
test("biçim düğmesi keman çizer", async () => {
  const s = renderTest(() => <BoxPlotLab />)
  await s.click(".lab-mode")
  expect(s.get(".lab-box .m-boxplot-mode-violin")).not.toBe(null)
  // the violin grows in from the median (its entrance animation): give it a moment before reading its outline
  await new Promise((r) => setTimeout(r, 900))
  expect(s.get(".lab-box .m-boxplot-violin")!.getAttribute("d")).toContain("M")
})

// Proves two edge cases: with whisker="minmax" every value is inside the whiskers, so no outlier may be drawn; and
// emptying the data shows the `empty` text instead of a broken chart.
test("min–maks bıyıklarında aykırı nokta yok; boş veri boş metni gösterir", async () => {
  const s = renderTest(() => <BoxPlotLab />)
  expect(s.get(".lab-flat .m-boxplot-outlier")).toBe(null)
  await s.click(".lab-empty")
  expect(s.sees("Bugün kahve yok")).toBe(true)
})
