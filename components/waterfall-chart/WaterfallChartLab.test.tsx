import { test, expect, renderTest } from "march/testing"
import { WaterfallChartLab } from "./WaterfallChartLab.tsx"

// Tests for WaterfallChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click query and drive it like a user would.
// They check the columns and connectors, selection, a data update and the horizontal chart, so a change to
// WaterfallChart that breaks any of them shows up here first.

// Proves the column model: the start column, four rows and the end total give six bars with five connectors between
// them, and three of them are totals (start, the subtotal row and the end-of-day total).
test("kasa, dört kalem ve gün sonu: altı sütun, aralarında bağlantı", () => {
  const s = renderTest(() => <WaterfallChartLab />)
  const fall = s.get(".lab-fall")!
  expect(fall.querySelectorAll(".m-waterfall-bar").length).toBe(6)
  expect(fall.querySelectorAll(".m-waterfall-link").length).toBe(5)
  expect(fall.querySelectorAll(".m-waterfall-total").length).toBe(3)
})

// Proves onSelect: a click on the first column (the start) calls it with its label and running total (`to` = 200).
// s.flush() waits for the reactive update before reading the text.
test("bir sütuna tıklamak onu kasadaki tutarla seçer", async () => {
  const s = renderTest(() => <WaterfallChartLab />)
  s.get(".lab-fall .m-waterfall-step")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Kasa (200)")
})

// Proves the data is reactive and the `labels` function is used: the sales bar reads "+450" on day 1 and "+500" after
// the "next day" button.
test("sonraki gün satış sütununu büyütür", async () => {
  const s = renderTest(() => <WaterfallChartLab />)
  expect(s.get(".lab-fall .m-waterfall-up .m-waterfall-label")!.textContent).toBe("+450")
  await s.click(".lab-next")
  expect(s.get(".lab-fall .m-waterfall-up .m-waterfall-label")!.textContent).toBe("+500")
})

// Proves connectors={false}: the horizontal chart draws no connector lines.
test("yatay şelalede bağlantı yok", () => {
  const s = renderTest(() => <WaterfallChartLab />)
  expect(s.get(".lab-side .m-waterfall-link")).toBe(null)
})
