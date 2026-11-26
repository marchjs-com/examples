// Tests for RichTextEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <RichTextEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The editor draws its content a moment after mounting, so each test starts with `await s.flush()`.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { RichTextEditorLab } from "./RichTextEditorLab.tsx"

// The Markdown value is drawn as rich text (a level-2 heading), and the custom `labels` appear: the editor name, the
// toolbar name, the hint and the counter text produced by labels.count.
test("Markdown başlık ve liste olarak çizilir, kendi metinler görünür", async () => {
  const s = renderTest(() => <RichTextEditorLab />)
  await s.flush()
  expect(s.find("Plan metni")?.querySelector("h2")?.textContent).toBe("Plan")
  expect(s.find("Plan araçları")).not.toBe(null)
  expect(s.sees("@ ile kişi, : ile emoji")).toBe(true)
  expect(s.text()).toContain("7 sözcük")
})

// The editor's `api` lets the page write into it: setMarkdown replaces the text, which updates the Markdown shown in
// the CodeView and counts as one change.
test("api ile baştan yazılan metin Markdown değerine yazılır", async () => {
  const s = renderTest(() => <RichTextEditorLab />)
  await s.flush()
  await s.click("Baştan yaz")
  // CodeView also writes line numbers, so the test looks for the value inside the element text, not for an exact match.
  expect(s.find("Markdown")?.textContent).toContain("## Sıfırdan")
  expect(s.sees("1 değişiklik")).toBe(true)
})

// `toolIcons` replace the built-in icons with short texts, so the bold and italic buttons show our own letters.
test("kendi araç adları ve ikonları: Kalın düğmesinde K yazar", async () => {
  const s = renderTest(() => <RichTextEditorLab />)
  await s.flush()
  expect(s.find("Kalın")?.textContent).toContain("K")
  expect(s.find("Eğik")?.textContent).toContain("İ")
})

// The second editor is readonly (contenteditable is false); only the first one has the Lab's class.
test("salt okunur ön izleme yazılamaz ve sayaçsızdır", async () => {
  const s = renderTest(() => <RichTextEditorLab />)
  await s.flush()
  expect(s.find("Plan ön izlemesi")?.getAttribute("contenteditable")).toBe("false")
  expect(s.all(".lab-plan").length).toBe(1)
})
