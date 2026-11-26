import { test, expect, renderTest } from "march/testing"
import { RadialBarChartLab } from "./RadialBarChartLab.tsx"

// Tests for RadialBarChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the rings and the center, selection, the empty state and the "everything off" gauge, so a change to
// RadialBarChart that breaks any of them shows up here first.

// Proves rows become rings and rowMax works: three habits give three rings, and with no ring active the center
// shows the first ring's share of its own goal: 120 / 300 = 40 %. A wrong max would give a different number.
test("üç alışkanlık üç halka; ortada ilk halkanın yüzdesi", () => {
  const s = renderTest(() => <RadialBarChartLab />)
  const rings = s.get(".lab-rings")!
  expect(rings.querySelectorAll(".m-radial-ring").length).toBe(3)
  expect(rings.querySelector(".m-radial-center-value")!.textContent).toBe("%40")
})

// Proves onSelect: a click on the first ring calls it with that ring's label and share.
// s.flush() waits for the reactive update before reading the text.
test("bir halkaya tıklamak onu yüzdesiyle seçer", async () => {
  const s = renderTest(() => <RadialBarChartLab />)
  s.get(".lab-rings .m-radial-ring")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Okuma %40")
})

// Proves the empty state: emptying the data shows the `empty` text instead of a broken chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <RadialBarChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Hedef yok")).toBe(true)
})

// Proves the off switches: track={false}, labels={false} and center={false} really remove those parts from the DOM,
// not just hide them.
test("göstergede iz, etiket ve orta yok", () => {
  const s = renderTest(() => <RadialBarChartLab />)
  expect(s.get(".lab-gauge .m-radial-track")).toBe(null)
  expect(s.get(".lab-gauge .m-radial-label")).toBe(null)
  expect(s.get(".lab-gauge .m-radial-center")).toBe(null)
})
