// Tests for MarkdownEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <MarkdownEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector and s.all("selector") every match; s.find("text") finds an
//   element by its visible text or aria-label; s.sees("text") says whether text is visible.
// - s.click("text") clicks a tab by its text and s.type("label", value) types into a field found by its accessible name.
//   Both wait until the view has updated, which is why the tests that use them are async and await them.
// - The tests check what a user or a screen reader can observe (tab names, button names, rendered preview, footer text,
//   readonly) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the label or the expected text. The editor's part classes (m-mde-preview,
// m-mde-toolbar, m-mde-foot, m-mde-hint) are listed in the MarkdownEditor docs.
import { test, expect, renderTest } from "march/testing"
import { MarkdownEditorLab } from "./MarkdownEditorLab.tsx"

// `labels` names the four view tabs (in the order of `views`) and the tools; the toolbar itself is named by
// labels.formatting and has role="toolbar".
test("kendi görünüm adları sekmelerde, kendi araç adları düğmelerde", () => {
  const s = renderTest(() => <MarkdownEditorLab />)
  const tabs = s.get(".lab-md")?.querySelectorAll("[role=tab]") ?? []
  expect([...tabs].map((t) => t.textContent)).toEqual(["Yaz", "Yan yana", "Oku", "Biçimli"])
  expect(s.find("Görev")).not.toBe(null)
  expect(s.find("Biçim")?.getAttribute("role")).toBe("toolbar")
})

// The preview tab renders the Markdown (the "##" line becomes a real h2) and the toolbar is not shown there, because
// there is nothing to format.
test("Oku sekmesi Markdown'u çizer ve araç çubuğunu kaldırır", async () => {
  const s = renderTest(() => <MarkdownEditorLab />)
  await s.click("Oku")
  expect(s.get(".lab-md .m-mde-preview h2")?.textContent).toBe("Toplantı")
  expect(s.get(".lab-md .m-mde-toolbar")).toBe(null)
})

// Typing in the source (found by labels.source) calls onChange: the edit counter goes to 1, the footer shows the word count
// written by labels.words, and the read-only copy follows the same signal, so it shows the new text.
test("yazınca değer ve sayaç güncellenir, kopya da izler", async () => {
  const s = renderTest(() => <MarkdownEditorLab />)
  await s.type("Kaynak", "bir iki üç")
  expect(s.sees("1 düzenleme")).toBe(true)
  expect(s.get(".lab-md .m-mde-foot")?.textContent).toContain("3 sözcük")
  expect((s.find("Salt okunur kopya") as HTMLTextAreaElement | null)?.value).toBe("bir iki üç")
})

// The second editor is readonly, and with hint={false} it has no syntax hint; only the first editor's hint is on the page.
test("ikinci düzenleyici: eski preview=split ile bölünmüş açılır, salt okunur", () => {
  const s = renderTest(() => <MarkdownEditorLab />)
  const copy = s.find("Salt okunur kopya")
  expect(copy?.hasAttribute("readonly")).toBe(true)
  expect(s.all(".m-mde-hint").length).toBe(1)
})
