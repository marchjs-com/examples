// Tests for LiveStatusLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LiveStatusLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector; s.find("text") finds an element by its visible text;
//   s.click("text") clicks a button and waits until the view has updated, which is why the tests that click are async and
//   await it.
// - The tests check what a screen reader can observe (role, aria-live, the text, the hidden-but-read class) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. The visually hidden class is m-sr-only.
import { test, expect, renderTest } from "march/testing"
import { LiveStatusLab } from "./LiveStatusLab.tsx"

// The status is role="status" with aria-live="polite" (the default), and class and data-* reach the status element.
test("durum satırı role=status, kibar; class ve öznitelikler köke gider", () => {
  const s = renderTest(() => <LiveStatusLab />)
  const st = s.get(".lab-count")
  expect(st?.getAttribute("role")).toBe("status")
  expect(st?.getAttribute("aria-live")).toBe("polite")
  expect(st?.getAttribute("data-kind")).toBe("sayaç")
})

// `text` is a function: pressing the button twice writes the new count into the same status element.
test("text erişimcisi düğmeyle güncellenir", async () => {
  const s = renderTest(() => <LiveStatusLab />)
  await s.click("Bir tane ekle")
  await s.click("Bir tane ekle")
  expect(s.get(".lab-count")?.textContent).toBe("2 öğe eklendi")
})

// visible={false} adds the visually-hidden class (m-sr-only), and `as` picks the element (a paragraph). The status given
// as children with politeness="assertive" has aria-live="assertive".
test("visible={false} görsel olarak gizler, as öğeyi seçer", () => {
  const s = renderTest(() => <LiveStatusLab />)
  const hidden = s.get(".lab-hidden")
  expect(hidden?.tagName).toBe("P")
  expect(hidden?.classList.contains("m-sr-only")).toBe(true)
  expect(s.find("Children ile söylenen, araya giren durum")?.getAttribute("aria-live")).toBe("assertive")
})

// The help line gets the id from `helpId` and the class from `helpClass`, and it comes directly before the status in the
// DOM (the next element is the status with its text).
test("help satırı helpId ve helpClass ile durumdan önce gelir", () => {
  const s = renderTest(() => <LiveStatusLab />)
  const help = s.get("#lab-help")
  expect(help?.classList.contains("lab-help")).toBe(true)
  expect(help?.nextElementSibling?.textContent).toBe("Yardım satırı önce gelir")
})
