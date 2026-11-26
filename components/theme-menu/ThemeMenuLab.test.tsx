// Tests for ThemeMenuLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ThemeMenuLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - A ThemeMenu's panel is drawn when its button is pressed, and into the page body rather than next to the button, so the
//   tests press the button with s.click(selector) (it waits until the view has updated, so those tests are async) and look
//   for the panel by its class: the `last` helper takes the last .m-theme-menu in the page, which is the one just opened.
// - s.get / s.all find elements by CSS selector, s.sees(text) says whether a text is on the page, s.flush() lets pending
//   ticks run.
// - The tests check what a user can observe (which sections and headings exist, which radios are checked) and that the
//   page's own theme attribute is left alone by a menu that has its own `value`.
// To adapt them: copy one test, change the class of the button or the expected text. The .lab-* classes come from ThemeMenuLab.
import { test, expect, renderTest } from "march/testing"
import { ThemeMenuLab } from "./ThemeMenuLab.tsx"

// The newest open panel: the last .m-theme-menu element in the page.
const last = (s: ReturnType<typeof renderTest>) => s.all(".m-theme-menu").pop()

// The page menu shows our own heading texts (labels) and, as `accents` has three tokens, three accent choices (radios).
test("sayfa menüsü: kendi başlık metinleri ve üç vurgu rengi", async () => {
  const s = renderTest(() => <ThemeMenuLab />)
  await s.click(".lab-page-menu")
  const p = last(s)
  expect(p?.querySelectorAll(".m-theme-menu-heading").length).toBe(2)
  expect(p?.textContent).toContain("Renk teması")
  expect(p?.textContent).toContain("Vurgu rengi")
  expect(p?.querySelectorAll(".m-accent-list [role=radio]").length).toBe(3)
})

// With themes, modes and headings off and no icon, the panel has only the accent list, and the button has no svg icon.
test("yalnız vurgu menüsü: tema listesi, kipler ve başlıklar yok; düğmede ikon yok", async () => {
  const s = renderTest(() => <ThemeMenuLab />)
  expect(s.get(".lab-accent-menu svg")).toBe(null)
  await s.click(".lab-accent-menu")
  const p = last(s)
  expect(p?.querySelector(".m-theme-list")).toBe(null)
  expect(p?.querySelector(".m-theme-modes")).toBe(null)
  expect(p?.querySelector(".m-accent-list")).toBeTruthy()
})

// The preview menu has `value` and `page`, so it draws theme preview cards, and the first card (the page's own theme) is
// checked. Choosing another card changes only the preview's theme: the page's data-m-theme attribute stays what it was.
test("önizleme menüsü: kartlar, ilk kart sayfanın teması; seçim yalnız önizlemeyi boyar", async () => {
  const s = renderTest(() => <ThemeMenuLab />)
  await s.click(".m-theme-menu-btn")
  const p = s.get(".lab-preview-panel")
  expect(p?.classList.contains("m-theme-menu-cards")).toBe(true)
  const cards = Array.from(p?.querySelectorAll(".m-theme-cards [role=radio]") ?? [])
  expect(cards[0]?.getAttribute("aria-checked")).toBe("true")
  const page = document.documentElement.getAttribute("data-m-theme")
  ;(cards[2] as HTMLElement).click()
  await s.flush()
  expect(s.sees("Önizleme: sayfanın teması")).toBe(false)
  expect(document.documentElement.getAttribute("data-m-theme")).toBe(page)
})
