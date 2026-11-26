// Tests for BarChartLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <BarChartLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns one element, s.sees(text) says whether text is on screen, s.click(selector) clicks like a
//   user and waits until the view has updated (so those tests are async and await it), and s.flush() waits for pending
//   updates after you dispatched an event yourself.
// - The tests check what a user or a screen reader can observe (how many bars exist, the SVG title and description,
//   visible text) rather than internal state. Chart parts have classes such as .m-chart-bar, listed in the docs.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { BarChartLab } from "./BarChartLab.tsx"

// Six months with two series make twelve bars. `title` and `description` become the SVG's <title> and <desc>, which
// is the chart's accessible name and description.
test("altı ay iki seri: on iki çubuk, başlık ve açıklama", () => {
  const s = renderTest(() => <BarChartLab />)
  const chart = s.get(".lab-bars")!
  expect(chart.querySelectorAll(".m-chart-bar").length).toBe(12)
  expect(chart.querySelector("svg title")!.textContent).toBe("Üye artışı")
  expect(chart.querySelector("svg desc")!.textContent).toBe("Ay ay yeni ve eski üyeler")
})

// onSelect: a click on a bar reports its point; the Lab prints it. The click event is dispatched by hand (bubbling,
// like a real one) and s.flush() waits for the text to update.
test("bir çubuğa tıklamak onu seçer", async () => {
  const s = renderTest(() => <BarChartLab />)
  s.get(".lab-bars .m-chart-bar")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Oca")
})

// When the data becomes an empty list the chart shows the `empty` content instead of bars.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <BarChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Henüz veri yok")).toBe(true)
})

// The second chart (stacked and horizontal, with the legend and grid off) still draws one bar per month and series.
test("yığılmış yatay grafik de on iki çubuk çizer", () => {
  const s = renderTest(() => <BarChartLab />)
  expect(s.get(".lab-stack")!.querySelectorAll(".m-chart-bar").length).toBe(12)
})
