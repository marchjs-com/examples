// Tests for KbdLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <KbdLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find("text") finds an element by its visible text (or aria-label); s.get("selector") finds one by CSS selector;
//   s.click("text") clicks like a user and waits until the view has updated, which is why the test that clicks is async
//   and awaits it.
// - The tests check what a user or a screen reader can observe (the element type, the visible text) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. Kbd's class (m-kbd) is in the Kbd docs.
import { test, expect, renderTest } from "march/testing"
import { KbdLab } from "./KbdLab.tsx"

// Plain children text is rendered inside a real <kbd> element carrying the m-kbd class: that is what makes screen
// readers announce it as keyboard input.
test("düz metin gerçek bir <kbd> öğesinde durur", () => {
  const s = renderTest(() => <KbdLab />)
  expect(s.find("Esc")?.tagName).toBe("KBD")
  expect(s.find("Esc")?.classList.contains("m-kbd")).toBe(true)
})

// `keys` is formatted for the platform: the word "mod" must never appear as text (it becomes the Command key or Ctrl),
// while the letter itself stays. The test does not check the symbol, so it passes on every platform.
test("keys platforma göre yazılır: mod sözcüğü görünmez", () => {
  const s = renderTest(() => <KbdLab />)
  const cmd = s.get(".lab-cmd")?.textContent ?? ""
  expect(cmd).toContain("K")
  expect(cmd).not.toContain("mod")
  expect(s.get(".lab-enter")?.textContent).toContain("Enter")
})

// `class` is added next to m-kbd, it does not replace it: the element has both classes.
test("class m-kbd'nin yanına eklenir", () => {
  const s = renderTest(() => <KbdLab />)
  expect(s.get("kbd.lab-enter.m-kbd")).not.toBe(null)
})

// `keys` is live: clicking a modifier button changes the signal the shortcut reads, so its text is written again.
// We compare before and after instead of a fixed string because the modifier symbol depends on the platform.
test("keys canlı: alt ile'ye basınca tuş yeniden yazılır", async () => {
  const s = renderTest(() => <KbdLab />)
  const before = s.get(".lab-live")?.textContent
  await s.click("alt ile")
  const after = s.get(".lab-live")?.textContent ?? ""
  expect(after).not.toBe(before)
  expect(after).toContain("S")
})
