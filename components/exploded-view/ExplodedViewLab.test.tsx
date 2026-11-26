// Tests for ExplodedViewLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ExplodedViewLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it; s.click(target) clicks like a user (a visible text, a selector or an element) and waits for
//   the view to update, so tests that click are async.
// - The tests check what a user or a screen reader can see (roles, attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { ExplodedViewLab } from "./ExplodedViewLab.tsx"

// Nothing is drawn again: the content is on the page as it was before the view is taken apart.
test("içerik çizilir", () => {
  const s = renderTest(() => <ExplodedViewLab startOpen={false} />)
  expect(s.sees("Kaydet")).toBe(true)
  expect(s.sees("Elif Arslan")).toBe(true)
})

// The Lab's button changes `open` (a signal); the Lab's own state line shows whether it is apart.
test("Ayır düğmesi open'ı değiştirir", async () => {
  const s = renderTest(() => <ExplodedViewLab startOpen={false} />)
  await s.click(".lab-flip")
  expect(s.get(".lab-state")?.textContent).toContain("ayrık")
})

// While apart, the view marks the elements that became plates with data-m-xv-id. In layer mode `target` picks the
// button, whose content layer gets the id "content". In parts mode the avatar has an explicit `id`, and the badge has none,
// so its label is its id.
test("target ve parts: hedef düğme katmanlarına, avatar ve rozet plakalara ayrılır", async () => {
  const s = renderTest(() => <ExplodedViewLab startOpen={false} />)
  await s.click(".lab-flip")
  expect(s.get(".lab-ev .lab-save")?.getAttribute("data-m-xv-id")).toBe("content")
  expect(s.get(".lab-parts .m-avatar")?.getAttribute("data-m-xv-id")).toBe("avatar")
  expect(s.get(".lab-parts .m-badge")?.getAttribute("data-m-xv-id")).toBe("Rozet")
})

// While apart, a press picks the plate under it instead of reaching the content, and onPick gets that plate's id.
test("ayrıkken bir plakaya basınca onPick seçilen id'yi verir", async () => {
  const s = renderTest(() => <ExplodedViewLab startOpen={false} />)
  await s.click(".lab-flip")
  await s.click(".lab-parts .m-avatar")
  expect(s.get(".lab-state")?.textContent).toContain("seçilen: avatar")
})
