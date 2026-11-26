// Tests for HorizontalScrollLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <HorizontalScrollLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.click(textOrElement) clicks like a user and waits until the view has
//   updated, s.flush() waits for pending updates (so the tests that click are async).
// - The tests check observable things (the region's name, how many panels, which parts and classes exist, a CSS variable)
//   rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { HorizontalScrollLab } from "./HorizontalScrollLab.tsx"

// The region carries its name, our class and five panels (the children of the track).
test("bölge adını taşır, beş panel ve kendi sınıfı var", () => {
  const s = renderTest(() => <HorizontalScrollLab />)
  const region = s.get(".m-hs")
  expect(region?.getAttribute("aria-label")).toBe("5 panelli şerit")
  expect(region?.classList.contains("lab-hs")).toBeTruthy()
  expect(s.all(".m-hs-track > *").length).toBe(5)
})

// The add button draws a sixth panel, and the region's name follows the count.
test("Panel ekle: altıncı panel gelir, ad da güncellenir", async () => {
  const s = renderTest(() => <HorizontalScrollLab />)
  await s.click("Panel ekle")
  expect(s.all(".m-hs-track > *").length).toBe(6)
  expect(s.get(".m-hs")?.getAttribute("aria-label")).toBe("6 panelli şerit")
})

// progress: turning the switch off removes the progress line.
test("ilerleme çizgisi anahtarla kapanır", async () => {
  const s = renderTest(() => <HorizontalScrollLab />)
  expect(s.get(".m-hs-bar")).not.toBe(null)
  await s.click(s.all('[role="switch"]')[1]!)
  expect(s.get(".m-hs-bar")).toBe(null)
})

// pinned={false} turns the section into a native scroller (a class on the section), and the panel width is passed to the CSS as a variable.
test("sabitleme kapanınca yerel kaydırıcı olur; panel genişliği bir değişkende", async () => {
  const s = renderTest(() => <HorizontalScrollLab />)
  await s.click(s.all('[role="switch"]')[0]!)
  await s.flush()
  expect(s.get(".m-hs")?.classList.contains("is-native")).toBeTruthy()
  expect((s.get(".m-hs") as HTMLElement).style.getPropertyValue("--m-hs-panel")).toBe("22rem")
})
