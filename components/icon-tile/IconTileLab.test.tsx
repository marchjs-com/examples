// Tests for IconTileLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <IconTileLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds the first element, s.all(selector) every match.
// - The tests check what a screen reader can observe (role, aria-label, aria-hidden) and visible text rather than internal
//   state, so they keep passing when the component's internals change.
import { test, expect, renderTest } from "march/testing"
import { IconTileLab } from "./IconTileLab.tsx"

// With a label the tile is an image for assistive technology and carries that name.
test("label verilen karo bir resimdir ve adını taşır", () => {
  const s = renderTest(() => <IconTileLab />)
  const t = s.get(".lab-named")!
  expect(t.getAttribute("role")).toBe("img")
  expect(t.getAttribute("aria-label")).toBe("Tamamlandı")
})

// Without a label the tile is decorative: aria-hidden, so screen readers skip it.
test("label yoksa karo süstür (aria-hidden)", () => {
  const s = renderTest(() => <IconTileLab />)
  const tiles = s.all(".m-icon-tile")
  expect(tiles[0].getAttribute("aria-hidden")).toBe("true")
})

// children are drawn instead of the icon.
test("children ikonun yerine çizilir", () => {
  const s = renderTest(() => <IconTileLab />)
  expect(s.get(".lab-own")!.textContent).toBe("AB")
})
