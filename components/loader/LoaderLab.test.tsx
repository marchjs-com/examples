// Tests for LoaderLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LoaderLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector; s.click("text") clicks a button by its text and waits until the
//   view has updated, which is why the tests that click are async and await it. s.flush() waits one more update, used
//   in the test where the spinner is drawn a moment after the first render.
// - The tests check what a screen reader or a user can observe (role, text, the visually hidden label, whether a ring
//   exists) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text. The parts (m-loader-text, m-loading, m-sr-only,
// m-loader-overlay) are listed in the Loader docs.
import { test, expect, renderTest } from "march/testing"
import { LoaderLab } from "./LoaderLab.tsx"

// A loader is role="status" and the visible `text` is drawn in its text part.
test("yükleyici role=status, metin görünür", () => {
  const s = renderTest(() => <LoaderLab />)
  const l = s.get(".lab-text")
  expect(l?.getAttribute("role")).toBe("status")
  expect(l?.querySelector(".m-loader-text")?.textContent).toBe("Panolar hazırlanıyor…")
})

// Without `text`, the `label` is in a visually hidden element (so only screen readers get it). fade={false} gives the
// loader the is-still class: it shows at once instead of fading in.
test("text yoksa label yalnız ekran okuyucuya; fade={false} hemen görünür", () => {
  const s = renderTest(() => <LoaderLab />)
  const l = s.get(".lab-label")
  expect(l?.querySelector(".m-sr-only")?.textContent).toBe("Kullanıcılar açılıyor")
  expect(l?.classList.contains("is-still")).toBe(true)
})

// spinner={false} leaves the ring (.m-loading) out while the default loader has it; `overlay` gives the loader the
// scrim class.
test("spinner={false} halkayı kaldırır, overlay perde olur", async () => {
  const s = renderTest(() => <LoaderLab />)
  await s.flush()
  expect(s.get(".lab-bare")?.querySelector(".m-loading")).toBe(null)
  expect(s.get(".lab-text")?.querySelector(".m-loading")).not.toBe(null)
  expect(s.get(".lab-overlay")?.classList.contains("m-loader-overlay")).toBe(true)
})

// `text` as a function follows its signal: one click on the button moves the percentage from 30 to 40.
test("text erişimcisi düğmeyle güncellenir", async () => {
  const s = renderTest(() => <LoaderLab />)
  await s.click("İlerlet")
  expect(s.get(".lab-pct .m-loader-text")?.textContent).toBe("%40 tamam")
})
