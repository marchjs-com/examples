import { test, expect, renderTest } from "march/testing"
import { ChordChartLab } from "./ChordChartLab.tsx"

// Tests for ChordChartLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check arcs and ribbons in the directed and undirected forms, selection, and the empty state, so a change to
// ChordChart that breaks any of them shows up here first.

// Proves the directed flow form: three people give three arcs, five directed rows give five separate ribbons (the two
// directions of a pair are not merged), and the `title` prop names the SVG for screen readers.
test("üç kişi üç yay; yönlü beş akış beş şerit", () => {
  const s = renderTest(() => <ChordChartLab />)
  const chart = s.get(".lab-flows")!
  expect(chart.querySelectorAll(".m-chord-arc").length).toBe(3)
  expect(chart.querySelectorAll(".m-chord-ribbon").length).toBe(5)
  expect(chart.querySelector("svg title")!.textContent).toBe("Hediyeleşme")
})

// Proves onSelect for a group: a click on the first arc (the first name, Ada) reports that group. s.flush() waits for
// the reactive update before reading the text.
test("bir yaya tıklamak onu seçer", async () => {
  const s = renderTest(() => <ChordChartLab />)
  s.get(".lab-flows .m-chord-group")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Ada")
})

// Proves the undirected matrix form: a symmetric 3 × 3 matrix gives one ribbon per pair (three), and labels={false}
// really removes the names from the rim.
test("yönsüz matris: her çifte bir şerit, adlar kapalı", () => {
  const s = renderTest(() => <ChordChartLab />)
  expect(s.get(".lab-matrix")!.querySelectorAll(".m-chord-ribbon").length).toBe(3)
  expect(s.get(".lab-matrix .m-chord-label")).toBe(null)
})

// Proves the empty state: emptying the data shows the `empty` text instead of a broken or blank chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <ChordChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Hediye yok")).toBe(true)
})
