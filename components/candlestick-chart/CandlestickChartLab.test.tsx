import { test, expect, renderTest } from "march/testing"
import { CandlestickChartLab } from "./CandlestickChartLab.tsx"

// Tests for CandlestickChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the window, the volume pane and moving averages, keyboard selection, the empty state and the line view,
// so a change to CandlestickChart that breaks any of them shows up here first.

// Proves `window`, `volume` and `ma`: of the 12 rows only the latest 10 candles are drawn, each with its volume bar,
// and the two moving averages (3 and 5 days) draw two lines. A broken window would draw 12 candles.
test("pencere son on mumu gösterir; hacim ve iki ortalama çizilir", () => {
  const s = renderTest(() => <CandlestickChartLab />)
  const chart = s.get(".lab-candles")!
  expect(chart.querySelectorAll(".m-candle").length).toBe(10)
  expect(chart.querySelectorAll(".m-candle-volume").length).toBe(10)
  expect(chart.querySelectorAll(".m-candle-ma").length).toBe(2)
})

// Proves keyboard selection: End jumps to the last candle and Enter selects it, so onSelect receives day 11 with its
// close of 114. This is the path a keyboard or screen-reader user takes, so it must work without a mouse.
test("bir muma tıklamak onu kapanışıyla seçer", async () => {
  const s = renderTest(() => <CandlestickChartLab />)
  s.get(".lab-candles svg")!.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }))
  s.get(".lab-candles svg")!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("kapanış 114")
})

// Proves the empty state: emptying the data shows the `empty` text instead of a broken or blank chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <CandlestickChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("İşlem yok")).toBe(true)
})

// Proves type="line": the line view draws the close line and no candle bodies at all.
test("çizgi görünümünde mum gövdesi yok, kapanış çizgisi var", () => {
  const s = renderTest(() => <CandlestickChartLab />)
  expect(s.get(".lab-line .m-candle-body")).toBe(null)
  expect(s.get(".lab-line .m-candle-close")).not.toBe(null)
})
