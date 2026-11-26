// Tests for SparklineLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SparklineLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null) by CSS selector. s.click(".selector") clicks the element that matches and waits
//   until the view has updated, which is why the tests that click are async and await it.
// - A Sparkline is an svg with role="img", so its accessible name (aria-label: the title plus a summary of the values) is the
//   main thing a screen reader user gets; the tests read it, together with the parts that are drawn (the area, the last-point
//   marker) and the size attributes.
// To adapt them: copy one test, change the selector or the expected text. The part classes (.m-chart-area, .m-chart-marker)
// are the classes Sparkline puts on its own parts.
import { test, expect, renderTest } from "march/testing"
import { SparklineLab } from "./SparklineLab.tsx"

// `area` draws the filled area; the accessible name starts with the title and the summary is formatted with `format`, so the
// unit text ("adet") shows up in it.
test("çizgi ve alan çizilir; ekran okuyucu özeti biçimli", () => {
  const s = renderTest(() => <SparklineLab />)
  const svg = s.get(".lab-nums svg")!
  expect(svg.querySelector(".m-chart-area")).toBeTruthy()
  expect(svg.getAttribute("aria-label")!).toContain("Satış")
  expect(svg.getAttribute("aria-label")!).toContain("adet")
})

// The data is a function of a signal: adding a value redraws the line and the summary in the accessible name changes
// (it names the number of values and the last value, for example).
test("değer eklenince özet güncellenir", async () => {
  const s = renderTest(() => <SparklineLab />)
  const before = s.get(".lab-nums svg")!.getAttribute("aria-label")
  await s.click(".lab-add")
  expect(s.get(".lab-nums svg")!.getAttribute("aria-label")).not.toBe(before)
})

// With no data the name is the title followed by the `empty` text, so a screen reader still hears what the chart is and that it
// has nothing to show.
test("veri boşalınca boş metni söylenir", async () => {
  const s = renderTest(() => <SparklineLab />)
  await s.click(".lab-empty")
  expect(s.get(".lab-nums svg")!.getAttribute("aria-label")).toBe("Satış: Satış yok")
})

// dot={false} hides the marker on the last point, and width is written as the svg's width attribute.
test("dot={false}: son nokta gizli; boyut yazılır", () => {
  const s = renderTest(() => <SparklineLab />)
  const obj = s.get(".lab-obj svg")!
  expect(obj.querySelector(".m-chart-marker")!.getAttribute("visibility")).toBe("hidden")
  expect(obj.getAttribute("width")).toBe("120")
})
