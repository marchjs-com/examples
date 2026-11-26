// Tests for SpinnerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SpinnerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find("name") finds an element by its visible text or aria-label (a Spinner's label is its aria-label), s.get(selector) finds one
//   element (or null) by CSS selector.
// - s.click("name") clicks the control with that name and waits until the view has updated, which is why the test that clicks is async.
// - The tests check what a user or a screen reader can observe (role, accessible name, aria-hidden) and the data attributes that carry
//   the colour choice, rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { SpinnerLab } from "./SpinnerLab.tsx"

// A Spinner is a role="status" element and its label is its accessible name, so a screen reader hears what is loading.
test("halka role=status ve adıyla okunur", () => {
  const s = renderTest(() => <SpinnerLab />)
  const sp = s.find("Boyut lg")
  expect(sp?.getAttribute("role")).toBe("status")
})

// decorative hides the ring from assistive technology: aria-hidden is set and there is no role (and no label).
test("decorative halka yardımcı teknolojiden gizli, rolü yok", () => {
  const s = renderTest(() => <SpinnerLab />)
  const em = s.get(".lab-em")
  expect(em?.getAttribute("aria-hidden")).toBe("true")
  expect(em?.hasAttribute("role")).toBe(false)
})

// A list given to `colors` is reported as a "custom" paint, and `color` writes its one token as the common colour attribute.
test("renk listesi custom, color tek renk", () => {
  const s = renderTest(() => <SpinnerLab />)
  expect(s.get(".lab-pair")?.getAttribute("data-m-colors")).toBe("custom")
  expect(s.get(".lab-orange")?.getAttribute("data-m-color")).toBe("brand-orange")
})

// `label` may be a function (an accessor): the accessible name follows the Lab's counter when the button is pressed.
test("label erişimcisi canlı", async () => {
  const s = renderTest(() => <SpinnerLab />)
  expect(s.get(".lab-count")?.getAttribute("aria-label")).toBe("3 dosya kaldı")
  await s.click("Bir dosya bitti")
  expect(s.get(".lab-count")?.getAttribute("aria-label")).toBe("2 dosya kaldı")
})
