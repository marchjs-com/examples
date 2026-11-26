// Tests for JsonViewLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <JsonViewLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.click(element) clicks like a user and waits until the view has updated
//   (so that test is async).
// - The tests check what a user or a screen reader can observe (names, aria-expanded, visible text) rather than internal
//   state.
import { test, expect, renderTest } from "march/testing"
import { JsonViewLab } from "./JsonViewLab.tsx"

// The root list takes its accessible name from the label prop.
test("kök liste label adıyla adlandırılır", () => {
  const s = renderTest(() => <JsonViewLab />)
  // The tree is nested lists with disclosure buttons that carry aria-expanded; the root list's name is the label.
  const root = s.get(".lab-json .m-json-root")!
  expect(root.getAttribute("aria-label")).toBe("Paket")
})

// describe names the function, a circular reference gets our own text, and strings are shown quoted.
test("describe işlevi adlandırır, döngü kendi metniyle yazılır", () => {
  const s = renderTest(() => <JsonViewLab />)
  const text = s.get(".lab-json")!.textContent!
  expect(text).toContain("ƒ işlev")
  expect(text).toContain("(kendisi)")
  expect(text).toContain("\"tsx\"")
})

// open={0} starts closed (aria-expanded is false); clicking the toggle opens it.
test("open={0} kapalı başlar, tıklayınca açılır", async () => {
  const s = renderTest(() => <JsonViewLab />)
  const trees = s.all(".m-json")
  const btn = trees[1].querySelector(".m-json-toggle")!
  expect(btn.getAttribute("aria-expanded")).toBe("false")
  await s.click(btn)
  expect(btn.getAttribute("aria-expanded")).toBe("true")
})

// A closed branch shows its count with our word from labels.keys.
test("kapalı dal labels.keys ile sayılır", () => {
  const s = renderTest(() => <JsonViewLab />)
  expect(s.get(".lab-json")!.textContent).toContain("1 alan")
})
