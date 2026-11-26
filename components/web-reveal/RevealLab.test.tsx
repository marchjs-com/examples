// Tests for RevealLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <RevealLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns the first match, s.all(selector) every match, and s.click(text) clicks like a user and
//   waits until the view has updated (that is why the tests that click are async and await it).
// - The tests check markup and state classes (the tag, the label, m-reveal-item, is-revealed) rather than the animation
//   itself, which runs on the motion engine and depends on time and scrolling. The classes are listed in the
//   Reveal docs.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { RevealLab } from "./RevealLab.tsx"

// `as="section"` gives a <section>, `class` and the extra aria-label attribute reach it, and Reveal marks its root with
// m-reveal.
test("sarmalayıcı bir section: sınıfı ve adı yerinde", () => {
  const s = renderTest(() => <RevealLab />)
  const box = s.get("section.lab-reveal")
  expect(box).not.toBe(null)
  expect(box?.getAttribute("aria-label")).toBe("Açılan kartlar")
  expect(box?.classList.contains("m-reveal")).toBeTruthy()
})

// `select=".lab-card"`: the elements that match the selector are the ones that enter in turn; each gets the
// m-reveal-item class (three cards at the start).
test("seçiciye uyan kartlar sıraya girer (m-reveal-item)", () => {
  const s = renderTest(() => <RevealLab />)
  expect(s.all(".lab-card.m-reveal-item").length).toBe(3)
})

// The button adds a card, which proves the block is drawn again with the new content.
test("Kart ekle: dördüncü kart gelir", async () => {
  const s = renderTest(() => <RevealLab />)
  await s.click("Kart ekle")
  expect(s.all(".lab-card").length).toBe(4)
})

// effect="none": the content is simply there. The root has the is-revealed class and is not left waiting (is-pending), so
// nothing stays hidden.
test("efekt yok: içerik hemen görünür, bekleyen bir şey kalmaz", async () => {
  const s = renderTest(() => <RevealLab />)
  await s.click("yok")
  const box = s.get(".lab-reveal")
  expect(box?.classList.contains("is-revealed")).toBeTruthy()
  expect(box?.classList.contains("is-pending")).toBeFalsy()
})
