// Tests for SectionHeadLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SectionHeadLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null), s.find("text") finds an element by its visible text or aria-label,
//   s.text() is all visible text.
// - s.click("text") clicks the control with that text; it waits until the view has updated, which is why the tests that
//   click are async and await it.
// - The tests check what a user or a screen reader can observe (links, heading element and id, visible text, the state
//   classes on the root) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the selector or the expected value. State classes follow the pattern
// m-section-head-<value> (for example -xl, -end, -full).
import { test, expect, renderTest } from "march/testing"
import { SectionHeadLab } from "./SectionHeadLab.tsx"

// eyebrowHref turns the eyebrow into a link; `as` and `titleId` give the title its own element and id (the id is what
// a section's aria-labelledby points to); the live title function includes the like counter.
test("üst etiket bir bağlantı; başlık kendi öğesi ve kimliğiyle", () => {
  const s = renderTest(() => <SectionHeadLab />)
  expect(s.get('.lab-head a.m-section-head-eyebrow')?.getAttribute("href")).toBe("#yenilikler")
  const h = s.get(".lab-head h3")!
  expect(h.id).toBe("lab-head-title")
  expect(h.textContent).toBe("Ekibinle birlikte üret (0)")
})

// The first action has an onClick: pressing it increments the counter that the live title shows. The same test checks
// the link action you build yourself (a node in `actions`), the `note` and the extra content passed as children.
test("ilk eylem sayar; kendi düğümü ve not görünür", async () => {
  const s = renderTest(() => <SectionHeadLab />)
  await s.click("Beğen")
  expect(s.find("Ekibinle birlikte üret (1)")).not.toBe(null)
  expect(s.get(".lab-head .lab-own-action")?.getAttribute("href")).toBe("#iletisim")
  expect(s.text()).toContain("14 gün ücretsiz · kart gerekmez")
  expect(s.find("2.400 ekip kullanıyor")).not.toBe(null)
})

// Choosing a scale and an alignment in the Lab's controls changes the state classes on the root.
test("ölçek ve hiza sınıfları izler", async () => {
  const s = renderTest(() => <SectionHeadLab />)
  await s.click("xl")
  expect(s.get(".lab-head")?.classList.contains("m-section-head-xl")).toBe(true)
  await s.click("son")
  expect(s.get(".lab-head")?.classList.contains("m-section-head-end")).toBe(true)
})

// width="full" adds its state class, and `as="h1"` makes the title a real h1 (one h1 per page is the rule).
test("tam genişlik ve h1", async () => {
  const s = renderTest(() => <SectionHeadLab />)
  await s.click("Tam genişlik")
  expect(s.get(".lab-head")?.classList.contains("m-section-head-full")).toBe(true)
  await s.click("Sayfa başlığı (h1)")
  expect(s.get(".lab-head h1")).not.toBe(null)
})
