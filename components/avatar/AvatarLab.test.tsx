// Tests for AvatarLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <AvatarLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns one element or null (the trailing ! tells TypeScript it exists).
// - Nothing is clicked, so the tests are synchronous. They check what a user or a screen reader can observe (visible
//   text, aria-label, aria-hidden) rather than internal state.
// To adapt them: copy one test, change the class or the expected value.
import { test, expect, renderTest } from "march/testing"
import { AvatarLab } from "./AvatarLab.tsx"

// With only a name (no image), the avatar shows the initials, and the name becomes its accessible name.
test("resim yoksa baş harfler görünür, ad erişilebilir ad olur", () => {
  const s = renderTest(() => <AvatarLab />)
  const a = s.get(".lab-initials")!
  expect(a.textContent).toContain("EA")
  expect(a.getAttribute("aria-label")).toBe("Elif Arslan")
})

// `label` replaces the name as the accessible name (needed when there is no name, as with an icon avatar);
// `decorative` hides the avatar from screen readers entirely, for when the name is written next to it.
test("label adı geçersiz kılar, decorative ekran okuyucudan gizler", () => {
  const s = renderTest(() => <AvatarLab />)
  expect(s.get(".lab-icon")?.getAttribute("aria-label")).toBe("Bilinmeyen kişi")
  expect(s.get(".lab-deco")?.getAttribute("aria-hidden")).toBe("true")
})

// `text` is drawn instead of the initials.
test("hazır metin baş harflerin yerine geçer", () => {
  const s = renderTest(() => <AvatarLab />)
  expect(s.get(".lab-text")?.textContent).toContain("?")
})
