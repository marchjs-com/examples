// Tests for BreadcrumbsLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <BreadcrumbsLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.find(text) finds one by its visible text or accessible name
//   (null when absent), s.sees(text) says whether text is on screen, and s.click(text) clicks like a user and waits
//   until the view has updated (so those tests are async and await it).
// - The tests check what a user or a screen reader can observe (the nav landmark and its name, which crumb is current,
//   separators, buttons, menus) rather than internal state. Part classes (.m-bc-sep, .m-bc-more, .is-current) are in
//   the Breadcrumbs docs.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { BreadcrumbsLab } from "./BreadcrumbsLab.tsx"

// The root is a <nav> with the name from `label`, the class and the colour token; the last crumb is the current page,
// and the separator is the text given in `separator`.
test("nav adı, sınıfı ve rengi taşır; son parça geçerli sayfadır; ayraç kendi metnin", () => {
  const s = renderTest(() => <BreadcrumbsLab />)
  const nav = s.get(".lab-bc")
  expect(nav?.tagName).toBe("NAV")
  expect(nav?.getAttribute("aria-label")).toBe("Belge yolu")
  expect(nav?.getAttribute("data-m-color")).toBe("brand-blue")
  expect(s.get(".lab-bc .is-current")?.textContent).toBe("Özet")
  expect(s.get(".lab-bc .m-bc-sep")?.textContent).toBe("/")
})

// A crumb with onSelect is a button (the click is counted). separator={false} draws no separators at all, and an icon
// given as `separator` is drawn inside the separator element.
test("onSelect'li parça bir düğmedir; separator={false} ayraçsız, bir ikon da ayraç olur", async () => {
  const s = renderTest(() => <BreadcrumbsLab />)
  await s.click("Bölüm")
  expect(s.sees("Bölüm ve Belgeler 1 kez açıldı")).toBe(true)
  expect(s.all(".lab-bc2 .m-bc-sep").length).toBe(0)
  expect(s.get(".lab-bc3 .m-bc-sep svg")).not.toBe(null)
})

// A crumb with `siblings` is a menu button whose name comes from labels.goTo. Choosing a sibling runs its onSelect: the
// file changes, and the crumb (and so its menu button's name) follows.
test("kardeş menüsü goTo adıyla açılır; bir kardeşe basınca dosya değişir", async () => {
  const s = renderTest(() => <BreadcrumbsLab />)
  await s.click("rapor.md yanındakiler")
  await s.click("notlar.md")
  expect(s.sees("açık dosya: notlar.md")).toBe(true)
  expect(s.find("notlar.md yanındakiler")).not.toBe(null)
})

// When the path does not fit, the middle crumbs collapse into a menu button; labels.more is its accessible name and
// `ellipsis` its content. (The test's box is narrow, so the collapse is visible here.)
test("ortadaki parçaların … menüsü kendi adını ve içeriğini taşır (sığmayınca görünür)", () => {
  const s = renderTest(() => <BreadcrumbsLab />)
  const more = s.get(".lab-bc .m-bc-more button")
  expect(more?.getAttribute("aria-label")).toBe("Aradaki klasörler")
  expect(more?.textContent).toBe("···")
})
