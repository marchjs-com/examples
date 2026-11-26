// Tests for ContextMenuLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ContextMenuLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.press(key, element) sends a key press to an element (here the Menu key on a focused button, which opens the menu
//   without a pointer); s.click(text) clicks like a user; s.flush(n) lets the view settle for n frames; s.sees(text)
//   says whether a text is visible; s.get(selector) finds one element. Tests that act are async and await it.
// - The tests check what a user can observe (the menu's entries, its accessible name, the result text), not internal state.
import { test, expect, renderTest } from "march/testing"
import { ContextMenuLab } from "./ContextMenuLab.tsx"

// The Menu key on a focused element opens the menu at that element. `items` receives that element as the target, so the
// entry that prints the target shows its text; menuClass and label land on the floating menu.
test("Menü tuşu odaklı öğede menüyü açar; öğe hedefi bilir", async () => {
  const s = renderTest(() => <ContextMenuLab />)
  await s.press("ContextMenu", s.get(".lab-on"))
  await s.flush(2)
  expect(s.sees("Hedefi yaz")).toBe(true)
  expect(s.get(".lab-menu")?.getAttribute("aria-label")).toBe("Lab menüsü")
  await s.click("Hedefi yaz")
  await s.flush(2)
  expect(s.get(".lab-last")?.textContent).toContain("hedef: Açılır")
})

// `when` returns false for the second button, so the component does not open its menu there (the browser's own menu
// would be left alone); the area around it is still rendered.
test("when false döndürünce menü açılmaz", async () => {
  const s = renderTest(() => <ContextMenuLab />)
  await s.press("ContextMenu", s.get(".lab-off"))
  await s.flush(2)
  expect(s.sees("Hedefi yaz")).toBe(false)
  expect(s.get(".lab-area")).toBeTruthy()
})
