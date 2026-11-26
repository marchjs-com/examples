import { test, expect, renderTest } from "march/testing"
import { GanttLab } from "./GanttLab.tsx"

// Tests for GanttLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the accessible name, custom labels, the name column, the editable switch and the enter / exit motion, so
// a change to Gantt that breaks any of them shows up here first.

// Proves `label` names the grid for screen readers, `class` reaches the root, and `labels.task` replaces the header of
// the name column (the Lab's own word for "step" instead of the built-in text).
test("şema adını, sınıfını ve kendi sütun başlığını alır", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.get("[role=grid]")?.getAttribute("aria-label")).toBe("Yazı süreci")
  expect(s.get(".lab-gantt")).not.toBe(null)
  expect(s.sees("Adım")).toBe(true)
})

// Proves `barLabel` sets the visible content of a bar (name + percent), while the bar's accessible name still carries
// the task name.
test("barLabel çubuğun metnine yüzdeyi ekler", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.sees("Taslak · %80")).toBe(true)
  expect(s.get('[data-task="a"]')?.getAttribute("aria-label")).toContain("Taslak")
})

// Proves `names` draws the pinned name column with one row header per task (three tasks, three headers).
test("görev adları sütunu her görevi yazar", () => {
  const s = renderTest(() => <GanttLab />)
  expect(s.all("[role=rowheader]").length).toBe(3)
})

// Proves the lock button toggles its state: after one click its text says editing can be switched back on. s.click
// accepts visible text as well as a selector.
test("kilitle düğmesi metnini değiştirir", async () => {
  const s = renderTest(() => <GanttLab />)
  await s.click("Kilitle")
  expect(s.sees("Düzenlemeyi aç")).toBe(true)
})

// Proves the enter / exit motion: adding the print task gives a fourth row and its bar; removing it takes the row
// away at once, but its bar stays as .is-leaving while it fades out, and is gone once the animation has finished.
test("animate: eklenen adım büyüyerek gelir, kaldırılan solarak gider", async () => {
  const s = renderTest(() => <GanttLab />)
  const q = (sel: string) => s.container.querySelector<HTMLElement>(sel), qa = (sel: string) => [...s.container.querySelectorAll(sel)]
  await s.click(q(".lab-print")!)
  expect(qa("[role=rowheader]").length).toBe(4)
  expect(q('[data-task="p"]')).toBeTruthy()
  await s.click(q(".lab-print")!)
  expect(qa("[role=rowheader]").length).toBe(3)
  expect(q(".m-gantt-bar.is-leaving")).toBeTruthy()
  // Wait longer than the 450 ms animation so the leaving bar has been removed.
  await new Promise((r) => setTimeout(r, 1200))
  expect(q(".m-gantt-bar.is-leaving")).toBe(null)
})
