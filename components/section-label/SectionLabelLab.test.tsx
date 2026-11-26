// Tests for SectionLabelLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SectionLabelLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null), s.find("text") finds an element by its visible text or aria-label.
// - s.click("name") clicks the control with that visible text or aria-label (the icon buttons are found by their
//   labels); it waits until the view has updated, which is why the tests that click are async and await it.
// - The tests check what a user or a screen reader can observe (the count text, the root element and its id, state
//   classes, aria-hidden on the rule) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the selector or the expected value. The part classes (.m-section-label-count,
// -text, -rule) are the classes SectionLabel puts on its own parts.
import { test, expect, renderTest } from "march/testing"
import { SectionLabelLab } from "./SectionLabelLab.tsx"

// The count is live: it starts at 3 (the Lab's signal) and the add button, found by its accessible name, raises it.
test("Görev ekle'ye basınca sayı canlı artar", async () => {
  const s = renderTest(() => <SectionLabelLab />)
  expect(s.get(".lab-tasks .m-section-label-count")?.textContent).toBe("3")
  await s.click("Görev ekle")
  expect(s.get(".lab-tasks .m-section-label-count")?.textContent).toBe("4")
})

// `as` chooses the root element (h3 here, and a legend inside a fieldset for the other label); other attributes such as
// `id` are passed to that root.
test("as=\"h3\" kök öğeyi değiştirir; id köke gider", () => {
  const s = renderTest(() => <SectionLabelLab />)
  const root = s.get(".lab-reports")
  expect(root?.tagName).toBe("H3")
  expect(root?.getAttribute("id")).toBe("raporlar")
  expect(s.find("Bildirimler")?.closest("legend")).not.toBe(null)
})

// upper={false} adds the "plain" state class, size="md" its own class, and `rule` draws a line that is aria-hidden
// (decorative, so screen readers skip it).
test("upper={false}, size=\"md\" ve rule sınıf ve çizgi olarak görünür", () => {
  const s = renderTest(() => <SectionLabelLab />)
  const root = s.get(".lab-reports")
  expect(root?.classList.contains("is-plain")).toBe(true)
  expect(root?.classList.contains("m-section-label-md")).toBe(true)
  expect(s.get(".lab-reports .m-section-label-rule")?.getAttribute("aria-hidden")).toBe("true")
})

// `label` can be a live value: pressing the button changes the Lab's signal and the label text follows it.
test("label canlı: Başlığı değiştir'e basınca metin değişir", async () => {
  const s = renderTest(() => <SectionLabelLab />)
  await s.click("Başlığı değiştir")
  expect(s.get(".lab-live .m-section-label-text")?.textContent).toBe("Yapılacaklar")
})
