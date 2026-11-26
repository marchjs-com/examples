// Tests for LayoutLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LayoutLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.sees("text") says whether text is visible in the mounted view; s.get("selector") finds an element by CSS selector.
// - These tests need no clicks, so none of them is async. The corner badge is looked up with document.querySelector
//   (the whole page) instead of s.get, because corner content is added to the page's corner group.
// - The tests check what a user or a screen reader can observe (text, ids, classes) rather than internal state, so
//   they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text. Layout's part classes (.m-skip,
// .m-layout-main…) are listed in the Layout docs.
import { test, expect, renderTest } from "march/testing"
import { LayoutLab } from "./LayoutLab.tsx"

// Every region the Lab fills (top, header, nav, aside, footer) and the content are drawn.
test("bütün bölgeler çizilir", () => {
  const s = renderTest(() => <LayoutLab />)
  for (const t of ["Duyuru", "Üst bilgi", "Gezinme", "Yan alan", "Alt bilgi", "Ana içerik"]) expect(s.sees(t)).toBe(true)
})

// `mainId` becomes the id of the main element, which is where the skip link jumps to.
test("ana bölgenin kimliği mainId", () => {
  const s = renderTest(() => <LayoutLab />)
  expect(s.get("#lab-main")).not.toBe(null)
})

// `class` is added to the frame itself.
test("class köke eklenir", () => {
  const s = renderTest(() => <LayoutLab />)
  expect(s.get(".lab-layout")).not.toBe(null)
})

// Three things at once: useLayout() inside the layout returns its titleTemplate; the skip link shows the text given in
// `labels`; and corner content is added to the page (the corner lives in the document, so we look there).
test("titleTemplate useLayout ile okunur, skipLink etiketiyle çizilir, köşe içeriği eklenir", () => {
  const s = renderTest(() => <LayoutLab />)
  expect(s.get(".lab-template")?.textContent).toBe("Başlık kalıbı: %s · Laboratuvar")
  expect(s.get(".lab-layout .m-skip")?.textContent).toBe("İçeriğe atla")
  expect(document.querySelector(".lab-corner")?.textContent).toBe("Taslak")
})
