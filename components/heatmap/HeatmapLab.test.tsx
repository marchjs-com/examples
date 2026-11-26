// Tests for HeatmapLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <HeatmapLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.sees(text) says whether text is on screen, s.click(selector) clicks
//   like a user and waits until the view has updated, and s.flush() waits for the view to update after an event we
//   dispatched ourselves.
// - The tests check observable things (number of cells, the chart's title and description, visible text) rather than
//   internal state.
import { test, expect, renderTest } from "march/testing"
import { HeatmapLab } from "./HeatmapLab.tsx"

// Five days times four hours make twenty cells, and the chart's title and description come from the props.
test("beş gün × dört saat: yirmi hücre, başlık ve açıklama", () => {
  const s = renderTest(() => <HeatmapLab />)
  const grid = s.get(".lab-grid")!
  expect(grid.querySelectorAll(".m-heat-cell").length).toBe(20)
  expect(grid.querySelector("svg title")!.textContent).toBe("Toplantı odası")
  expect(grid.querySelector("svg desc")!.textContent).toBe("Gün ve saate göre oda kullanımı")
})

// Clicking a cell selects it: onSelect ran, so the "picked" line no longer shows its starting text.
test("bir hücreye tıklamak onu seçer", async () => {
  const s = renderTest(() => <HeatmapLab />)
  s.get(".lab-grid .m-heat-cell")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).not.toBe("Seçilen: —")
})

// With no data the chart shows our `empty` content.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <HeatmapLab />)
  await s.click(".lab-empty")
  expect(s.sees("Kayıt yok")).toBe(true)
})

// The calendar heatmap draws four weeks of cells (more than twenty).
test("takvim dört haftayı çizer", () => {
  const s = renderTest(() => <HeatmapLab />)
  expect(s.get(".lab-cal")!.querySelectorAll(".m-heat-cell").length).toBeGreaterThan(20)
})
