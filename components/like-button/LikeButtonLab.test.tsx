// Tests for LikeButtonLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LikeButtonLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds an element by CSS selector; s.click(element) clicks like a user and waits until the view
//   has updated, which is why the test that clicks is async and awaits it.
// - The tests check what a user or a screen reader can observe (aria-pressed, visible text) rather than internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. LikeButton's parts (m-like-heart,
// m-like-count…) are listed in the LikeButton docs.
import { test, expect, renderTest } from "march/testing"
import { LikeButtonLab } from "./LikeButtonLab.tsx"

// A like button is a real button with aria-pressed. Before the click it is "false"; after it the Lab's onToggle has
// set the signals, so it is "true" and the plain counter shows 2000 (1999 + 1).
test("basınca beğenilir ve sayaç artar", async () => {
  const s = renderTest(() => <LikeButtonLab />)
  const b = s.get(".lab-like")!
  expect(b.getAttribute("aria-pressed")).toBe("false")
  await s.click(b)
  expect(s.get(".lab-like")?.getAttribute("aria-pressed")).toBe("true")
  expect(s.get(".lab-n")?.textContent).toBe("2000")
})

// `icon` as a function receives the liked state: the second button is liked, so it draws the filled star.
test("işlev ikonu duruma göre çizer", () => {
  const s = renderTest(() => <LikeButtonLab />)
  expect(s.get(".lab-own")?.textContent).toContain("★")
})
