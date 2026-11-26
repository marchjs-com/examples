// Tests for IconPickerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <IconPickerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(name) finds an element by its accessible name, s.get(selector) / s.all(selector) use CSS, s.text() is all visible
//   text, s.type(element, text) types into a field, s.click(...) clicks like a user and waits for the view.
// - s.wait(fn) polls until fn is true: the panel and the icon grid are drawn lazily, so tests wait for what they need.
// - The tests check observable things (names, aria-pressed, which items exist) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { IconPickerLab } from "./IconPickerLab.tsx"

// The button opens the panel; searching and choosing an icon sets the value and the button's accessible name follows it.
test("düğme paneli açar; aranıp seçilen ikon değer olur ve düğmenin adına yazılır", async () => {
  const s = renderTest(() => <IconPickerLab />)
  await s.click(s.find("Menü ikonu: plus") as Element)
  await s.wait(() => s.get(".m-ipk-panel input"))
  await s.type(s.get(".m-ipk-panel input") as Element, "trophy")
  await s.wait(() => s.get('.m-ipk-panel [aria-label="trophy"]'))
  await s.click(s.get('.m-ipk-panel [aria-label="trophy"]') as Element)
  expect(s.text().includes("Menü: trophy")).toBe(true)
  expect(s.find("Menü ikonu: trophy") !== null).toBe(true)
})

// The inline set: pageSize items are drawn, no "no icon" item and no chips; the chosen icon is pressed; searching narrows the grid.
test("satır içi seçki: pageSize kadar çizer, simge yok ve süzgeç yok; seçilen basılı durur", async () => {
  const s = renderTest(() => <IconPickerLab />)
  expect(s.all(".lab-picks .m-ipk-item").length).toBe(6)
  expect(s.get(".lab-picks .m-ipk-off")).toBe(null)
  expect(s.get(".lab-picks .m-ipk-groups")).toBe(null)
  const sun = await s.click(s.get('.lab-picks [aria-label="sun"]') as Element)
  expect(s.text().includes("Seçki: sun")).toBe(true)
  expect(sun.getAttribute("aria-pressed")).toBe("true")
  await s.type(s.get(".lab-picks input") as Element, "coffee")
  await s.wait(() => s.all(".lab-picks .m-ipk-item").length === 1)
})

// Our own chip leaves only the icons that match it (three, all starting with "user").
test("kendi süzgeç çipi yalnız eşleşen ikonları bırakır", async () => {
  const s = renderTest(() => <IconPickerLab />)
  await s.click("Kişiler")
  const names = s.all(".lab-people .m-ipk-item:not(.m-ipk-off)").map((b: Element) => b.getAttribute("aria-label") ?? "")
  expect(names.length).toBe(3)
  expect(names.every((n: string) => n.startsWith("user"))).toBe(true)
})

// A value that names a pack loads that pack and shows the icon as chosen.
test("değeri bir paketten olan seçici o paketi yükler ve ikonu seçili gösterir", async () => {
  const s = renderTest(() => <IconPickerLab />)
  await s.wait(() => s.get('.lab-packs [aria-label="crown"]'))
  expect(s.get('.lab-packs [aria-label="crown"]')?.getAttribute("aria-pressed")).toBe("true")
  expect(s.text().includes("Rozet: hadi:crown")).toBe(true)
})
