// Tests for OverflowToolbarLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <OverflowToolbarLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements by CSS selector, s.find(name) by accessible name, s.sees(text) says
//   whether text is visible, s.click(name) clicks like a user (and returns the element) after the view has updated, and
//   s.wait(fn) waits until fn() is true. Whatever awaits is why those tests are async.
// - The tests check what a user or a screen reader can observe (role, aria-label, aria-pressed, disabled, hidden)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected value. The part class names (.m-otb-end, .m-otb-more,
// .m-otb-item) are listed in the OverflowToolbar docs.
import { test, expect, renderTest } from "march/testing"
import { OverflowToolbarLab } from "./OverflowToolbarLab.tsx"

// The root is a role="toolbar" with the accessible name from `label`; the class and the m:color token are on the root,
// and the `end` content is rendered in its own part.
test("araç çubuğu: adı, sınıfı ve rengi kökte; sonda hiç taşmayan içerik", () => {
  const s = renderTest(() => <OverflowToolbarLab />)
  const bar = s.get(".lab-otb")
  expect(bar?.getAttribute("role")).toBe("toolbar")
  expect(bar?.getAttribute("aria-label")).toBe("Yazı araçları")
  expect(bar?.getAttribute("data-m-color")).toBe("brand-purple")
  expect(s.get(".lab-otb .m-otb-end")?.textContent).toBe("Taslak")
})

// onSelect runs on every click (the counter in the `end` slot reaches 2). A toggle item (`pressed`) exposes its state with
// aria-pressed after a click.
test("Kaydet onSelect'i çalıştırır; Kalın aç / kapa düğmesidir", async () => {
  const s = renderTest(() => <OverflowToolbarLab />)
  await s.click("Kaydet")
  await s.click("Kaydet")
  expect(s.sees("2 kez kaydedildi")).toBe(true)
  const bold = await s.click("Kalın")
  expect(bold.getAttribute("aria-pressed")).toBe("true")
})

// `disabled: true` reaches the button, and `danger: true` gives it the danger class.
test("disabled öğe basılamaz; danger öğe tehlike tonunda", () => {
  const s = renderTest(() => <OverflowToolbarLab />)
  // find gives the innermost match (the button's label); its button is the one to look at
  expect(s.find("Yinele")?.closest("button")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Sil")?.closest("button")?.classList.contains("is-danger")).toBe(true)
})

// The narrow toolbar cannot fit its five items, so the "More" button appears (its name comes from moreLabel) and some
// items are hidden. The measuring happens after layout, hence the wait.
test("dar çubukta sığmayanlar kendi adlı Daha fazla menüsüne geçer", async () => {
  const s = renderTest(() => <OverflowToolbarLab />)
  await s.wait(() => !s.get(".lab-narrow .m-otb-more")?.hasAttribute("hidden"))
  const more = s.get(".lab-narrow .m-otb-more button")
  expect(more?.getAttribute("aria-label")).toBe("Diğer araçlar")
  expect(s.all(".lab-narrow .m-otb-item[hidden]").length).toBeGreaterThan(0)
})
