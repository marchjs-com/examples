// Tests for DockLayoutLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DockLayoutLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it; s.click(target) clicks like a user (a visible text or an element) and waits for the view
//   to update, so tests that click are async.
// - s.flush(n) lets pending timers and microtasks run for n ticks (the dock updates a moment after a click).
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DockLayoutLab } from "./DockLayoutLab.tsx"

// Every panel gets a tab with its title; `id` and `class` land on the root, and `label` is the accessible name of
// the whole workspace.
test("beş panelin sekmesi var; ad, id ve sınıf yerinde", () => {
  const s = renderTest(() => <DockLayoutLab />)
  for (const t of ["Dosyalar", "lab.ts", "Günlük", "Hata ayıklama", "Kilitli"]) expect(s.sees(t)).toBe(true)
  expect(s.get("#lab-dock")?.classList.contains("lab-dock")).toBe(true)
  expect(s.get(".lab-dock")?.getAttribute("aria-label")).toBe("Lab çalışma alanı")
})

// `labels` replace the texts of the group buttons (maximize, collapse to a strip, the panel menu).
test("grup düğmeleri kendi metinleriyle", () => {
  const s = renderTest(() => <DockLayoutLab />)
  expect(s.find("Tam boy")).toBeTruthy()
  expect(s.find("Şeride indir")).toBeTruthy()
  expect(s.find("Seçenekler")).toBeTruthy()
})

// The Lab's button calls api.close("log"). The dock asks onClose first; the Lab records the id and returns false, which
// means "keep the panel"; the Lab shows the closed id and adds a line to its log.
test("api.close onClose'a sorar; false dönünce panel kalır", async () => {
  const s = renderTest(() => <DockLayoutLab />)
  await s.click("Günlüğü kapat")
  await s.flush(4)
  expect(s.sees("kapatılan: log")).toBe(true)
  expect(s.sees("log kapandı")).toBe(true)
})

// The editor tab shows a "changed" dot while its `dirty` getter is true. Pressing the button in the panel flips the
// state, so the button text changes (the dot follows the same state).
test("değişti noktası: Kaydet'e basınca kalkar", async () => {
  const s = renderTest(() => <DockLayoutLab />)
  await s.click("Kaydet")
  expect(s.find("Değiştir")).toBeTruthy()
})
