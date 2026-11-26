// Tests for FeatureGridLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <FeatureGridLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it; s.click(target) clicks like a user (a visible text, a toggle's label or an element) and
//   waits for the view to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (headings, links, classes, visible text), not internal
//   state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { FeatureGridLab } from "./FeatureGridLab.tsx"

// Each item is an article with an h3; an item with `href` makes its title a link, so exactly one of the six is an a.
test("altı özellik, her biri bir h3; bağlantılı olan bir a", () => {
  const s = renderTest(() => <FeatureGridLab />)
  expect(s.all(".lab-fg h3").length).toBe(6)
  expect(s.get('.lab-fg a[href="#bilet"]')?.textContent).toBe("Bilet sat")
})

// The cards variant has no media. Switching the Lab to bento draws the bento tiles; `span: "big"` and "wide" become size classes,
// and the `media` node of the first item appears in its tile.
test("kartlar görünümünde medya yok; bento'da boyutlar ve medya gelir", async () => {
  const s = renderTest(() => <FeatureGridLab />)
  expect(s.get(".m-fg-media")).toBe(null)
  await s.click("bento")
  expect(s.get(".m-fg-bento")).not.toBe(null)
  expect(s.get(".m-fg-span-big")?.textContent).toContain("1.200+")
  expect(s.get(".m-fg-span-wide")?.textContent).toContain("Bilet sat")
})

// spotlight (the pointer light) is on by default in the Lab, and the toggle turns it off: the root class follows.
test("imleç ışığı anahtarla kapanır", async () => {
  const s = renderTest(() => <FeatureGridLab />)
  expect(s.get(".lab-fg")?.classList.contains("is-spotlight")).toBe(true)
  await s.click("İmleç ışığı")
  expect(s.get(".lab-fg")?.classList.contains("is-spotlight")).toBe(false)
})

// The list variant draws rows (icon beside the text) instead of Cards.
test("liste görünümünde kart yok, satırlar var", async () => {
  const s = renderTest(() => <FeatureGridLab />)
  await s.click("list")
  expect(s.get(".lab-fg")?.classList.contains("m-fg-v-list")).toBe(true)
  expect(s.get(".lab-fg .m-card")).toBe(null)
})
