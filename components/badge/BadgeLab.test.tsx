// Tests for BadgeLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <BadgeLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.find(text) finds one by its visible text, s.sees(text) says
//   whether text is on screen, and s.click(el or text) clicks like a user and waits until the view has updated (that
//   is why those tests are async and await it).
// - The tests check what a user or a screen reader can observe (visible text, aria-label, aria-pressed, the element's
//   tag, disabled) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the text or selector. The count badge class is .m-badge-count.
import { test, expect, renderTest } from "march/testing"
import { BadgeLab } from "./BadgeLab.tsx"

// A count badge with count 0 is not drawn at all; after one press of "+1 ekle" it appears, and `label` is appended to
// the number to form its accessible text.
test("sayı 0'da gizli; basınca görünür ve okunan adı label'la yazılır", async () => {
  const s = renderTest(() => <BadgeLab />)
  expect(s.get(".lab-count")).toBe(null)
  await s.click("+1 ekle")
  expect(s.get(".lab-count")!.getAttribute("aria-label")).toBe("1 yeni")
})

// A count above `max` is capped ("99+" by default, "9+" with max={9}); `format` writes its own text; `showZero` keeps
// a badge with count 0 visible.
test("max aşılınca N+, format kendi metnini yazar, showZero 0'ı gösterir", () => {
  const s = renderTest(() => <BadgeLab />)
  expect(s.sees("99+")).toBe(true)
  expect(s.sees("9+")).toBe(true)
  expect(s.sees("5 yeni")).toBe(true)
  expect(s.all(".m-badge-count").some((b: Element) => b.textContent === "0")).toBe(true)
})

// With `pressed` and onClick the badge is a real <button> that toggles aria-pressed; `ariaLabel` is its accessible
// name (we find it by that name), and a click flips the state.
test("pressed rozeti aç / kapa düğmesidir; ariaLabel adı verir", async () => {
  const s = renderTest(() => <BadgeLab />)
  const v2 = s.find("Sürüm iki filtresi")!
  expect(v2.tagName).toBe("BUTTON")
  expect(v2.getAttribute("aria-pressed")).toBe("false")
  await s.click(v2)
  expect(v2.getAttribute("aria-pressed")).toBe("true")
})

// A clickable badge with `disabled` renders a disabled button, so it cannot be pressed.
test("disabled rozet basılamaz", () => {
  const s = renderTest(() => <BadgeLab />)
  expect((s.find("kapalı") as HTMLButtonElement).disabled).toBe(true)
})
