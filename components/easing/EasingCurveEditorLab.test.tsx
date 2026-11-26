// Tests for EasingCurveEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <EasingCurveEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it; s.click(target) clicks like a user (a visible text or an element) and waits for the view
//   to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { EasingCurveEditorLab } from "./EasingCurveEditorLab.tsx"

// `labels` replace the built-in texts: the editor's accessible name (aria-label), the two handles (each a role="slider")
// and the preset group.
test("kendi adları: grup, tutamaklar ve hazır eğri grubu", () => {
  const s = renderTest(() => <EasingCurveEditorLab />)
  expect(s.get(".lab-main")?.getAttribute("aria-label")).toBe("Laboratuvar eğrisi")
  expect(s.find("Baş tutamak")?.getAttribute("role")).toBe("slider")
  expect(s.find("Son tutamak")).not.toBe(null)
  expect(s.find("Benim eğrilerim")).not.toBe(null)
})

// Pressing one of our own presets sets the curve value, and onChange runs once (the Lab counts it).
test("hazır eğriye basınca değer değişir, onChange sayar", async () => {
  const s = renderTest(() => <EasingCurveEditorLab />)
  await s.click("Fırla")
  expect(s.sees("cubic-bezier(.2, 1.4, .4, 1)")).toBe(true)
  expect(s.sees("değişiklik: 1")).toBe(true)
})

// With `name` the curve is registered in the motion engine; the note that says so uses our own text from labels.registered.
test("name ile kayıt notu kendi metniyle", () => {
  const s = renderTest(() => <EasingCurveEditorLab />)
  expect(s.sees('"lab-egri" adıyla kaydedildi')).toBe(true)
})

// The bare editor leaves out the presets, the number fields and the CSS line, and `readonly` marks the root, so the
// test checks that those parts are not rendered at all.
test("yalın editör: hazır eğri, sayı alanı ve CSS satırı yok; salt okunur", () => {
  const s = renderTest(() => <EasingCurveEditorLab />)
  const bare = s.get(".lab-bare")
  expect(bare?.querySelector(".m-ec-presets")).toBe(null)
  expect(bare?.querySelector(".m-ec-inputs")).toBe(null)
  expect(bare?.querySelector(".m-ec-css")).toBe(null)
  expect(bare?.classList.contains("is-readonly")).toBe(true)
})
