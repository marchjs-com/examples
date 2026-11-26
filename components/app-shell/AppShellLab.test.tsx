// Tests for AppShellLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <AppShellLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.sees(text) says whether text is visible; s.get(selector) returns one element or null.
// - Nothing here is clicked, so the tests are synchronous. They check what a user or a screen reader can observe
//   (the regions' text, the skip link and its target) rather than internal state.
// To adapt them: copy one test, change the text or selector.
import { test, expect, renderTest } from "march/testing"
import { AppShellLab } from "./AppShellLab.tsx"

// Every region passed to AppShell (top, header, nav, aside, footer) and the main content is rendered.
test("bölgeler ve içerik çizilir", () => {
  const s = renderTest(() => <AppShellLab />)
  for (const t of ["Duyuru", "Üst bilgi", "Gezinme", "Yan alan", "Alt bilgi", "Sayfa"]) expect(s.sees(t)).toBe(true)
})

// The skip link (its text comes from labels.skip) points at the main region's id (`mainId`), and that element exists:
// keyboard and screen-reader users can jump straight to the content.
test("İçeriğe geç bağlantısı ana alana gider", () => {
  const s = renderTest(() => <AppShellLab />)
  expect(s.get("#lab-shell-main")).not.toBe(null)
  expect(s.get("a[href='#lab-shell-main']")).not.toBe(null)
})
