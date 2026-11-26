// Tests for SplitterLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SplitterLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null) by CSS selector; the class given to each Splitter in the Lab (lab-live, lab-fixed) scopes
//   the selector to one instance.
// - s.click("name") clicks the control with that visible text and waits until the view has updated, which is why the test that clicks is async.
// - The tests check what a user or a screen reader can observe (the handle's role, name and value, the printed share) rather than
//   internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { SplitterLab } from "./SplitterLab.tsx"

// The handle is a role="separator" with the label as its accessible name and its value as aria-valuenow, in percent: the controlled share
// 0.3 is 30.
test("tutamaç bir ayırıcı: adı ve değeri var", () => {
  const s = renderTest(() => <SplitterLab />)
  const sep = s.get(".lab-live [role=separator]")
  expect(sep?.getAttribute("aria-label")).toBe("Denetimli pay")
  expect(sep?.getAttribute("aria-valuenow")).toBe("30")
})

// Controlled mode: the Lab owns the share (value + onChange). Pressing the button sets the signal and the text that reads it shows the new
// share, which proves the Lab's value, not only the user's drag, drives the Splitter.
test("value denetimli: düğme payı değiştirir", async () => {
  const s = renderTest(() => <SplitterLab />)
  await s.click("Payı %70 yap")
  expect(s.get(".lab-share")?.textContent).toBe("%70")
})

// handle={false} leaves a plain divider: it gets the "fixed" state class and, because it cannot be moved, its separator has no aria-valuenow.
test("handle={false} sürüklenmeyen düz bir ayraç bırakır", () => {
  const s = renderTest(() => <SplitterLab />)
  expect(s.get(".lab-fixed .m-split-handle")?.classList.contains("is-fixed")).toBe(true)
  expect(s.get(".lab-fixed [role=separator]")?.hasAttribute("aria-valuenow")).toBe(false)
})
