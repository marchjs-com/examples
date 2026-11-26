// Tests for ButtonLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ButtonLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(text) finds a button by its visible text, clicks it like a user, waits until the view has updated and
//   returns the clicked element (so every test that clicks is async and awaits it). s.sees(text) says whether text is
//   on screen, s.text() is all visible text and s.find(text) finds an element by its text.
// - The tests check what a user or a screen reader can observe (visible text, aria-pressed, the disabled attribute)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the text you click or expect.
import { test, expect, renderTest } from "march/testing"
import { ButtonLab } from "./ButtonLab.tsx"

// A toggle button: `pressed` follows the state, so after the click the label changes and aria-pressed is "true".
test("Beğen'e basınca Beğenildi olur, basılı durur", async () => {
  const s = renderTest(() => <ButtonLab />)
  const like = await s.click("Beğen")
  expect(s.sees("Beğenildi")).toBe(true)
  expect(like.getAttribute("aria-pressed")).toBe("true")
})

// The submit button sits inside a Form: each click submits it, onSubmit raises the counter in the label, and the
// test clicks by the label that is current at that moment.
test("Gönder her basışta sayacı bir artırır", async () => {
  const s = renderTest(() => <ButtonLab />)
  await s.click("Gönder (0)")
  await s.click("Gönder (1)")
  expect(s.text()).toContain("Gönder (2)")
})

// `disabled` makes the real <button> disabled, so it cannot be pressed or focused by keyboard. The text lives in an
// inner label element, so the test goes up to the closest button.
test("Silinemez düğmesi devre dışı", () => {
  const s = renderTest(() => <ButtonLab />)
  const del = s.find("Silinemez")?.closest("button")
  expect(del?.hasAttribute("disabled")).toBe(true)
})
