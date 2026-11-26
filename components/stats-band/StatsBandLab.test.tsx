// Tests for StatsBandLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StatsBandLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all find elements by CSS selector; s.sees(text) says whether a text is on the page; s.click(text or
//   element) clicks like a user and waits until the view has updated (so a test that clicks is async and awaits it).
// - The tests check what a user can observe (the list, the written numbers, the class of the chosen variant) rather
//   than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. Class names (.m-stats-item,
// .m-stats-plain, .m-counter ...) are the parts of StatsBand; .lab-stats is the class given in StatsBandLab.
import { test, expect, renderTest } from "march/testing"
import { StatsBandLab } from "./StatsBandLab.tsx"

// The band is one <dl> with the "divided" look (the Lab's starting variant) and one item per figure. The note of the
// first item is visible text.
test("dört rakam bir tanım listesinde; çizgili görünüm", () => {
  const s = renderTest(() => <StatsBandLab />)
  expect(s.get("dl.lab-stats")?.classList.contains("m-stats-divided")).toBe(true)
  expect(s.all(".lab-stats .m-stats-item").length).toBe(4)
  expect(s.sees("her gün artıyor")).toBe(true)
})

// The Lab starts in mode "none", where numbers are written as they are, without counting, so the text can be checked
// right away: the first is a plain 42, the third carries its suffix "%" and the fourth its prefix "€".
test("sayaçsız modda düz sayı, ön ve son ekleriyle", () => {
  const s = renderTest(() => <StatsBandLab />)
  const plain = s.all(".lab-stats .m-stats-plain")
  expect(plain.length).toBe(4)
  expect(plain[0]?.textContent).toBe("42")
  expect(plain[2]?.textContent).toContain("%")
  expect(plain[3]?.textContent).toContain("€")
})

// The member count is a function ($members), so the band follows it: after one click it reads 43.
test("üye sayısı bir işlev: düğmeyle artar", async () => {
  const s = renderTest(() => <StatsBandLab />)
  await s.click("+1 üye")
  expect(s.get(".lab-stats .m-stats-plain")?.textContent).toBe("43")
})

// The two Segmented controls choose the variant and the counter mode. With "cards" the list gets the cards class; with
// "count" the numbers are no longer plain text but a Counter element.
test("kartlar görünümü ve sayaç modu seçilir", async () => {
  const s = renderTest(() => <StatsBandLab />)
  await s.click("cards")
  await s.click("count")
  expect(s.get("dl.lab-stats")?.classList.contains("m-stats-cards")).toBe(true)
  expect(s.get(".lab-stats .m-stats-plain")).toBe(null)
  expect(s.get(".lab-stats .m-counter")).not.toBe(null)
})
