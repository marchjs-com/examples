// Tests for GridLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <GridLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.all(selector) returns every matching element, s.get(selector) the first one.
// - Grid is pure CSS, so a test cannot measure the layout. It checks what is observable: how many tiles each grid renders
//   and which class the grid carries for the chosen mode (the CSS does the rest).
import { test, expect, renderTest } from "march/testing"
import { GridLab } from "./GridLab.tsx"

// Every grid renders all its tiles (5 and 4).
test("her ızgara bütün kartlarını çizer", () => {
  const s = renderTest(() => <GridLab />)
  expect(s.all(".lab-cols .sc-tile").length).toBe(5)
  expect(s.all(".lab-min .sc-tile").length).toBe(4)
})

// fill="last" puts the matching class on the grid; the CSS gives the last row's space to its last item.
test("fill son satırın sınıfını verir", () => {
  const s = renderTest(() => <GridLab />)
  expect(s.get(".lab-last")?.className).toContain("m-grid-fill-last")
})

// balance puts the balance class on the grid; the CSS picks the even column count.
test("balance ızgarayı dengeli kipe alır", () => {
  const s = renderTest(() => <GridLab />)
  expect(s.get(".lab-balance")?.className).toContain("m-grid-balance")
})
