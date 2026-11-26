// Tests for ClampTextLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ClampTextLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element; s.find(text) finds the element carrying a text; s.click(textOrElement) clicks
//   like a user and waits until the view has updated (so those tests are async and await it).
// - The tests check what a user or a screen reader can observe (the switch's name and aria-expanded, the is-clamped
//   state class, whether a button exists) rather than internal state. The Lab gives each example a class (lab-labels,
//   lab-controlled...) so a test can find it.
import { test, expect, renderTest } from "march/testing"
import { ClampTextLab } from "./ClampTextLab.tsx"

// With your own labels the switch reads "read all" (more) and "fold" (less) in Turkish. Opening drops the clamped class and
// sets aria-expanded; pressing it again folds the text.
test("kendi metin: tamamını oku açar, kısalt katlar", async () => {
  const s = renderTest(() => <ClampTextLab />)
  await s.click("tamamını oku")
  // The button is redrawn: while open its name is the "less" label and aria-expanded is "true".
  expect(s.find("kısalt")?.closest("button")?.getAttribute("aria-expanded")).toBe("true")
  expect(s.get(".lab-labels .m-clamp-text")?.classList.contains("is-clamped")).toBe(false)
  await s.click("kısalt")
  expect(s.get(".lab-labels .m-clamp-text")?.classList.contains("is-clamped")).toBe(true)
})

// Controlled mode: the switch calls onOpenChange (the Lab counts the calls), and changing `open` from outside (the
// other button) folds the text again and brings back the "more" label.
test("denetimli: düğme onOpenChange'i çağırır, dışarıdan aç metni açar", async () => {
  const s = renderTest(() => <ClampTextLab />)
  await s.click("aç (denetimli)")
  expect(s.get(".lab-state")?.textContent).toBe("durum: açık · değişim: 1")
  await s.click("Dışarıdan katla")
  expect(s.get(".lab-controlled .m-clamp-text")?.classList.contains("is-clamped")).toBe(true)
  expect(s.find("aç (denetimli)")).not.toBe(null)
})

// defaultOpen starts unfolded and collapsible={false} removes the way back, so no button remains; as="div" is the
// element used for the text.
test("defaultOpen + collapsible={false}: açık başlar, düğme yok", () => {
  const s = renderTest(() => <ClampTextLab />)
  expect(s.get(".lab-default div.m-clamp-text")?.classList.contains("is-clamped")).toBe(false)
  expect(s.get(".lab-default button")).toBe(null)
})

// expandable={false} only folds: the text stays clamped and there is no switch. as="span" changes the element.
test("expandable={false}: katlı kalır, düğme çıkmaz; as=\"span\"", () => {
  const s = renderTest(() => <ClampTextLab />)
  expect(s.get(".lab-fold span.m-clamp-text")?.classList.contains("is-clamped")).toBe(true)
  expect(s.get(".lab-fold button")).toBe(null)
})
