import { test, expect, renderTest } from "march/testing"
import { DotMatrixLab } from "./DotMatrixLab.tsx"

// Tests for DotMatrixLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: the boards are accessible images named label + text, a click changes the scoreboard, the ticker
// scrolls and the pause button pauses it, and the parts / scroll options of the bare board.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <DotMatrixLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.wait(ms or predicate): waits for time to pass or for a condition (useful for animations and timers).
// - expect(x).toBe(y), toContain, toBeTruthy, not.toContain…: the assertions, as in Jest or Vitest.
// The tests check what a user (or a screen reader) can observe: the accessible names and the classes, not the dots.

// Proves that a board is one image for assistive technology: role="img", named "Skor: 7", with the drawing hidden.
test("her pano bir görsel: adı ve metni ekran okuyucuya gider", () => {
  const s = renderTest(() => <DotMatrixLab />)
  const score = s.get(".lab-score")!
  expect(score.getAttribute("role")).toBe("img")
  expect(score.getAttribute("aria-label")).toBe("Skor: 7")
  expect(s.get(".lab-score .m-dm-screen")!.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-temp")!.getAttribute("aria-label")).toContain("21")
})

// Proves that a value change reaches the board: "Gol!" raises the score and the accessible name follows at once
// (the dots dissolve in on the motion engine; the name never waits for them).
test("Gol! skoru artırır", async () => {
  const s = renderTest(() => <DotMatrixLab />)
  await s.click(".lab-goal")
  expect(s.get(".lab-score")!.getAttribute("aria-label")).toBe("Skor: 8")
})

// Proves the ticker: its text is longer than 12 characters, so it is a scrolling board; the pause button stops it.
test("kayan yazı kayar, Durdur düğmesi durdurur", async () => {
  const s = renderTest(() => <DotMatrixLab />)
  expect(s.get(".lab-ticker")!.getAttribute("class")).toContain("is-scrolling")
  await s.click(".lab-pause")
  expect(s.get(".lab-pause")!.textContent).toContain("Sürdür")
})

// Proves the options of the bare board: no housing (m-dm-bare), no unlit dots, and a cut text that does not scroll.
test("çıplak pano: gövde yok, sönük nokta yok, kesik metin kaymaz", () => {
  const s = renderTest(() => <DotMatrixLab />)
  const bare = s.get(".lab-bare")!
  expect(bare.getAttribute("class")).toContain("m-dm-bare")
  expect(bare.getAttribute("class")).not.toContain("is-scrolling")
  expect(s.get(".lab-bare .m-dm-off")!.getAttribute("d")).toBe("")
})
