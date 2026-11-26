// Tests for CodeEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CodeEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it (or has it as its label); s.click(target) clicks like a user (a visible text or an element)
//   and waits for the view to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { CodeEditorLab } from "./CodeEditorLab.tsx"

// `label` names the text field, `value` is in it, inputRef hands over the textarea (the Lab sets a data attribute on it),
// the foot line shows the `message` and the `hint` node is drawn at its end.
test("kod, alt satır mesajı, kendi ipucu ve inputRef yerinde", () => {
  const s = renderTest(() => <CodeEditorLab />)
  const input = s.find("Örnek kod") as HTMLTextAreaElement | null
  expect(input?.value).toContain("function add")
  expect(input?.getAttribute("data-lab")).toBe("input")
  expect(s.sees("Satır sayısı: 5")).toBe(true)
  expect(s.get(".lab-code .lab-hint")?.textContent).toBe("F12 · F2")
})

// lineNumbers draws one number per line; lineMarks puts a breakpoint mark on line 2, and activeLine lights a line. The
// button in the Lab moves the active line from 3 to 2 (activeLine is a getter).
test("satır numaraları, oluktaki işaret ve etkin satır", async () => {
  const s = renderTest(() => <CodeEditorLab />)
  const lines = s.all(".lab-code .m-ced-ln")
  expect(lines.length).toBe(5)
  expect(lines[1]?.className).toContain("is-breakpoint")
  expect(s.get(".lab-code .m-ced-lit")).not.toBe(null)
  await s.click("Etkin satır: 3")
  expect(s.sees("Etkin satır: 2")).toBe(true)
})

// With onMessage the foot message becomes a button; pressing it calls the handler, which the Lab shows.
test("onMessage: mesaj bir düğme olur, basınca çağrılır", async () => {
  const s = renderTest(() => <CodeEditorLab />)
  await s.click("Satır sayısı: 5")
  expect(s.sees("mesaja basıldı")).toBe(true)
})

// The one-line copy is read-only, and message={false} leaves out its foot bar: only the first editor has one.
test("tek satırlık kopya: alt çubuksuz ve salt okunur", () => {
  const s = renderTest(() => <CodeEditorLab />)
  expect(s.find("Tek satır")?.hasAttribute("readonly")).toBe(true)
  expect(s.all(".m-ced-foot").length).toBe(1)
})
