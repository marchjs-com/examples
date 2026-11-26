import { test, expect, renderTest } from "march/testing"
import { SplitFlapLab } from "./SplitFlapLab.tsx"

// Tests for SplitFlapLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: one cell per character, the text for screen readers, a change that flips the board until
// onSettle reports it, your own reel, and motion={false} changing at once.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <SplitFlapLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.wait(ms or predicate): waits for time to pass or for a condition; here it waits for the flaps to stop.
// - expect(x).toBe(y), toContain, toBeGreaterThan…: the assertions, as in Jest or Vitest.
// The flaps run on the real motion clock in the IDE, so the flipping test waits for onSettle instead of a fixed time.

// Proves the structure: 14 cells (length), the cells hidden from screen readers and one text "Duyuru: KAPI A4".
test("her karakter bir hücre; ekran okuyucu metni bir kez duyar", () => {
  const s = renderTest(() => <SplitFlapLab />)
  expect(s.all(".lab-board .m-flap-cell").length).toBe(14)
  expect(s.get(".lab-board .m-flap-cells")!.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-board .m-sr-only")!.textContent).toContain("KAPI A4")
})

// Proves the flipping: after the gate button the board turns (is-moving), and once every cell stopped onSettle has
// reported "KAPI A5" (one flap: 4 is just before 5 on the reel).
test("Kapı değişti panoyu çevirir, sonunda onSettle bildirir", async () => {
  const s = renderTest(() => <SplitFlapLab />)
  await s.click(".lab-gate")
  await s.wait(() => s.get(".lab-last")!.textContent === "KAPI A5", { timeout: 4000 })
  expect(s.get(".lab-last")!.textContent).toBe("KAPI A5")
  expect(Number(s.get(".lab-settles")!.textContent)).toBeGreaterThan(0)
})

// Proves your own reel keeps lower case, and that motion={false} shows a new text at once.
test("kendi makaranız küçük harfi korur; hareketsiz pano hemen değişir", async () => {
  const s = renderTest(() => <SplitFlapLab />)
  expect(s.get(".lab-own .m-sr-only")!.textContent).toContain("abc")
  await s.click(".lab-board-now")
  expect(s.get(".lab-still .m-sr-only")!.textContent).toContain("BİNİŞ BAŞLADI")
  expect(s.get(".lab-still")!.getAttribute("class")).not.toContain("is-moving")
})
