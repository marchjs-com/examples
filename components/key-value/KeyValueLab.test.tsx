// Tests for KeyValueLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <KeyValueLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds an element by CSS selector; s.sees("text") answers whether the text is visible anywhere
//   in the mounted view; s.click("text") clicks a button by its text and waits until the view has updated, which is
//   why the test that clicks is async and awaits it.
// - The tests check what a user or a screen reader can observe (the element type, a class, visible text) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text. KeyValue's classes (m-kv-cols-N, m-kv-row,
// m-kv-label, m-kv-value, m-kv-hint) are listed in the KeyValue docs.
import { test, expect, renderTest } from "march/testing"
import { KeyValueLab } from "./KeyValueLab.tsx"

// KeyValue is a real <dl>; `columns` becomes a class (here 2 columns); and a row whose `hidden` is true is not drawn,
// so the secret value is not in the page at start.
test("bir dl; columns sınıfı yazılır, gizli satır görünmez", () => {
  const s = renderTest(() => <KeyValueLab />)
  const kv = s.get(".lab-kv")!
  expect(kv.tagName).toBe("DL")
  expect(kv.classList.contains("m-kv-cols-2")).toBe(true)
  expect(s.sees("abc-123")).toBe(false)
})

// An empty value (null) shows the `empty` text, while the number 0 is a real value and is shown as it is.
test("null değer empty metnini, 0 kendisini gösterir", () => {
  const s = renderTest(() => <KeyValueLab />)
  expect(s.get(".lab-kv")!.textContent).toContain("(boş)")
  expect(s.get(".lab-kv")!.textContent).toContain("0")
})

// `hidden` is a function reading a signal, so the toggle button makes the row appear.
test("gizli satır düğmeyle açılır", async () => {
  const s = renderTest(() => <KeyValueLab />)
  await s.click("Gizli satırı aç / kapa")
  expect(s.sees("abc-123")).toBe(true)
})

// Giving an object instead of an array turns its keys into labels.
test("nesne verince anahtarlar etiket olur", () => {
  const s = renderTest(() => <KeyValueLab />)
  expect(s.sees("Çerçeve")).toBe(true)
  expect(s.sees("March")).toBe(true)
})
