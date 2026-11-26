import { test, expect, renderTest } from "march/testing"
import { BulletChartLab } from "./BulletChartLab.tsx"

// Tests for BulletChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the marks of every row, selection with its range, the empty state and the single-object form, so a
// change to BulletChart that breaks any of them shows up here first.

// Proves the row structure: three measures give three rows, and each row draws its three range bands (9 in all), one
// target tick and one "previous" marker. A missing key or a mis-read `ranges` list would change one of the counts.
test("üç ölçü üç satır; her birinde üç bant, hedef ve geçen hafta", () => {
  const s = renderTest(() => <BulletChartLab />)
  const b = s.get(".lab-bullet")!
  expect(b.querySelectorAll(".m-bullet-row").length).toBe(3)
  expect(b.querySelectorAll(".m-bullet-range").length).toBe(9)
  expect(b.querySelectorAll(".m-bullet-target").length).toBe(3)
  expect(b.querySelectorAll(".m-bullet-prev").length).toBe(3)
})

// Proves onSelect and the range lookup: a click on the first row (revenue 240 with ends 150 / 220 / 300) reports the
// row and the band its value falls in, named by rangeLabels (the third, "good" band). s.flush() waits for the
// reactive update before reading the text.
test("bir satıra tıklamak onu bandıyla seçer", async () => {
  const s = renderTest(() => <BulletChartLab />)
  s.get(".lab-bullet .m-bullet-row")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Ciro · İyi")
})

// Proves the empty state: emptying the data shows the `empty` text instead of a broken or blank chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <BulletChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Ölçü yok")).toBe(true)
})

// Proves the single-object form: `data` given as one object (not an array) draws exactly one row, a vertical column
// here, and its name is read from the default `label` key.
test("tek nesne tek sütun çizer, adı altında", () => {
  const s = renderTest(() => <BulletChartLab />)
  expect(s.get(".lab-mini")!.querySelectorAll(".m-bullet-row").length).toBe(1)
  expect(s.get(".lab-mini .m-bullet-name")!.textContent).toBe("Pil")
})
