// Tests for TreeLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TreeLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.click(target) clicks like
//   a user (target = a visible text or an element) and waits for the view to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { TreeLab } from "./TreeLab.tsx"

// Every Tree renders role="tree" and takes its accessible name from `label`; the three trees of the Lab are found by
// that role and their names are read from aria-label.
test("üç ağaç da role=tree ve kendi adıyla", () => {
  const s = renderTest(() => <TreeLab />)
  const trees = s.all("[role=tree]")
  expect(trees.length).toBe(3)
  expect(trees.map((t: Element) => t.getAttribute("aria-label"))).toEqual(["Ağaç A", "Ağaç B", "Ağaç C"])
})

// Clicking a row selects it: onSelect fires once (the counter), and all three trees show the same selected id, because
// they share one `selected` accessor, so three rows carry aria-selected=true.
test("bir satıra basınca seçim değişir ve onSelect sayar", async () => {
  const s = renderTest(() => <TreeLab />)
  await s.click("Uyarılar")
  expect(s.sees("Seçili: alerts")).toBe(true)
  expect(s.sees("seçim sayısı: 1")).toBe(true)
  expect(s.all("[aria-selected=true]").length).toBe(3)
})

// `expanded={["fav"]}` opens that branch at start: a branch row exposes aria-expanded, which is how a screen reader
// (and this test) tells open from closed.
test("expanded ile açılan dal aria-expanded=true", () => {
  const s = renderTest(() => <TreeLab />)
  const fav = s.all("[role=treeitem][aria-expanded]")[0]
  expect(fav.getAttribute("aria-expanded")).toBe("true")
})

// chevron={false} draws no arrow at all, and `class` is added to the tree root. The arrow is found by its data-chev
// marker, so the test checks that it is missing, not just hidden.
test("chevron={false} oku kaldırır, class ağaca eklenir", () => {
  const s = renderTest(() => <TreeLab />)
  const c = s.get(".lab-tree")
  expect(c?.getAttribute("aria-label")).toBe("Ağaç C")
  expect(c?.querySelector("[data-chev]")).toBe(null)
})
