// Tests for HonestCompareLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <HonestCompareLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements by CSS, s.find(text) finds one by its text or name, and s.click(text)
//   clicks like a user and waits until the view has updated (so those tests are async).
// - The tests check observable things (texts, tags, which rows are hidden) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { HonestCompareLab } from "./HonestCompareLab.tsx"

// The summary uses our labels.counts text, and the caption and region name come from caption and labels.region.
test("özet kendi sayım metniyle; başlık ve bölge adı", () => {
  const s = renderTest(() => <HonestCompareLab />)
  expect(s.get(".lab-hc .m-hc-counts")?.textContent).toBe("2 önde · 0 eşit · 2 geride")
  expect(s.get(".lab-hc caption")?.textContent).toBe("İşe nasıl gidelim?")
  expect(s.find("Ulaşım tablosu")).not.toBe(null)
})

// Rows where we are behind carry a tag; the filter button then hides every other row and its text changes to the show-all text.
test("geride kalan satırlar etiketli; süzgeç yalnız onları bırakır", async () => {
  const s = renderTest(() => <HonestCompareLab />)
  expect(s.all(".lab-hc .m-hc-tag.is-behind").length).toBe(2)
  await s.click("Yalnız geride olduklarımız")
  expect(s.all(".lab-hc tr.m-hc-row.is-hidden").length).toBe(3)
  expect(s.find("Hepsini göster")).not.toBe(null)
})

// With the Tags switch off (tags={false}), no tag is drawn.
test("etiketler kapanınca gider", async () => {
  const s = renderTest(() => <HonestCompareLab />)
  await s.click("Etiketler")
  expect(s.container.querySelector(".lab-hc .m-hc-tag")).toBe(null)
})

// With renderCell on, scored cells are drawn by our function: our column's cells are marked, and the text is ours.
test("kendi hücre çizimi: Var / Yok, kendi sütunumuz işaretli", async () => {
  const s = renderTest(() => <HonestCompareLab />)
  await s.click("Yazıyla hücreler")
  expect(s.all(".lab-hc b.lab-mine").length).toBe(3)
  expect(s.get(".lab-hc b.lab-mine")?.textContent).toBe("Var")
})
