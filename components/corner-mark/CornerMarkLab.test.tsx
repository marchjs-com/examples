// Tests for CornerMarkLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CornerMarkLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(name) finds the element with that accessible name or text; s.get(selector) finds one element; s.sees(text)
//   says whether a text is visible.
// - The tests check what a screen reader or a stylesheet can observe (role, aria-hidden, the documented state classes
//   for corner, size, ring, overlap and show) rather than pixel positions.
import { test, expect, renderTest } from "march/testing"
import { CornerMarkLab } from "./CornerMarkLab.tsx"

// With a `label` the mark is an image for assistive technology (role="img", named by the label); corner and size become
// classes of the mark.
test("label verilince role=img ve adı; köşe ve boyut sınıfı", () => {
  const s = renderTest(() => <CornerMarkLab />)
  const m = s.find("Video (bottom-start)")
  expect(m?.getAttribute("role")).toBe("img")
  expect(m?.classList.contains("m-corner-mark-bottom-start")).toBe(true)
  expect(m?.classList.contains("m-corner-mark-lg")).toBe(true)
})

// Without a label the mark is decoration and hidden from screen readers; ring and overlap show as state classes.
test("label yoksa süs: aria-hidden; ring ve overlap sınıfları", () => {
  const s = renderTest(() => <CornerMarkLab />)
  const b = s.get(".lab-badge")
  expect(b?.getAttribute("aria-hidden")).toBe("true")
  expect(b?.classList.contains("is-ringed")).toBe(true)
  expect(b?.classList.contains("is-overlap")).toBe(true)
})

// show="hover" adds the is-hover class (the mark appears when its host is hovered or has focus), and children are drawn
// as the mark's content (the text 4K).
test("show=hover ve children içerik", () => {
  const s = renderTest(() => <CornerMarkLab />)
  expect(s.get(".lab-hover")?.classList.contains("is-hover")).toBe(true)
  expect(s.sees("4K")).toBe(true)
})
