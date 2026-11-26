// Tests for StackLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StackLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null) by CSS selector, s.sees("text") says whether the text is on screen.
// - s.click("name") clicks the control with that visible text and waits until the view has updated, which is why the test that clicks is async.
// - The tests check what a user or a screen reader can observe (the element that was drawn, the accessible name of the toolbar, the visible
//   divider text) and the state classes of the Stack, rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the selector or the expected value. The state classes (m-stack-wrap, m-gap-N) are the classes Stack
// puts on its root.
import { test, expect, renderTest } from "march/testing"
import { StackLab } from "./StackLab.tsx"

// `as="ul"` draws the Stack as a list element (a Stack adds no semantics of its own; `as` is how you give it a meaningful one), and `wrap`
// shows up as a class on it.
test("as=ul listeyi ul olarak çizer, wrap sınıfı var", () => {
  const s = renderTest(() => <StackLab />)
  const row = s.get(".lab-row")!
  expect(row.tagName).toBe("UL")
  expect(row.className).toContain("m-stack-wrap")
})

// The widen button raises the gap signal from 2 to 3: the toolbar's end slot prints it and the Stack's gap class follows it.
test("Genişlet boşluğu bir adım artırır", async () => {
  const s = renderTest(() => <StackLab />)
  await s.click("Genişlet")
  expect(s.get(".lab-gap")?.textContent).toBe("gap 3")
  expect(s.get(".lab-row")!.className).toContain("m-gap-3")
})

// Toolbar gets its accessible name from `label` (role="toolbar"), and Divider with a `label` shows that text.
test("Toolbar erişilebilir adını alır, Divider etiketini gösterir", () => {
  const s = renderTest(() => <StackLab />)
  expect(s.get("[role=toolbar]")?.getAttribute("aria-label")).toBe("Boşluk")
  expect(s.sees("sütun")).toBe(true)
})
