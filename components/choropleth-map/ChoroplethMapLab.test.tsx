import { test, expect, renderTest } from "march/testing"
import { ChoroplethMapLab } from "./ChoroplethMapLab.tsx"

// Tests for ChoroplethMapLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They use the greenhouse map (own shapes, drawn at once, no map chunk to wait for) for the regions, classes,
// selection and the legend filter, and the main map for the empty state, so a change to ChoroplethMap that breaks any
// of them shows up here first.

// Proves own shapes and bins: the three rooms become three regions, and two thresholds give three classes in the
// legend.
test("seranın üç bölmesi üç bölge; sınıflar açıklamada", () => {
  const s = renderTest(() => <ChoroplethMapLab />)
  expect(s.get(".lab-rooms")!.querySelectorAll(".m-choropleth-region").length).toBe(3)
  expect(s.get(".lab-rooms")!.querySelectorAll(".m-choropleth-class").length).toBe(3)
})

// Proves onSelect: a click on the first room reports its name. s.flush() waits for the reactive update before
// reading the text.
test("bir bölmeye tıklamak onu seçer", async () => {
  const s = renderTest(() => <ChoroplethMapLab />)
  s.get(".lab-rooms .m-choropleth-region")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Domates")
})

// Proves the empty state: emptying the main map's data shows the `empty` text instead of a blank map.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <ChoroplethMapLab />)
  await s.click(".lab-empty")
  expect(s.sees("Veri yok")).toBe(true)
})

// Proves the legend filter: clicking a class highlights its regions by dimming the others, which is how readers find
// "all the hot rooms" on a busy map.
test("bir sınıfa tıklamak diğer bölmeleri soldurur", async () => {
  const s = renderTest(() => <ChoroplethMapLab />)
  await s.click(".lab-rooms .m-choropleth-class")
  expect(s.get(".lab-rooms .m-choropleth-dim")).not.toBe(null)
})
