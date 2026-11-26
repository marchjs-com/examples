// Tests for AppUILab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <AppUILab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns one element (or null), s.find(text) finds an element by its visible text, s.sees(text)
//   says whether text is on screen, s.click(label) clicks like a user and waits until the view has updated (that is
//   why the test that clicks is async and awaits it).
// - The tests check what a user can observe (titles, rendered file content, panel text, which parts exist) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text. The part classes (.m-app-title,
// .m-app-desc, .m-app-bar, .m-app-main, .m-app-file) are listed in the AppUI docs.
import { test, expect, renderTest } from "march/testing"
import { AppUILab } from "./AppUILab.tsx"

// The top bar: `title`, `description` drawn with the `descriptionMark` prefix, the layout menu button named by
// `layoutLabel`, and the `id` on the root. The mark ("#") is part of the visible description text.
test("üst çubuk: başlık, kendi işaretli açıklama, Düzenler düğmesi, id", () => {
  const s = renderTest(() => <AppUILab />)
  expect(s.get(".lab-app .m-app-title")?.textContent).toBe("lab-ide")
  expect(s.get(".lab-app .m-app-desc")?.textContent).toContain("# bütün özellikler")
  expect(s.find("Düzenler")).toBeTruthy()
  expect(s.get("#lab-app")).toBeTruthy()
})

// The plugin registers a file type for ".md": the README panel (a file panel) is drawn by that file type's mount
// function, so its first line appears inside an <article>. The plugin's own panel exists too, and the kit callback
// counted the panels (shown in the status bar).
test("eklenti: .md dosyasını kendi türü çizer, kendi paneli de gelir", () => {
  const s = renderTest(() => <AppUILab />)
  expect(s.get(".lab-app .m-app-file article")?.textContent).toBe("# Merhaba AppUI")
  expect(s.sees("Yıldızlar")).toBe(true)
  expect(s.sees("eklenti paneli: 1")).toBe(true)
})

// The `side` and `status` slots are in place: with a side bar the main area starts with the dock, not the plain body,
// and the status bar's text is visible.
test("yan ve durum yuvaları yerinde", () => {
  const s = renderTest(() => <AppUILab />)
  expect(s.get(".lab-app .m-app-main")?.firstElementChild?.classList.contains("m-app-body")).toBe(false)
  expect(s.sees("değişiklik:")).toBe(true)
})

// The status bar item toggles the `bar` prop: the top bar disappears and comes back, and the item's own text flips
// between the two labels.
test("durum çubuğundaki düğme üst çubuğu gizler ve geri getirir", async () => {
  const s = renderTest(() => <AppUILab />)
  await s.click("Çubuğu gizle")
  expect(s.get(".lab-app .m-app-bar")).toBe(null)
  await s.click("Çubuğu göster")
  expect(s.get(".lab-app .m-app-bar")).toBeTruthy()
})
