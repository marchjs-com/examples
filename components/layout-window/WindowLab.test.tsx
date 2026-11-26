// Tests for WindowLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <WindowLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.sees("text") says whether text is visible; s.find("text") finds an element by its visible text or aria-label (a
//   button is found by the name we gave it in `labels`); s.get("selector") and s.all("selector") use CSS selectors.
// - s.click("text") clicks like a user and waits until the view has updated, which is why the test that clicks is
//   async and awaits it.
// - The tests check what a user or a screen reader can observe (text, accessible names, the hidden attribute, which
//   buttons exist) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. Window's part classes (.m-win-bar,
// .m-win-btn…) are listed in the Window docs.
import { test, expect, renderTest } from "march/testing"
import { WindowLab } from "./WindowLab.tsx"

// The window draws its title and content, and onStateChange has not fired yet, so the state is still "normal".
test("pencere başlığını ve içeriğini çizer", () => {
  const s = renderTest(() => <WindowLab />)
  expect(s.sees("Rapor")).toBe(true)
  expect(s.get(".lab-state")?.textContent).toBe("Durum: normal")
})

// `labels` gives the close button its accessible name, so a screen reader (and this test) can find it by that name.
test("labels kapat düğmesinin adını verir", () => {
  const s = renderTest(() => <WindowLab />)
  expect(s.find("Raporu kapat")).not.toBe(null)
})

// The second window turns every button off, so its title bar has no buttons; the title itself is still drawn.
test("closable={false} kapat düğmesini kaldırır", () => {
  const s = renderTest(() => <WindowLab />)
  expect(s.get(".lab-fixed")?.textContent).toContain("Sabit")
  expect(s.all(".lab-fixed button").length).toBe(0)
})

// Pressing close calls onClose (the counter in the Lab goes to 1), which sets open to false. A closed Window stays in
// the DOM with the hidden attribute (it is not removed), and the Lab's button reopens it.
test("kapat düğmesi onClose'u çağırır, open kapanır ve düğmeyle yeniden açılır", async () => {
  const s = renderTest(() => <WindowLab />)
  await s.click("Raporu kapat")
  expect(s.get(".lab-closes")?.textContent).toBe("Kapatma: 1")
  // open={false}: the window stays in the DOM and is hidden.
  expect(s.get(".lab-win")?.hasAttribute("hidden")).toBe(true)
  await s.click("Raporu aç")
  expect(s.get(".lab-win")?.hasAttribute("hidden")).toBe(false)
})
