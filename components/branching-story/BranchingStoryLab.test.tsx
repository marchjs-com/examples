// Tests for BranchingStoryLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <BranchingStoryLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.find(text) finds one by its visible text (null when absent),
//   s.text() is all visible text, s.click(text) clicks like a user, s.press(key, element) sends a key press. The last
//   two wait until the view has updated, so the tests that use them are async and await them.
// - The tests check what a user or a screen reader can observe (titles, the numbered choices, the path text, counters)
//   rather than internal state. Part classes (.m-bs-title, .m-bs-key...) are listed in the BranchingStory docs.
// To adapt them: copy one test, change the text you click or expect.
import { test, expect, renderTest } from "march/testing"
import { BranchingStoryLab } from "./BranchingStoryLab.tsx"

// The first passage: the story's accessible name (`label`), the passage title, the choices numbered 1 and 2, and the
// endings counter written by labels.endings ("0 of 2 found so far").
test("ilk pasaj, ad ve numaralı seçenekler", () => {
  const s = renderTest(() => <BranchingStoryLab />)
  expect(s.get(".lab-bs")?.getAttribute("aria-label")).toBe("Orman macerası")
  expect(s.get(".lab-bs .m-bs-title")?.textContent).toBe("Ormanın girişi")
  expect(s.all(".lab-bs .m-bs-key").map((k: Element) => k.textContent)).toEqual(["1", "2"])
  expect(s.find("0/2 son")).not.toBe(null)
})

// A choice opens the next passage, and onChange reports the new path, which the Lab prints.
test("bir seçim yeni pasajı açar, onChange yolu yazar", async () => {
  const s = renderTest(() => <BranchingStoryLab />)
  await s.click("Dere boyu")
  expect(s.find("Derenin kıyısı")).not.toBe(null)
  expect(s.get(".lab-path")?.textContent).toBe("Yol: orman → dere")
})

// A passage with `ending` ends the story: its name is written with labels.endingPrefix, the counter goes up and the
// restart button carries the text from labels.restart. Restarting returns the path to the start.
test("sona varınca son adı, sayaç ve kendi düğme metni", async () => {
  const s = renderTest(() => <BranchingStoryLab />)
  await s.click("Tepeye")
  expect(s.text()).toContain("Son: Manzara")
  expect(s.find("1/2 son")).not.toBe(null)
  await s.click("Yeniden")
  expect(s.get(".lab-path")?.textContent).toBe("Yol: orman")
})

// Number keys pick a choice (here 2 picks the second one), and the Lab's own button rewinds the story from outside by
// setting the controlled `path`.
test("rakam tuşu seçer; dışarıdan başa sarılır", async () => {
  const s = renderTest(() => <BranchingStoryLab />)
  await s.press("2", s.get(".lab-bs")!)
  expect(s.find("Tepede")).not.toBe(null)
  await s.click("Başa sar")
  expect(s.find("Ormanın girişi")).not.toBe(null)
})
