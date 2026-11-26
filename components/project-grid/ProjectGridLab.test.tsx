// Tests for ProjectGridLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ProjectGridLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - Cards are found by the Lab's classes (.lab-grid, .m-pg-card); the filter group by its role and accessible name.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { ProjectGridLab } from "./ProjectGridLab.tsx"

// Four cards are drawn, and the chip group is named by `filtersLabel`; it holds the custom "all" chip and a chip for
// each category.
test("dört kart; süzgeç grubunun adı ve Tümü + üç kategori çipi", () => {
  const s = renderTest(() => <ProjectGridLab />)
  expect(s.all(".lab-grid .m-pg-card").length).toBe(4)
  const group = s.get('.lab-grid [role="group"]')
  expect(group?.getAttribute("aria-label")).toBe("Projeleri süz")
  expect(group?.textContent).toContain("Tümü")
  expect(group?.textContent).toContain("Uygulama")
})

// Choosing a category chip keeps only its cards visible. The Lab has motion off, so the change is immediate and the
// test can count visible cards without waiting for an animation.
test("Marka çipi: yalnız iki marka işi görünür kalır (hareketsiz)", async () => {
  const s = renderTest(() => <ProjectGridLab />)
  await s.click("Marka")
  const shown = s.all(".lab-grid .m-pg-card").filter((c: Element) => !(c as HTMLElement).hidden)
  expect(shown.length).toBe(2)
})

// With `onOpen` given, pressing a card's title calls it with the project; the Lab prints the title.
test("başlığa basınca onOpen projeyi alır", async () => {
  const s = renderTest(() => <ProjectGridLab />)
  await s.click("Kite uygulaması")
  expect(s.find("Açılan: Kite uygulaması")).not.toBe(null)
})

// The Lab's switches change props live: cols becomes 2 (a column class appears) and `arrow` as a function replaces
// the badge on all four cards with our own content.
test("anahtarlar: iki sütun ve rozette yıl", async () => {
  const s = renderTest(() => <ProjectGridLab />)
  await s.click("İki sütun")
  expect(s.get(".m-pg-cols-2")).not.toBe(null)
  await s.click("Rozette yıl")
  expect(s.all(".m-pg-go.is-own").length).toBe(4)
})
