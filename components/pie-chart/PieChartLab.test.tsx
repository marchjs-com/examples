// Tests for PieChartLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PieChartLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds an element by CSS selector (the Lab gives the charts and buttons their own classes), s.sees(text)
//   says whether text is visible, s.click(selector) clicks like a user, and s.flush() waits until the view has updated.
//   Whatever awaits is why those tests are async.
// - A slice is clicked by dispatching a real click event on it, because the slices are SVG shapes, not buttons with names.
// - The tests check the DOM contract (slice count, center text, the selection the Lab prints), not the pixel shapes.
//   The part class names (.m-chart-slice, .m-chart-center) are listed in the PieChart docs.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { PieChartLab } from "./PieChartLab.tsx"

// Four data rows are four slices, and `center` replaces the default total in the middle of the donut.
test("dört kalem dört dilim; ortada kendi yazısı", () => {
  const s = renderTest(() => <PieChartLab />)
  const pie = s.get(".lab-pie")!
  expect(pie.querySelectorAll(".m-chart-slice").length).toBe(4)
  expect(pie.querySelector(".m-chart-center")!.textContent).toBe("4 kalem")
})

// onSelect gets the clicked slice with its label and share; the Lab prints it. The first slice is the first row.
test("bir dilime tıklamak onu payıyla seçer", async () => {
  const s = renderTest(() => <PieChartLab />)
  s.get(".lab-pie .m-chart-slice")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Kira")
})

// The data is a function: when it returns an empty array, the `empty` content is shown instead of the chart.
test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <PieChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Harcama yok")).toBe(true)
})

// donut={false} draws a plain pie, so there is no hole and no center content.
test("düz pastanın ortası yok", () => {
  const s = renderTest(() => <PieChartLab />)
  expect(s.get(".lab-plain .m-chart-center")).toBe(null)
})
