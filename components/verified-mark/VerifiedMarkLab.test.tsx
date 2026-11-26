// Tests for VerifiedMarkLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <VerifiedMarkLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns the first matching element. These examples are static, so no click or await is needed.
// - The tests check what a screen reader can observe (role, aria-label, aria-hidden) and the drawn text, rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the class name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { VerifiedMarkLab } from "./VerifiedMarkLab.tsx"

// The badge is an image for assistive technology (role="img"), and `label` is its accessible name.
test("rozet bir resim, adı label", () => {
  const s = renderTest(() => <VerifiedMarkLab />)
  expect(s.get(".lab-own")?.getAttribute("role")).toBe("img")
  expect(s.get(".lab-own")?.getAttribute("aria-label")).toBe("Onaylı işletme")
})

// label={false} makes the badge decorative: it is hidden from screen readers (aria-hidden).
test("label={false} süs: ekran okuyucudan gizli", () => {
  const s = renderTest(() => <VerifiedMarkLab />)
  expect(s.get(".lab-deco")?.getAttribute("aria-hidden")).toBe("true")
})

// icon given as a text is drawn as that text inside the badge.
test("metin ikon yazılır", () => {
  const s = renderTest(() => <VerifiedMarkLab />)
  expect(s.get(".lab-text")?.textContent).toContain("✔")
})
