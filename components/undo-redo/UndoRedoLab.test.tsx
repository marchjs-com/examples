// Tests for UndoRedoLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <UndoRedoLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click("+1") finds the button with that text or accessible name and clicks it like a user, then waits until the
//   view has updated (that is why the tests that click are async and await it). s.get(selector) returns the first
//   match, s.all(selector) all matches, s.find(text) the element that shows a text.
// - The tests check what a user or a screen reader can observe (disabled, aria-label, title, visible text) rather
//   than internal state, so they keep passing when the component's internals change. The buttons are found by the
//   classes the Lab gave them with partClass (lab-undo, lab-redo) and class (lab-props, lab-only).
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { UndoRedoLab } from "./UndoRedoLab.tsx"

// Undo is disabled with an empty history. After "+1" it is enabled and its accessible name carries the step name from
// labels.undo. Pressing it undoes the step (the counter returns to 0) and Redo, enabled from the start, now names the step.
test("+1'den sonra Vazgeç adımı adıyla söyler, geri alınca Yeniden açılır", async () => {
  const s = renderTest(() => <UndoRedoLab />)
  expect((s.get(".lab-undo") as HTMLButtonElement).disabled).toBe(true)
  await s.click("+1")
  expect(s.get(".lab-undo")?.getAttribute("aria-label")).toBe("Vazgeç: +1")
  await s.click("Vazgeç: +1")
  expect(s.get(".lab-count")?.textContent).toBe("0")
  expect((s.get(".lab-redo") as HTMLButtonElement).disabled).toBe(false)
  expect(s.get(".lab-redo")?.getAttribute("aria-label")).toBe("Yeniden: +1")
})

// The group is named by labels.group (role="group"), and the tooltip (the title attribute) has the step name plus the
// shortcut text; the Lab gives its own keys, so we only check that a "Z" key letter is in it.
test("grubun adı labels.group; ipucunda adım ve kendi kısayolu", async () => {
  const s = renderTest(() => <UndoRedoLab />)
  expect(s.find("Sayaç geçmişi")?.getAttribute("role")).toBe("group")
  await s.click("×2")
  const title = s.get(".lab-undo")?.getAttribute("title") ?? ""
  expect(title).toContain("Vazgeç: ×2")
  expect(title).toContain("Z")
})

// actions={["redo", "undo"]}: the first button of that pair is Redo. With steps={false} and shortcuts={false} the
// tooltip is only the plain name, equal to the accessible name. The undo button is enabled after the flag is set.
test("actions sırası; steps={false} ve shortcuts={false}: ipucu yalnız ad", async () => {
  const s = renderTest(() => <UndoRedoLab />)
  expect(s.get(".lab-props button")?.classList.contains("m-undo-redo-redo")).toBe(true)
  await s.click("Bayrağı dik")
  const undo = s.get(".lab-props .m-undo-redo-undo")
  expect((undo as HTMLButtonElement).disabled).toBe(false)
  expect(undo?.getAttribute("title")).toBe(undo?.getAttribute("aria-label"))
})

// disabled switches both buttons off even when there is something to undo, and actions={["undo"]} draws one button.
test("Kilitle: disabled düğmeleri kapatır; actions={[\"undo\"]} tek düğme çizer", async () => {
  const s = renderTest(() => <UndoRedoLab />)
  await s.click("+1")
  await s.click("Kilitle")
  expect((s.get(".lab-undo") as HTMLButtonElement).disabled).toBe(true)
  expect(s.all(".lab-only button").length).toBe(1)
})
