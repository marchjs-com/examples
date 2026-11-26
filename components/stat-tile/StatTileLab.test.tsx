// Tests for StatTileLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StatTileLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.find(text) look up one element by CSS selector or by visible text; s.sees(text) says whether
//   the text is on the page.
// - s.click(el) clicks like a user and waits until the view has updated, so a test that clicks is async and awaits it.
//   s.wait(ms) pauses when the thing being checked is animated (here the rolling number).
// - The tests check what a user or a screen reader can observe (the element type, href, disabled, visible text)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. The part classes (.lab-value, .lab-label)
// come from the `partClass` prop used in StatTileLab.
import { test, expect, renderTest } from "march/testing"
import { StatTileLab } from "./StatTileLab.tsx"

// A tile with onClick is rendered as a real <button>. Pressing it increments the counter, and the tile whose value is
// an accessor ($n * 10) shows the new figure, which proves the value stays live. The 400 ms wait is for the rolling
// of the number.
test("onClick düğme yapar; basınca sayaç ve erişimci değer artar", async () => {
  const s = renderTest(() => <StatTileLab />)
  const b = s.get(".lab-btn")!
  expect(b.tagName).toBe("BUTTON")
  await s.click(b)
  await s.wait(400)
  expect(s.sees("80")).toBe(true)
})

// `href` makes the tile a link (an <a> with that href) and `disabled` makes the button really disabled, so a user
// or assistive technology cannot activate it. We look the tiles up by their visible text, like a user would.
test("href bağlantı yapar; disabled düğme basılamaz", () => {
  const s = renderTest(() => <StatTileLab />)
  expect(s.find("Rapor")!.closest("a")!.getAttribute("href")).toBe("#rapor")
  expect((s.find("Kapalı")!.closest("button") as HTMLButtonElement).disabled).toBe(true)
})

// `term` renders a <dt> (the label) and a <dd> (the value) inside a <dl>. `partClass` puts our own class on each part
// and the extra attributes (id, data-*) go to the root, which a host page can rely on.
test("term dl içinde dt + dd çizer; partClass ve öznitelikler yazılır", () => {
  const s = renderTest(() => <StatTileLab />)
  const dl = s.get(".lab-dl")!
  expect(dl.querySelector("dt")!.classList.contains("lab-label")).toBe(true)
  expect(dl.querySelector("dd")!.classList.contains("lab-value")).toBe(true)
  expect(s.get("[data-kind=ayrıntı]")).not.toBe(null)
})
