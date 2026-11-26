import { test, expect, renderTest } from "march/testing"
import { StatLab } from "./StatLab.tsx"

// Tests for StatLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check formatting, the good / bad colouring of the change, the empty state, `invert` and the motion, so a change
// to Stat that breaks any of them shows up here first.

// Proves format and the computed change: the value passes through `format` ("120 puan"), and 120 against previous 100
// is a +20 % change marked good. If delta were computed or coloured wrong, the class or the number would differ.
test("değer biçimlenir; önceki değere göre artış iyi (yeşil)", () => {
  const s = renderTest(() => <StatLab />)
  const main = s.get(".lab-main")!
  expect(main.querySelector(".m-stat-value")!.textContent).toBe("120 puan")
  expect(main.querySelector(".m-stat-delta")!.className).toContain("m-stat-good")
  expect(main.querySelector(".m-stat-delta-value")!.textContent).toContain("20")
})

// Proves the direction flips: after "Azalt" the value (60) is below previous (100), so the change must be both "down"
// and "bad". Checking both classes guards against a Stat that turns the arrow but not the meaning.
test("azalınca değişim düşüşe ve kötüye döner", async () => {
  const s = renderTest(() => <StatLab />)
  await s.click(".lab-down")
  const delta = s.get(".lab-main .m-stat-delta")!
  expect(delta.className).toContain("m-stat-down")
  expect(delta.className).toContain("m-stat-bad")
})

// Proves spark + sparkY draw a trend line from object rows, and that a null value shows the `empty` text instead of
// "null" or a broken number.
test("değer yoksa boş metni yazar; eğilim çizgisi var", async () => {
  const s = renderTest(() => <StatLab />)
  expect(s.get(".lab-main .m-sparkline")).toBeTruthy()
  await s.click(".lab-none")
  expect(s.get(".lab-main .m-stat-value")!.textContent).toBe("ölçülmedi")
})

// Proves `invert`: on the latency Stat a +25 % rise is bad. Without invert it would be green, the wrong message for a
// cost or a delay.
test("invert: maliyetteki artış kötüdür", () => {
  const s = renderTest(() => <StatLab />)
  expect(s.get(".lab-cost .m-stat-delta")!.className).toContain("m-stat-bad")
})

// Proves the motion contract: the animate={false} Stat shows its value at once; the arrow starts pointing up; after
// "Azalt" the main Stat's count settles on the right final text (60 puan) after its 700 ms, and the single arrow has
// turned to point down (rotate 180deg) instead of being swapped for another glyph.
test("animate: ilk değer hemen yazılır (enter: false), ok düşüşte aşağı döner; animate={false} anında", async () => {
  const s = renderTest(() => <StatLab />)
  const q = (sel: string) => s.container.querySelector<HTMLElement>(sel)
  expect(q(".lab-cost .m-stat-value")!.textContent).toBe("240")
  expect(q(".lab-main .m-stat-arrow")!.textContent).toBe("↑")
  await s.click(q(".lab-down")!)
  // Wait longer than the 700 ms animation so the count has finished.
  await new Promise((r) => setTimeout(r, 900))
  expect(q(".lab-main .m-stat-value")!.textContent).toBe("60 puan")
  expect(q(".lab-main .m-stat-arrow")!.style.getPropertyValue("transform")).toBe("rotate(180deg)")
})
