// Tests for AvatarGroupLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <AvatarGroupLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns one element or null.
// - Nothing is clicked, so the tests are synchronous. They check what a user or a screen reader can observe (the
//   overflow text and the accessible name) rather than internal state.
// To adapt them: copy one test, change the class or the expected text.
import { test, expect, renderTest } from "march/testing"
import { AvatarGroupLab } from "./AvatarGroupLab.tsx"

// Five names with max={2}: two avatars are drawn and the other three collapse into a "+3" bubble. `label` becomes
// the group's accessible name.
test("max'tan fazlası +N balonunda", () => {
  const s = renderTest(() => <AvatarGroupLab />)
  expect(s.get(".lab-more")?.textContent).toContain("+3")
  expect(s.get(".lab-more")?.getAttribute("aria-label")).toBe("Ekip")
})

// more={false}: names beyond `max` are simply not shown and no "+N" bubble is drawn.
test("more={false} balonu kaldırır", () => {
  const s = renderTest(() => <AvatarGroupLab />)
  expect(s.get(".lab-nomore")?.textContent).not.toContain("+")
})
