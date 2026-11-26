// Tests for CheckMarkLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CheckMarkLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements inside it; s.sees(text) says whether a text is visible;
//   s.click(elementOrText) clicks like a user and waits until the view has updated (so the test that clicks is
//   async and awaits it).
// - The tests check what a user or a screen reader can observe (visible text, aria-hidden, the state classes
//   is-yes / is-no) rather than internal state. Class names of the parts are listed in the CheckMark docs.
import { test, expect, renderTest } from "march/testing"
import { CheckMarkLab } from "./CheckMarkLab.tsx"

// `text` shows the text beside the mark; `labels` replaces the default Yes / No / Partly wording; `label` sets the text
// of one mark; other attributes (data-row) go to the root element.
test("text ile metin görünür; varsayılanlar Yes / No / Partly ya da labels", () => {
  const s = renderTest(() => <CheckMarkLab />)
  expect(s.sees("Dahil")).toBe(true)
  expect(s.get(".lab-paid .m-checkmark-text")?.textContent).toBe("Ödendi")
  expect(s.get(".lab-paid")?.getAttribute("data-row")).toBe("7")
})

// label={false} makes the mark decorative: the whole element is aria-hidden, while its state class (is-no) still
// shows the value to sighted users.
test("label={false} işareti süs yapar (aria-hidden)", () => {
  const s = renderTest(() => <CheckMarkLab />)
  expect(s.get(".lab-decor")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-decor")?.classList.contains("is-no")).toBe(true)
})

// variant and size turn into classes on the root: at least one solid mark exists, and exactly one mark is large.
test("variant ve size sınıfları", () => {
  const s = renderTest(() => <CheckMarkLab />)
  expect(s.all(".m-checkmark-solid").length).toBeGreaterThan(0)
  expect(s.all(".m-checkmark-lg").length).toBe(1)
})

// The motion row starts "off" (is-no). Pressing the button changes the value of all of them to true; we check the
// state classes, not the animation itself, because the motion may be shortened by reduced motion.
test("düğmeye basınca değerler hayır'dan evet'e döner", async () => {
  const s = renderTest(() => <CheckMarkLab />)
  expect(s.all(".m-checkmark-moves.is-no").length).toBeGreaterThan(0)
  await s.click("Hepsini aç")
  expect(s.all(".m-checkmark-moves.is-no").length).toBe(0)
  expect(s.sees("Hepsini kapat")).toBe(true)
})
