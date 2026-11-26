// Tests for NavMenuLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <NavMenuLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds an element by CSS selector, s.find(name) by accessible name (null when missing),
//   s.sees(text) says whether the text is visible, s.type(name, text) types into a field, and s.click(...) clicks
//   like a user and waits until the view has updated, which is why those tests are async and await it.
// - The tests check what a user or a screen reader can observe (names, aria-expanded, visible text) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { NavMenuLab } from "./NavMenuLab.tsx"

// The menu keeps pins in localStorage, so state from one test would leak into the next. Every test therefore starts
// by deleting the key (storageKey of the Lab). The try/catch is for private windows where storage can throw.
// (On a narrow screen the menu turns into a drawer; these tests are written for a wide screen.)
const fresh = () => { try { localStorage.removeItem("lab.navmenu") } catch { /* gizli pencere */ } }

// Static props reach the DOM: `label` becomes the aria-label of the <nav>, `m:color` the data-m-color attribute,
// `class` the root class, and the brand and footer slots render their content.
test("menü adı, sınıfı, rengi, üst ve alt yuvası", () => {
  fresh()
  const s = renderTest(() => <NavMenuLab />)
  expect(s.get(".lab-nav nav")?.getAttribute("aria-label")).toBe("Lab menüsü")
  expect(s.get(".lab-nav")?.getAttribute("data-m-color")).toBe("brand-purple")
  expect(s.sees("Lab Panel")).toBe(true)
  expect(s.sees("Elif · yönetici")).toBe(true)
})

// groupsCollapsed: the group header is a button whose aria-expanded tells the state; it starts "false" and a click
// flips it to "true".
test("gruplar kapalı başlar; başlığa basınca açılır", async () => {
  fresh()
  const s = renderTest(() => <NavMenuLab />)
  const group = s.get("[data-group='Yönetim']")
  expect(group?.getAttribute("aria-expanded")).toBe("false")
  await s.click(group!)
  expect(group?.getAttribute("aria-expanded")).toBe("true")
})

// icons.pin / labels.pin: the pin button is found by the name the labels function builds. Pinning makes the "Pinned"
// block (renamed here by labels.pinned) appear, and the button's name changes to the unpin text.
test("yıldız yerine kalp: sabitleyince Gözdeler bölümü gelir, düğmenin adı değişir", async () => {
  fresh()
  const s = renderTest(() => <NavMenuLab />)
  expect(s.sees("Gözdeler")).toBe(false)
  await s.click("Raporlar gözdelere")
  expect(s.sees("Gözdeler")).toBe(true)
  expect(s.find("Raporlar gözdelerden çıksın")).not.toBe(null)
})

// `can` and `hidden` take items out of the menu when they say no, and the filter box shows labels.noMatches when
// nothing matches. The test flips the state with the Lab's buttons and checks the visible text after each step.
test("can ve hidden öğeyi menüden çıkarır; süzgeç kendi boş sonuç metnini gösterir", async () => {
  fresh()
  const s = renderTest(() => <NavMenuLab />)
  expect(s.sees("Yönetici ayarları")).toBe(false)
  await s.click("Yönetici ol")
  expect(s.sees("Yönetici ayarları")).toBe(true)
  expect(s.sees("Yeni panel (beta)")).toBe(true)
  await s.click("Betayı gizle")
  expect(s.sees("Yeni panel (beta)")).toBe(false)
  await s.type("Sayfalarda ara", "zzzz")
  expect(s.sees("Hiçbir şey yok")).toBe(true)
})
