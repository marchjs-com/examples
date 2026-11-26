// Tests for JoinedLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <JoinedLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds an element, s.click(text) clicks like a user and waits until the view has updated (so that test
//   is async).
// - The tests check observable things (attributes and class names) rather than internal state. Joined is drawn with CSS, so
//   a test compares the class names that select the look.
import { test, expect, renderTest } from "march/testing"
import { JoinedLab } from "./JoinedLab.tsx"

// Attributes that are not Joined props (role, aria-label) are put on the root element.
test("öteki öznitelikler köke gider", () => {
  const s = renderTest(() => <JoinedLab />)
  const live = s.get(".lab-live")
  expect(live?.getAttribute("role")).toBe("group")
  expect(live?.getAttribute("aria-label")).toBe("Kartlar")
})

// direction as a function is live: pressing the button changes the class that selects the layout.
test("direction canlı: düğmeye basınca sınıf değişir", async () => {
  const s = renderTest(() => <JoinedLab />)
  const before = s.get(".lab-live")!.className
  await s.click("Yatay yap")
  expect(s.get(".lab-live")!.className).not.toBe(before)
})

// border={false} and dividers={false} produce different classes from the defaults (the CSS removes the frame and the lines).
test("border ve dividers kapatılınca sınıflar farklı", () => {
  const s = renderTest(() => <JoinedLab />)
  expect(s.get(".lab-bare")!.className).not.toBe(s.get(".lab-full")!.className)
})
