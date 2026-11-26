// Tests for HeroLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <HeroLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.container is the root element (use it for CSS selectors); s.find(text) finds an element by its text or name;
//   s.click(text) clicks like a user and waits until the view has updated (so those tests are async).
// - The tests check what a user can observe (heading level, links, visible text, which parts exist) rather than internal
//   state.
import { test, expect, renderTest } from "march/testing"
import { HeroLab } from "./HeroLab.tsx"

// level={2} makes the title an h2, and `highlight` wraps its words in their own element.
test("başlık ikinci düzeyde, vurgulu kısım ayrı bir öğede", () => {
  const s = renderTest(() => <HeroLab />)
  const h = s.container.querySelector("h2")
  expect(h?.textContent).toContain("Bugün kiminle buluşuyorsun?")
  expect(h?.querySelector(".m-hero-hl")?.textContent).toBe("buluşuyorsun")
})

// The first action counts: its label shows the counter, and pressing it raises the number (the Hero is drawn again).
test("ilk eylem sayar: Katıl (0) → Katıl (1)", async () => {
  const s = renderTest(() => <HeroLab />)
  await s.click("Katıl (0)")
  expect(s.find("Katıl (1)")).not.toBe(null)
})

// eyebrowHref turns the pill into a link; the note and the children are on screen.
test("üst etiket bir bağlantı; not ve içerik görünür", () => {
  const s = renderTest(() => <HeroLab />)
  expect(s.container.querySelector('a[href="#yenilikler"]')).not.toBe(null)
  expect(s.container.textContent).toContain("Ücretsiz · kart gerekmez")
  expect(s.container.textContent).toContain("12 şehirde, 40 bin kişi")
})

// The product look has a window bar; turning the Window bar switch off (frameBar={false}) removes it.
test("ürün görünümünde pencere çubuğu var; anahtar kapatınca gider", async () => {
  const s = renderTest(() => <HeroLab />)
  expect(s.container.querySelector(".m-hero-frame-bar")).not.toBe(null)
  await s.click("Pencere çubuğu")
  expect(s.container.querySelector(".m-hero-frame-bar")).toBe(null)
})
