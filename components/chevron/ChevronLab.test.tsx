// Tests for ChevronLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ChevronLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element; s.find(text) finds the element that carries a text; s.click(textOrElement)
//   clicks like a user and waits until the view has updated (so those tests are async and await it).
// - The tests check observable things: the state classes (is-open, is-closed, is-auto, is-leaf, is-still), aria-hidden
//   and attributes. They do not measure the rotation itself, because the motion is shortened by reduced motion.
import { test, expect, renderTest } from "march/testing"
import { ChevronLab } from "./ChevronLab.tsx"

// Every arrow in the Lab follows one `open` state. Pressing the button flips it, so the arrow goes from the closed
// class to the open class, and the button text changes.
test("Hepsini aç'a basınca oklar kapalıdan açığa geçer", async () => {
  const s = renderTest(() => <ChevronLab />)
  expect(s.get(".lab-dir-end")?.classList.contains("is-closed")).toBe(true)
  await s.click("Hepsini aç")
  expect(s.get(".lab-dir-end")?.classList.contains("is-open")).toBe(true)
  expect(s.find("Hepsini kapat")).not.toBe(null)
})

// Without `open` the arrow reads the state of its trigger (is-auto) and stays hidden from screen readers: the trigger
// button carries aria-expanded, the arrow is only decoration. The direction prop becomes a class too.
test("open verilmeyen ok kendiliğinden (is-auto) ve süs olarak gizli", () => {
  const s = renderTest(() => <ChevronLab />)
  const auto = s.get(".lab-auto")
  expect(auto?.classList.contains("is-auto")).toBe(true)
  expect(auto?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-dir-up")?.classList.contains("m-chevron-up")).toBe(true)
})

// motion={false} makes the arrow jump (class is-still); a text `icon` replaces the drawn arrow; an SVG icon is drawn
// for the icon prop; m:color is exposed as data-m-color.
test("motion={false} sıçrar; kendi ikonu ve metin işareti çizilir", () => {
  const s = renderTest(() => <ChevronLab />)
  expect(s.get(".lab-still")?.classList.contains("is-still")).toBe(true)
  expect(s.get(".lab-text")?.textContent).toBe("›")
  expect(s.get(".lab-own svg")).not.toBe(null)
  expect(s.get(".lab-own")?.getAttribute("data-m-color")).toBe("primary")
})

// `leaf` keeps the box (so tree rows line up) but draws no arrow; other attributes such as data-* land on the root.
test("Yaprak yap: kutu kalır, ok çizilmez; data-* öznitelik oktadır", async () => {
  const s = renderTest(() => <ChevronLab />)
  expect(s.get(".lab-leaf")?.getAttribute("data-node")).toBe("kok")
  await s.click("Yaprak yap")
  expect(s.get(".lab-leaf")?.classList.contains("is-leaf")).toBe(true)
  expect(s.get(".lab-leaf svg")).toBe(null)
})
