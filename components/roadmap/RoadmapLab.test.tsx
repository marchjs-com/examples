// Tests for RoadmapLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <RoadmapLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The Lab's switches are found by their texts; the roadmap by the class .lab-rm.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { RoadmapLab } from "./RoadmapLab.tsx"

// Four entries are drawn, and the status badges use the texts given in `labels`.
test("dört girdi; durum rozetleri kendi metinleriyle", () => {
  const s = renderTest(() => <RoadmapLab />)
  expect(s.all(".lab-rm .m-rm-tl > li").length).toBe(4)
  const badges = s.all(".lab-rm .m-rm-badge").map((b: Element) => b.textContent)
  expect(badges).toEqual(["Yayında", "Yayında", "Yapılıyor", "Sırada"])
})

// scroll={false} leaves the line full (the is-scroll class is absent); turning `rail` off removes the line itself.
test("kaydırma kapalıyken çizgi dolu; çizgi kapanınca gider", async () => {
  const s = renderTest(() => <RoadmapLab />)
  expect(s.get(".lab-rm")?.classList.contains("is-scroll")).toBe(false)
  expect(s.get(".lab-rm .m-rm-rail")).not.toBe(null)
  await s.click("Çizgi")
  expect(s.get(".lab-rm .m-rm-rail")).toBe(null)
})

// `badges` as a function replaces the built-in badge: it receives the status and its text, and our own element appears.
test("kendi rozetim: durum ve metin bir arada", async () => {
  const s = renderTest(() => <RoadmapLab />)
  await s.click("kendi rozetim")
  expect(s.get(".lab-rm .m-rm-badge")).toBe(null)
  expect(s.get(".lab-rm .lab-badge")?.textContent).toContain("Yayında")
})

// badges={false}: no badge at all, neither the built-in nor our own, but the entries are still there.
test("rozetsiz: başlıklar yalın", async () => {
  const s = renderTest(() => <RoadmapLab />)
  await s.click("rozetsiz")
  expect(s.get(".lab-rm .m-rm-badge")).toBe(null)
  expect(s.get(".lab-rm .lab-badge")).toBe(null)
  expect(s.sees("Topluluk ödülleri")).toBe(true)
})
