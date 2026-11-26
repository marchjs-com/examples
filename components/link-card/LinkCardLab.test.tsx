// Tests for LinkCardLab. They run in MarchIDE's Tests tab every time you save.
// They never click a card itself: the cards are links, and following one would leave the page.
//
// How these tests are written (march/testing):
// - renderTest(() => <LinkCardLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find("text") finds an element by its visible text; s.get("selector") by CSS selector; s.sees("text") says whether
//   text is visible. s.click("text") clicks a button like a user and waits until the view has updated, which is why the
//   tests that click are async and await it.
// - The tests check what a user or a screen reader can observe (link element, href, classes, visible text, aria-hidden)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. LinkCard's part classes (m-link-card-meta,
// m-link-card-arrow, m-link-card-lead) are what the tests look up.
import { test, expect, renderTest } from "march/testing"
import { LinkCardLab } from "./LinkCardLab.tsx"

// The whole card is one <a>: walking up from its title reaches the link, which carries the href, our class (next to
// m-link-card) and the data-* attribute we passed.
test("kartın tamamı bir bağlantı; class ve data-* bağlantıya gider", () => {
  const s = renderTest(() => <LinkCardLab />)
  const a = s.find("Tablo")?.closest("a")
  expect(a?.classList.contains("lab-table")).toBe(true)
  expect(a?.classList.contains("m-link-card")).toBe(true)
  expect(a?.getAttribute("href")).toContain("table")
  expect(a?.getAttribute("data-kind")).toBe("veri")
})

// `meta` and `title` are live: the buttons change the signals they read and the card's text follows.
test("meta ve title canlı", async () => {
  const s = renderTest(() => <LinkCardLab />)
  expect(s.get(".lab-table .m-link-card-meta")?.textContent).toBe("★ 41")
  await s.click("Yıldız ver")
  expect(s.get(".lab-table .m-link-card-meta")?.textContent).toBe("★ 42")
  await s.click("Başlığı değiştir")
  expect(s.sees("Ağaç görünümü")).toBe(true)
})

// arrow={false} draws no arrow at all; the default arrow is decoration, so it is hidden from screen readers; and `id`
// reaches the <a> element.
test("arrow={false} oku çizmez; varsayılan ok süs olarak gizli", () => {
  const s = renderTest(() => <LinkCardLab />)
  expect(s.get(".lab-noarrow .m-link-card-arrow")).toBe(null)
  expect(s.get(".lab-table .m-link-card-arrow")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get("#agac")?.tagName).toBe("A")
})

// With `lead` the card has its own lead slot and no icon tile; a card with `icon` has the tile.
test("lead ikon karosunun yerine geçer", () => {
  const s = renderTest(() => <LinkCardLab />)
  expect(s.get(".lab-lead .m-link-card-lead")).not.toBe(null)
  expect(s.get(".lab-lead .m-icon-tile")).toBe(null)
  expect(s.get(".lab-table .m-icon-tile")).not.toBe(null)
})
