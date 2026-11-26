// Tests for LogoCloudLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LogoCloudLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector and s.all("selector") finds every match; s.click("text") clicks a
//   button, switch or segment by its text and waits until the view has updated, which is why the tests that click are
//   async and await it.
// - The tests check what a user or a screen reader can observe (the number of cells, the heading text, alt text, an
//   accessible name, a state class) rather than internal state, so they keep passing when the component's internals
//   change. The Lab uses reveal="none", so no entrance motion can get in the way of these checks.
// To adapt them: copy one test, change the selector or the expected text. The parts (m-logos-cell, m-logos-title,
// m-logos-marquee) are listed in the LogoCloud docs.
import { test, expect, renderTest } from "march/testing"
import { LogoCloudLab } from "./LogoCloudLab.tsx"

// The grid has one cell per logo (four), the title is the heading, and mono (the default) adds the is-mono class.
test("ızgarada dört hücre, başlık ve tek ton", () => {
  const s = renderTest(() => <LogoCloudLab />)
  expect(s.all(".lab-logos .m-logos-cell").length).toBe(4)
  expect(s.get(".m-logos-title")?.textContent).toBe("Bize güvenen 4 ekip")
  expect(s.get(".lab-logos")?.classList.contains("is-mono")).toBe(true)
})

// A logo with `src` is an <img> whose alt is its `name`; a logo with `href` is a link named by its `name` through
// aria-label (its inline SVG is hidden from screen readers).
test("resimli logonun alt metni, bağlantılı logonun adı var", () => {
  const s = renderTest(() => <LogoCloudLab />)
  expect(s.get('.lab-logos img[alt="Dalga"]')).not.toBe(null)
  expect(s.get('.lab-logos a[href="#turuncu"]')?.getAttribute("aria-label")).toBe("Turuncu")
})

// `title` is a function that reads a counter, so the button makes the heading say five teams instead of four.
test("başlık bir işlev: düğmeyle değişir", async () => {
  const s = renderTest(() => <LogoCloudLab />)
  await s.click("Ekip ekle")
  expect(s.get(".m-logos-title")?.textContent).toBe("Bize güvenen 5 ekip")
})

// Choosing the marquee view draws the ticker; turning the one-tone switch off removes the is-mono class. The cloud is
// rebuilt after each change.
test("marquee'ye geçince şerit gelir; tek ton kapanır", async () => {
  const s = renderTest(() => <LogoCloudLab />)
  await s.click("marquee")
  await s.click("Tek ton")
  expect(s.get(".lab-logos .m-logos-marquee")).not.toBe(null)
  expect(s.get(".lab-logos")?.classList.contains("is-mono")).toBe(false)
})
