// Tests for CountRollLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CountRollLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element; s.click(text) clicks like a user and waits until the view has updated;
//   s.flush(n) lets the view settle for n more frames. Tests that click are async and await it.
// - The tests check the visible text of the number, not the rolling digits, because the motion is shortened by
//   reduced motion and is not part of the meaning.
import { test, expect, renderTest } from "march/testing"
import { CountRollLab } from "./CountRollLab.tsx"

// `formatter` replaces the visible text, so the number is written with the word "likes" in Turkish, and it updates when
// the value changes (roll={false} makes the digits change at once, so the text is final right after the click).
test("formatter kendi metnini yazar ve değer değişince güncellenir", async () => {
  const s = renderTest(() => <CountRollLab />)
  expect(s.get(".lab-own")?.textContent).toContain("0 beğeni")
  await s.click("+5")
  await s.flush(2)
  expect(s.get(".lab-own")?.textContent).toContain("5 beğeni")
})

// hideZero draws nothing while the value is zero (a count next to an icon looks better empty).
test("hideZero sıfırı göstermez", () => {
  const s = renderTest(() => <CountRollLab />)
  expect(s.get(".lab-zero")?.textContent?.trim()).toBe("")
})
