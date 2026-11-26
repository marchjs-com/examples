// Tests for ThemeEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - ThemeEditor loads as separate chunks, so it is not in the page the moment renderTest returns. The `ready` helper below
//   mounts the Lab and uses s.wait(() => condition, { timeout }) to wait until the theme name field exists; every test starts
//   from it.
// - s.get(selector) finds an element by CSS selector, s.find(text) by visible text or name, s.sees(text) says whether a text
//   is on the page, s.type(name, text) types into a field found by its accessible name, and s.click(text or selector) clicks
//   like a user and waits until the view has updated (so a test that clicks is async and awaits it).
// - The tests check what a user can observe (names, which parts are drawn, the readonly attribute) rather than internal
//   state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text. .lab-te is the class given to the editor in the Lab;
// .m-te-* are the editor's own part classes.
import { test, expect, renderTest } from "march/testing"
import { ThemeEditorLab } from "./ThemeEditorLab.tsx"

// Mounts the Lab and waits (up to 5 seconds) for the editor's name field, which means the chunks have loaded.
const ready = async () => {
  const s = renderTest(() => <ThemeEditorLab />)
  await s.wait(() => s.get(".lab-te .m-te-name"), { timeout: 5000 })
  return s
}

// `labels` replaces the editor's own texts: the group's accessible name and the tab names. Only the tabs listed in `tabs`
// exist, so the "type" tab is missing even though the Lab did not rename it.
test("kendi metinler: sekme adları ve düzenleyicinin adı", async () => {
  const s = await ready()
  expect(s.get(".lab-te")?.getAttribute("aria-label")).toBe("Lab teması")
  expect(s.find("Palet")).toBeTruthy()
  expect(s.find("Çıktı")).toBeTruthy()
  expect(s.find("Tipografi")).toBe(null)
})

// Typing a new name calls onChange (the Lab's counter leaves zero), and the Save button calls onSave with the draft, whose
// name the Lab shows.
test("ad değişince onChange sayar, Kaydet onSave'e adı verir", async () => {
  const s = await ready()
  await s.type("Tema adı", "Lab neonu")
  expect(s.sees("Değişiklik: 0")).toBe(false)
  await s.click(".m-te-save")
  expect(s.sees("Kaydedilen: Lab neonu")).toBe(true)
})

// The Lab turns three parts off (presets={false}, applyButton={false}, preview off at the start), so their elements are not
// drawn at all.
test("kapalı parçalar: hazır temalar satırı, uygula düğmesi ve önizleme yok", async () => {
  const s = await ready()
  expect(s.get(".lab-te .m-te-bases")).toBe(null)
  expect(s.get(".lab-te .m-te-apply")).toBe(null)
  expect(s.get(".lab-te .m-te-stage")).toBe(null)
})

// `readonly` is live: pressing the Lab's button makes the name field read only. We wait for the change, since the editor
// is rebuilt with the new option.
test("salt okunur açılınca ad alanı kilitlenir", async () => {
  const s = await ready()
  const locked = () => !!s.get(".lab-te .m-te-title input")?.hasAttribute("readonly")
  expect(locked()).toBe(false)
  await s.click("Salt okunur")
  await s.wait(locked, { timeout: 5000 })
  expect(locked()).toBe(true)
})
