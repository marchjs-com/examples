// Tests for ThreadNavLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ThreadNavLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds an element by its accessible name or visible text, s.get / s.all by CSS selector, s.sees(text) says
//   whether a text is on the page; s.click(text) clicks like a user and waits until the view has updated (so a test that
//   clicks is async and awaits it); s.type(name, text) types into a field found by its accessible name; s.wait(condition)
//   waits until the condition is true (the search filters after a short moment).
// - The tests check what a user or a screen reader can observe (names, aria-current, aria-expanded, links, visible text)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected text. .m-thn-bead and .m-thn-panel are ThreadNav's own parts
// (a bead on the thread, the opened capsule); the names used here come from the `labels` and the data in ThreadNavLab.
import { test, expect, renderTest } from "march/testing"
import { ThreadNavLab } from "./ThreadNavLab.tsx"

// `labels.group` is the accessible name of the nav, and `class` lands on the root. The bead of where you are (the components section,
// the section of the starting page) has aria-current="location".
test("labels.group iplikteki nav'ın adı; class köke eklenir", () => {
  const s = renderTest(() => <ThreadNavLab />)
  expect(s.find("Lab gezinme")?.tagName).toBe("NAV")
  expect(s.get(".lab-thread")).not.toBe(null)
  expect(s.get('.m-thn-bead[aria-label="Bileşenler"]')?.getAttribute("aria-current")).toBe("location")
})

// Pressing a bead opens its capsule (aria-expanded, and the panel exists). Choosing a page calls onNavigate with the item
// and its path, which the Lab writes as text, and with closeOnNavigate (on by default) the capsule closes.
test("Bir boncuk kapsülü açar; bir sayfa seçilince onNavigate yolu verir, kapsül kapanır", async () => {
  const s = renderTest(() => <ThreadNavLab />)
  await s.click("Bileşenler")
  expect(s.get('.m-thn-bead[aria-label="Bileşenler"]')?.getAttribute("aria-expanded")).toBe("true")
  expect(s.get(".m-thn-panel")).not.toBe(null)
  await s.click("Çubuk")
  expect(s.sees("Seçilen: Bileşenler › Grafikler › Çubuk")).toBe(true)
  expect(s.get(".m-thn-panel")).toBe(null)
})

// The search field filters the categories and pages; when nothing matches, our own `labels.empty` text is shown, and our
// own `labels.close` button closes the capsule.
test("Arama süzer, eşleşen yoksa labels.empty görünür; labels.close kapsülü kapatır", async () => {
  const s = renderTest(() => <ThreadNavLab />)
  await s.click("Görünüm")
  await s.type("Lab'da ara", "zzz")
  await s.wait(() => s.sees("Burada bir şey yok"))
  expect(s.sees("Burada bir şey yok")).toBe(true)
  await s.click("Kapsülü kapat")
  expect(s.get(".m-thn-panel")).toBe(null)
})

// An item with `href` is a real link (an <a>). A section without categories is a bead that goes to the page itself: pressing
// it calls onNavigate straight away.
test("href verilen kategori bir bağlantı; kategorisiz bölüm kendisi gider", async () => {
  const s = renderTest(() => <ThreadNavLab />)
  await s.click("Hakkında")
  expect(s.find("Sürüm notları")?.closest("a")?.getAttribute("href")).toBe("https://marchjs.com")
  await s.click("Profil")
  expect(s.sees("Sayfa: Profil")).toBe(true)
})
