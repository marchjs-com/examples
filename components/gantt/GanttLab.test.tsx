// Tests for GanttLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <GanttLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.sees(text) says whether text is on screen, s.click(text) clicks like
//   a user and waits until the view has updated (so that test is async).
// - The tests check observable things (roles, aria-labels, visible text) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { GanttLab } from "./GanttLab.tsx"

// The chart takes its accessible name (role=grid), our class and our own column title from the props.
test("şema adını, sınıfını ve kendi sütun başlığını alır", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.get("[role=grid]")?.getAttribute("aria-label")).toBe("Yazı süreci")
  expect(s.get(".lab-gantt")).not.toBe(null)
  expect(s.sees("Adım")).toBe(true)
})

// barLabel adds the percent to each bar's text; the bar's accessible name still contains the task name.
test("barLabel çubuğun metnine yüzdeyi ekler", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.sees("Taslak · %80")).toBe(true)
  expect(s.get('[data-task="a"]')?.getAttribute("aria-label")).toContain("Taslak")
})

// The names column lists every task: one row header per task.
test("görev adları sütunu her görevi yazar", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.all("[role=rowheader]").length).toBe(3)
})

// The button flips `editable`; its text changes, which we read as the visible proof.
test("kilitle düğmesi metnini değiştirir", async () => {
  const s = renderTest(() => <GanttLab />)
  await s.click("Kilitle")
  expect(s.sees("Düzenlemeyi aç")).toBe(true)
})
