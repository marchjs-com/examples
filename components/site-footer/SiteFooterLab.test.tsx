// Tests for SiteFooterLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SiteFooterLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.all(selector) / s.get(selector) find elements by CSS selector, s.find("name") finds an element by its visible text
//   or aria-label, s.container is the root the component was mounted into.
// - s.click("name") clicks the control with that name, s.type(field, text) types into a field found by its label; both
//   wait until the view has updated, which is why the tests are async. s.wait(() => condition) polls until a condition
//   holds (used after the newsletter submit, which finishes a moment later).
// - The tests check what a user or a screen reader can observe (named navigation landmarks, link text, whether a part
//   exists, the visible thank-you text) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { SiteFooterLab } from "./SiteFooterLab.tsx"

// Each column is its own nav element named by its title (aria-label), and its links are normal anchors.
test("sütunlar başlıklarıyla adlandırılmış birer nav", () => {
  const s = renderTest(() => <SiteFooterLab />)
  const navs = s.all(".lab-footer nav.m-sfoot-col")
  expect(navs.length).toBe(2)
  expect(navs[0]!.getAttribute("aria-label")).toBe("Ürün")
  expect(s.container.querySelector('a[href="#kariyer"]')?.textContent).toBe("Kariyer")
})

// The copyright prop accepts your own text; turning the Lab's switch off passes copyright={false}, and the line is gone.
test("telif satırı kendi metniyle; anahtar kapatınca gider", async () => {
  const s = renderTest(() => <SiteFooterLab />)
  expect(s.get(".m-sfoot-copy")?.textContent).toBe("© Atölye · İstanbul")
  await s.click("Telif satırı")
  expect(s.container.querySelector(".m-sfoot-copy")).toBe(null)
})

// toTopLabel renames the back-to-top button (its accessible name); toTop={false} removes it. Turning on "own brand" shows
// the node the Lab passes as `brand` instead of the { name, mark } object.
test("başa dön düğmesinin adı değişti; kendi markam düğümü gösterir", async () => {
  const s = renderTest(() => <SiteFooterLab />)
  expect(s.find("Yukarı çık")).not.toBe(null)
  await s.click("Başa dön")
  expect(s.container.querySelector(".m-sfoot-top-btn")).toBe(null)
  await s.click("Kendi markam")
  expect(s.container.querySelector(".lab-own-brand")).not.toBe(null)
})

// The newsletter: the field is found by the accessible name given in labels.email. After submitting, onSubmit counts a
// subscriber (the Lab's `about` line reads the counter) and the form shows its `done` text.
test("bültene abone olunca teşekkür ve sayaç artar", async () => {
  const s = renderTest(() => <SiteFooterLab />)
  await s.type("E-posta adresin", "ayse@ornek.com")
  await s.click("Abone ol")
  await s.wait(() => s.sees("Teşekkürler, görüşürüz!"))
  expect(s.text()).toContain("1 abone")
})
