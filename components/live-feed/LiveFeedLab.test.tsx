// Tests for LiveFeedLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LiveFeedLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector and s.all("selector") every match; s.click("text") clicks a
//   button, switch or segment by its text (or an element you pass) and waits until the view has updated, which is why
//   every test that clicks is async and awaits it.
// - The tests check what a user or a screen reader can observe (the accessible name, the rows and their text, the pause
//   button's text, a view class) rather than internal state, so they keep passing when the component's internals change.
//   They do not test the animation itself.
// To adapt them: copy one test, change the selector or the expected text. LiveFeed's part classes (m-lf-item,
// m-lf-pause, m-lf-wall…) are listed in the LiveFeed docs.
import { test, expect, renderTest } from "march/testing"
import { LiveFeedLab } from "./LiveFeedLab.tsx"

// A helper that returns the feed's rows, leaving out an item that is on its way out (it keeps the is-leaving class
// while it fades), so a count is the count of items that are really in the feed.
const rows = (s: { all(sel: string): Element[] }) => s.all(".lab-lf .m-lf-item:not(.is-leaving)")

// The feed is a section named by `label`, and it starts with the two events, the newest on top.
test("akış adlandırılmış bir bölüm; en yenisi üstte", () => {
  const s = renderTest(() => <LiveFeedLab />)
  expect(s.get(".lab-lf")?.getAttribute("aria-label")).toBe("Kulüp akışı")
  expect(rows(s).length).toBe(2)
  expect(rows(s)[0]!.textContent).toContain("Burak koşuya katıldı")
})

// Adding an event puts a new item at the head of the list; the list now has three rows (max is 5).
test("yeni olay en üste girer", async () => {
  const s = renderTest(() => <LiveFeedLab />)
  await s.click("Olay ekle")
  expect(rows(s).length).toBe(3)
  expect(rows(s)[0]!.textContent).toContain("Yeni olay 3")
})

// The pause button shows the text we gave in pauseLabel while running; pressing it switches to resumeLabel.
test("durdur düğmesi kendi metinleriyle açılıp kapanır", async () => {
  const s = renderTest(() => <LiveFeedLab />)
  const b = s.get(".lab-lf .m-lf-pause")!
  expect(b.textContent).toContain("Canlı · durdur")
  await s.click(b)
  expect(s.get(".lab-lf .m-lf-pause")?.textContent).toContain("Durdu · sürdür")
})

// The "wall" segment switches the variant (the root gets the m-lf-wall class); the "own drawing" switch makes
// renderItem draw both items with our own markup (.lab-own). The feed is rebuilt after each change.
test("duvar görünümü ve kendi satır çizimi", async () => {
  const s = renderTest(() => <LiveFeedLab />)
  await s.click("duvar")
  expect(s.get(".lab-lf")?.classList.contains("m-lf-wall")).toBe(true)
  await s.click("Kendi çizimim")
  expect(s.all(".lab-lf .lab-own").length).toBe(2)
})
