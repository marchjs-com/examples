// Tests for EditorFrameLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <EditorFrameLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it (or has it as its label); s.click(target) clicks like a user (a visible text or an element)
//   and waits for the view to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { EditorFrameLab } from "./EditorFrameLab.tsx"

// The extra attributes (id, data-kind) reach the frame, headProps / footProps put their class and aria attributes on the
// head and foot bars, and `actions` shows the letter count in the head bar.
test("üst ve alt çubuk, kendi sınıfları ve öznitelikleriyle çizilir", () => {
  const s = renderTest(() => <EditorFrameLab />)
  const frame = s.get("#lab-frame")
  expect(frame?.getAttribute("data-kind")).toBe("note")
  expect(frame?.querySelector(".lab-head")).not.toBe(null)
  expect(frame?.querySelector(".lab-foot")?.getAttribute("aria-live")).toBe("polite")
  expect(s.sees("7 harf")).toBe(true)
})

// showHead is a getter: when the Lab's signal turns it off the head bar is removed, and turning it on brings it back.
test("showHead erişimcisi üst çubuğu gizler ve geri getirir", async () => {
  const s = renderTest(() => <EditorFrameLab />)
  await s.click("Araçları gizle")
  expect(s.get("#lab-frame .lab-head")).toBe(null)
  await s.click("Araçları göster")
  expect(s.get("#lab-frame .lab-head")).not.toBe(null)
})

// readonly and disabled are getters too. readonly marks the frame (class is-readonly); disabled dims it (is-disabled)
// and the Lab also hides the foot bar with showFoot.
test("durum: salt okunur, sonra devre dışı (alt çubuk da gider)", async () => {
  const s = renderTest(() => <EditorFrameLab />)
  await s.click("Durum: edit")
  expect(s.get("#lab-frame")?.className).toContain("is-readonly")
  await s.click("Durum: readonly")
  expect(s.get("#lab-frame")?.className).toContain("is-disabled")
  expect(s.get("#lab-frame .lab-foot")).toBe(null)
})

// ring={false} leaves out the focus ring (class is-plain); showFoot={false} hides the foot bar, so its text is not on
// the page at all.
test("ring={false} halkasız, showFoot={false} foot'u gizler", () => {
  const s = renderTest(() => <EditorFrameLab />)
  expect(s.get(".lab-plain")?.className).toContain("is-plain")
  expect(s.sees("görünmez")).toBe(false)
})
