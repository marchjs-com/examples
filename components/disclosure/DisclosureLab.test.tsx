// Tests for DisclosureLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DisclosureLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.click(target) clicks like
//   a user (a visible text or an element) and waits for the view to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DisclosureLab } from "./DisclosureLab.tsx"

// `open` follows the signal: the native <details> starts open, and a button that flips the signal closes it.
test("open sinyali details'in açık durumunu sürer", async () => {
  const s = renderTest(() => <DisclosureLab />)
  const d = s.get(".lab-live") as HTMLDetailsElement
  expect(d.open).toBe(true)
  await s.click(".lab-flip")
  expect(d.open).toBe(false)
})

// marker={false} marks the root with a class and draws no arrow element.
test("marker={false} oku kaldırır", () => {
  const s = renderTest(() => <DisclosureLab />)
  expect(s.get(".lab-plain")?.classList.contains("m-disclosure-no-marker")).toBe(true)
  expect(s.get(".lab-plain .m-disclosure-chev")).toBe(null)
})

// A node passed as `marker` is drawn in place of the default arrow.
test("kendi işaretin ok yerine çizilir", () => {
  const s = renderTest(() => <DisclosureLab />)
  expect(s.get(".lab-own .m-disclosure-marker")).not.toBe(null)
})
