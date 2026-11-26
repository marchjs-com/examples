// Tests for JsonEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <JsonEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(name, text) types into the field with that accessible name (here the editor's text view), s.click(name) clicks
//   like a user, s.sees(text) says whether text is on screen, s.find(name) finds an element by its name.
// - The tests check what a user can observe (messages, tab roles, the text in the field) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { JsonEditorLab } from "./JsonEditorLab.tsx"

// A schema problem is shown with its path and our own `more` text; the view switcher uses our label and is a tablist.
test("şema sorunu ilk sorunla ve kendi 'more' metniyle yazılır", () => {
  const s = renderTest(() => <JsonEditorLab />)
  expect(s.sees("/port")).toBe(true)
  expect(s.sees("(+1 sorun daha)")).toBe(true)
  expect(s.find("Kaynak")?.getAttribute("role")).toBe("tab")
})

// Typing invalid JSON shows our invalid text, and onChange is counted.
test("bozuk JSON kendi invalid metnini gösterir", async () => {
  const s = renderTest(() => <JsonEditorLab />)
  await s.type("Sunucu ayarı", '{ "name": ')
  expect(s.sees("Bozuk JSON")).toBe(true)
  expect(s.sees("1 değişiklik")).toBe(true)
})

// validate runs on valid JSON: the reserved name gives our message; a good value then shows the valid text.
test("düzeltilince validate çalışır, sonra Sorun yok", async () => {
  const s = renderTest(() => <JsonEditorLab />)
  await s.type("Sunucu ayarı", '{"name":"root","port":8080}')
  expect(s.sees("root adı ayrılmış")).toBe(true)
  await s.type("Sunucu ayarı", '{"name":"api","port":8080}')
  expect(s.sees("Sorun yok")).toBe(true)
})

// The Format button re-indents with the indent we set (four spaces).
test("Toparla 4 boşlukla biçimlendirir", async () => {
  const s = renderTest(() => <JsonEditorLab />)
  await s.type("Sunucu ayarı", '{"name":"api","port":8080}')
  await s.click("Toparla")
  expect((s.find("Sunucu ayarı") as HTMLTextAreaElement | null)?.value).toContain('\n    "port": 8080')
})
