// Tests for StatusBarLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StatusBarLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.sees(text) says whether a text is on the page; s.get(selector) finds an element; s.click(text) clicks the
//   element with that text like a user and waits until the view has updated (so a test that clicks is async and
//   awaits it).
// - The tests check what a user or a screen reader can observe (visible text, the accessible name of the bar) rather
//   than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the text or the selector. .lab-bar is the class given to the bar in StatusBarLab.
import { test, expect, renderTest } from "march/testing"
import { StatusBarLab } from "./StatusBarLab.tsx"

// The items are drawn, and the `label` prop becomes the accessible name (aria-label) of the bar's region.
test("öğeler çizilir, çubuğun adı label", () => {
  const s = renderTest(() => <StatusBarLab />)
  expect(s.sees("Hazır")).toBe(true)
  expect(s.get(".lab-bar")?.getAttribute("aria-label")).toBe("Durum")
})

// An item with onSelect is a button: clicking the counter item runs the handler, and since its text is a function the
// text goes from zero clicks to one.
test("onSelect'li öğe düğmedir ve basılınca çalışır", async () => {
  const s = renderTest(() => <StatusBarLab />)
  await s.click("0 tık")
  expect(s.sees("1 tık")).toBe(true)
})
