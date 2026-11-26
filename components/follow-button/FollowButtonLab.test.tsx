// Tests for FollowButtonLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <FollowButtonLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds an element; s.click(el) clicks like a user and waits until the view has updated, so the test
//   that clicks is async and awaits it.
// - The tests check observable things (aria-label, visible text) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { FollowButtonLab } from "./FollowButtonLab.tsx"

// The accessible name comes from ariaLabel (name + state), and pressing the button moves the state to "following".
test("basınca following olur, ariaLabel adı yazar", async () => {
  const s = renderTest(() => <FollowButtonLab />)
  expect(s.get(".lab-follow")?.getAttribute("aria-label")).toBe("Elif: follow")
  await s.click(s.get(".lab-follow")!)
  expect(s.get(".lab-state")?.textContent).toBe("following")
})

// labels replaces the built-in text: the private button shows our own label text.
test("labels kendi metnini yazar", () => {
  const s = renderTest(() => <FollowButtonLab />)
  expect(s.get(".lab-private")?.textContent).toContain("İstek gönder")
})
