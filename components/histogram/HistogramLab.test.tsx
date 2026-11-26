import { test, expect, renderTest } from "march/testing"
import { HistogramLab } from "./HistogramLab.tsx"

// Tests for HistogramLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check grouping, selection, the cumulative mode and the empty state, so a change to Histogram that breaks any
// of them shows up here first.

// Proves grouping: both classes are binned on the same bins, so the bar count is even (one bar per bin per class);
// each group gets its own density curve; and the fixed "pass mark" reference line is drawn with its label.
test("iki şube aynı kutularda üst üste; iki yoğunluk eğrisi", () => {
  const s = renderTest(() => <HistogramLab />)
  const chart = s.get(".lab-histogram")!
  expect(chart.querySelectorAll(".m-histogram-bar").length % 2).toBe(0)
  expect(chart.querySelectorAll(".m-histogram-curve").length).toBe(2)
  expect(s.sees("Geçme notu")).toBe(true)
})

// Proves onSelect: a click on the first bar calls it with that bin. The domain starts at 40, so the first bin's lower
// edge (x0) must be 40. s.flush() waits for the reactive update before reading the text.
test("bir çubuğa tıklamak aralığını ve sayısını seçer", async () => {
  const s = renderTest(() => <HistogramLab />)
  s.get(".lab-histogram .m-histogram-bar")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("40+")
})

// Proves cumulative mode: running totals can only grow, so the last bar of the second chart must be the tallest.
// If `cumulative` stopped accumulating, an earlier bar could be taller and this would fail.
test("birikimli payın son çubuğu en yüksektir", () => {
  const s = renderTest(() => <HistogramLab />)
  const hs = [...s.get(".lab-cumulative")!.querySelectorAll(".m-histogram-bar")].map((b) => Number(b.getAttribute("height")))
  expect(Math.max(...hs)).toBe(hs[hs.length - 1])
})

// Proves the empty state: emptying the data shows the `empty` text instead of a broken chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <HistogramLab />)
  await s.click(".lab-empty")
  expect(s.sees("Sınav yok")).toBe(true)
})
