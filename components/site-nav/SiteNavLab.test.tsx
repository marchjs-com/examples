// Tests for SiteNavLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SiteNavLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null) by CSS selector, s.find("name") finds an element by its visible text or
//   aria-label, s.sees("text") says whether the text is on screen.
// - s.click(target) clicks like a user (the target is a visible name or an element) and waits until the view has
//   updated, which is why the tests that click are async and await it.
// - The tests check what a user or a screen reader can observe (the accessible name of the nav, aria-current, whether the
//   pill and the menu button exist) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { SiteNavLab } from "./SiteNavLab.tsx"

// `mode` and `class` land on the header; labels.main names the navigation; the link whose `active` function returns true
// carries aria-current="page".
test("kendi adıyla bir gezinme; geçerli sayfa işaretli", () => {
  const s = renderTest(() => <SiteNavLab />)
  expect(s.get("header.lab-nav")?.classList.contains("m-snav-floating")).toBe(true)
  expect(s.get('nav[aria-label="Site"]')).not.toBe(null)
  expect(s.get('a[aria-current="page"]')?.textContent).toBe("Keşfet")
})

// onNavigate records the chosen href in the Lab, so after the click the "current page" mark moves and the printed line
// shows the new value.
test("bir bağlantıya basınca geçerli sayfa değişir", async () => {
  const s = renderTest(() => <SiteNavLab />)
  await s.click(s.get('a[href="#lab-blog"]')!)
  expect(s.get('a[aria-current="page"]')?.textContent).toBe("Blog")
  expect(s.sees("Seçili sayfa: #lab-blog")).toBe(true)
})

// The `actions` slot takes any node; here a button that counts its presses.
test("eylem düğmesi sayar", async () => {
  const s = renderTest(() => <SiteNavLab />)
  await s.click("Katıl (0)")
  expect(s.find("Katıl (1)")).not.toBe(null)
})

// pill={false} removes the sliding pill and menu={false} removes the menu button (found by labels.openMenu); both exist
// at first and both are gone after the Lab's switches are turned off.
test("hap ve menü düğmesi anahtarlarla kapanır", async () => {
  const s = renderTest(() => <SiteNavLab />)
  expect(s.get(".m-snav-pill")).not.toBe(null)
  expect(s.get('[aria-label="Menüyü göster"]')).not.toBe(null)
  await s.click("Hap")
  await s.click("Menü düğmesi")
  expect(s.get(".m-snav-pill")).toBe(null)
  expect(s.get('[aria-label="Menüyü göster"]')).toBe(null)
})
