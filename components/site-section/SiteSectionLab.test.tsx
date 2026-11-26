// Tests for SiteSectionLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SiteSectionLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null) by CSS selector, s.find("text") finds an element by its visible text.
// - s.click("name") clicks the control with that name and waits until the view has updated, which is why the tests that
//   click are async and await it.
// - The tests check what a user or a screen reader can observe (the heading and the section it names, ids, attributes,
//   visible text) and the state classes on the root, rather than internal state, so they keep passing when the internals
//   change.
// To adapt them: copy one test, change the selector or the expected value. State classes follow the pattern m-ss-<value>.
import { test, expect, renderTest } from "march/testing"
import { SiteSectionLab } from "./SiteSectionLab.tsx"

// The section is named by its title through aria-labelledby; `id` and other attributes (data-*, aria-*) given to the
// component are passed on to the section element.
test("bölüm başlığıyla adlandırılmış; kimlik ve ek öznitelikler geçer", () => {
  const s = renderTest(() => <SiteSectionLab />)
  const sec = s.get("section.lab-ss")!
  const h = sec.querySelector("h2")!
  expect(sec.getAttribute("aria-labelledby")).toBe(h.id)
  expect(sec.getAttribute("id")).toBe("ozellikler")
  expect(sec.getAttribute("data-section")).toBe("features")
  expect(sec.getAttribute("aria-describedby")).toBe("lab-ss-note")
})

// `tone` and `width` show up as state classes on the section; the Lab's controls change them.
test("ton ve genişlik sınıfları değişir", async () => {
  const s = renderTest(() => <SiteSectionLab />)
  expect(s.get(".lab-ss")?.classList.contains("m-ss-muted")).toBe(true)
  await s.click("inverse")
  expect(s.get(".lab-ss")?.classList.contains("m-ss-inverse")).toBe(true)
  await s.click("Geniş")
  expect(s.get(".lab-ss")?.classList.contains("m-ss-w-wide")).toBe(true)
})

// level={3} makes the title an h3 instead of the default h2.
test("üçüncü düzey başlık", async () => {
  const s = renderTest(() => <SiteSectionLab />)
  await s.click("Üçüncü düzey")
  expect(s.get(".lab-ss h3")?.textContent).toBe("Her şey tek yerde (0)")
})

// The children are drawn inside the section, and the title is a function, so it follows the visit counter when the
// button in the content is pressed.
test("içerik çizilir; başlık bir sinyali izler", async () => {
  const s = renderTest(() => <SiteSectionLab />)
  expect(s.find("Bölümün içeriği burada.")).not.toBe(null)
  await s.click("Uğradım")
  expect(s.find("Her şey tek yerde (1)")).not.toBe(null)
})
