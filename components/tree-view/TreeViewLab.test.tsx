// Tests for TreeViewLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TreeViewLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns the first matching element, s.sees(text) asks if a text is visible, and s.click(text)
//   clicks the button with that text like a user and waits until the view has updated (that is why the tests that
//   click are async and await it).
// - The tests check what a screen reader or a user can observe (role, aria attributes, visible button text) rather
//   than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { TreeViewLab } from "./TreeViewLab.tsx"

// The tree has role="tree" and is named by `label`; selection="multiple" is announced with aria-multiselectable; the
// `class` prop lands on the tree.
test("ağaç adını, sınıfını ve çoklu seçimi duyurur", () => {
  const s = renderTest(() => <TreeViewLab />)
  const tree = s.get("[role=tree]")
  expect(tree?.getAttribute("aria-label")).toBe("Posta klasörleri")
  expect(tree?.getAttribute("aria-multiselectable")).toBe("true")
  expect(s.get(".lab-tv")).not.toBe(null)
})

// `selection` was given as a function, so it is live: after the button switches it to "single", the tree stops
// announcing multiple selection.
test("seçim tek'e geçince aria-multiselectable kalkar", async () => {
  const s = renderTest(() => <TreeViewLab />)
  await s.click("Seçim: multiple")
  expect(s.sees("Seçim: single")).toBe(true)
  expect(s.get("[role=tree]")?.hasAttribute("aria-multiselectable")).toBe(false)
})

// The search button sets the search text (and its own label changes to the clear action); pressing it again clears the
// search. We only check the button text here, because it follows the same signal as the tree's `search` prop.
test("arama düğmesi aramayı açar ve kapatır", async () => {
  const s = renderTest(() => <TreeViewLab />)
  await s.click("“fatura” ara")
  expect(s.sees("Aramayı temizle")).toBe(true)
  await s.click("Aramayı temizle")
  expect(s.sees("“fatura” ara")).toBe(true)
})
