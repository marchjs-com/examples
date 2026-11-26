import { test, expect, renderTest } from "march/testing"
import { HeatmapLab } from "./HeatmapLab.tsx"

// Tests for HeatmapLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the grid size and accessible text, selection, the empty state, both calendar forms and calendar keyboard
// navigation, so a change to Heatmap that breaks any of them shows up here first.

// Proves the grid: five days × four hours give exactly twenty cells (xDomain / yDomain complete the grid), and
// `title` / `description` land in the SVG's <title> and <desc> for screen readers.
test("beş gün × dört saat: yirmi hücre, başlık ve açıklama", () => {
  const s = renderTest(() => <HeatmapLab />)
  const grid = s.get(".lab-grid")!
  expect(grid.querySelectorAll(".m-heat-cell").length).toBe(20)
  expect(grid.querySelector("svg title")!.textContent).toBe("Toplantı odası")
  expect(grid.querySelector("svg desc")!.textContent).toBe("Gün ve saate göre oda kullanımı")
})

// Proves onSelect: a click on a cell calls it, so the picked text is no longer the "—" placeholder. s.flush() waits
// for the reactive update before reading the text.
test("bir hücreye tıklamak onu seçer", async () => {
  const s = renderTest(() => <HeatmapLab />)
  s.get(".lab-grid .m-heat-cell")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).not.toBe("Seçilen: —")
})

// Proves that emptying the data shows the `empty` text instead of a blank or broken grid.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <HeatmapLab />)
  await s.click(".lab-empty")
  expect(s.sees("Kayıt yok")).toBe(true)
})

// Proves calendar={{ weeks: 4 }} draws whole weeks: more cells than the 20 data rows, because days without data are
// drawn too.
test("takvim dört haftayı çizer", () => {
  const s = renderTest(() => <HeatmapLab />)
  expect(s.get(".lab-cal")!.querySelectorAll(".m-heat-cell").length).toBeGreaterThan(20)
})

// Proves the from / to calendar: one cell for each of the 181 days from 1 January to 30 June (the data has 180, so
// the last day is drawn empty), seven weekday labels (dayLabels="all"), six month names (months) and the custom
// "less → more" legend words.
test("yıl görünümü: aralıktaki her gün bir hücre, ay ve gün adları, az → çok açıklaması, yuvarlak hücreler", () => {
  const s = renderTest(() => <HeatmapLab />)
  const q = (sel: string) => s.container.querySelector<HTMLElement>(sel)
  const year = q(".lab-year")!
  expect(year.querySelectorAll(".m-chart-plot .m-heat-cell").length).toBe(181)
  expect(year.querySelectorAll(".m-chart-axis-y text").length).toBe(7)
  expect(year.querySelectorAll(".m-chart-axis-x text").length).toBe(6)
  expect(year.querySelector(".m-heat-legend")!.textContent).toContain("Az")
  expect(year.querySelector(".m-heat-legend")!.textContent).toContain("Çok")
})

// Proves calendar keyboard navigation: ↑ ↓ step one day and ← → one week, so ↓ ↓ → lands on 9 January; the tooltip
// follows the keyboard cell and says the date through xFormat. This is what makes the calendar usable without a mouse.
test("takvimde oklar gün gün (↑ ↓) ve hafta hafta (← →) gezer; ipucu tarihi söyler", async () => {
  const s = renderTest(() => <HeatmapLab />)
  const q = (sel: string) => s.container.querySelector<HTMLElement>(sel)
  const svg = q(".lab-year .m-chart-svg")!
  const key = (k: string) => svg.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }))
  key("ArrowDown"); key("ArrowDown"); key("ArrowRight")
  await s.flush()
  expect(q(".lab-year .m-chart-tooltip")!.textContent).toContain("9 Ocak")
})
