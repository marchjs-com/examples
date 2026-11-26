// Tests for SearchBoxLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SearchBoxLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(label, text) finds the input by its label (the aria-label / placeholder / name), types like a user and
//   returns the input element. s.click("text") clicks the control with that name. Both wait until the view has
//   updated, which is why the tests are async and await them.
// - s.text() is all visible text, s.find("name") finds an element by its text or aria-label, s.get(selector) by CSS.
// - s.wait(() => condition, { timeout }) polls until a condition holds; it is needed for the debounced onSearch, which
//   fires only after the delay.
// - The tests check what a user or a screen reader can observe (the text the Lab prints, ARIA attributes, whether a
//   button exists) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the label, the typed text or the expected line.
import { test, expect, renderTest } from "march/testing"
import { SearchBoxLab } from "./SearchBoxLab.tsx"

// A keyboard helper: dispatches a keydown on the element (it bubbles and can be cancelled, like a real key press), then
// waits one tick so the handlers and the redraw have run. The tests use it for Enter, Escape and the arrow keys.
const key = async (el: Element, k: string) => {
  el.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }))
  await new Promise((r) => setTimeout(r, 0))
}

// Three callbacks with three timings: onInput fires for every keystroke (checked right after typing), onSearch only
// after the debounce delay (so we wait for it), onEnter at once on Enter. The same test checks that inputRef received
// the input element and that inputClass reached it.
test("onInput her tuşta, onSearch gecikmeden sonra, onEnter hemen", async () => {
  const s = renderTest(() => <SearchBoxLab />)
  const box = await s.type("Ürün ara", "kalem")
  expect(s.text().includes("Yazılan: kalem")).toBe(true)
  await s.wait(() => s.text().includes("aranan: kalem"), { timeout: 3000 })
  await key(box, "Enter")
  expect(s.text().includes("Enter: kalem")).toBe(true)
  expect(s.text().includes("ref: INPUT")).toBe(true)
  expect(box.classList.contains("lab-search-input")).toBe(true)
})

// Combobox mode: the input exposes role, aria-controls and aria-expanded; the arrow keys (handled by the Lab through
// onKeyDown) move the highlighted option, which aria-activedescendant names; Enter picks it. The second ArrowDown lands
// on the second fruit (index 1) because the first press moves from -1 to 0.
test("combobox: aria bağları, ok tuşu vurgular, Enter seçer", async () => {
  const s = renderTest(() => <SearchBoxLab />)
  const box = s.find("Meyve seç")!
  expect(box.getAttribute("role")).toBe("combobox")
  expect(box.getAttribute("aria-controls")).toBe("lab-fruits")
  expect(box.getAttribute("aria-expanded")).toBe("true")
  await key(box, "ArrowDown")
  await key(box, "ArrowDown")
  expect(box.getAttribute("aria-activedescendant")).toBe("lab-fruit-1")
  await key(box, "Enter")
  expect(s.text().includes("Seçilen: armut")).toBe(true)
})

// The third box gives its own clear button a name (clearLabel). It does not exist while the box is empty; after typing
// it does, and pressing it empties the box again.
test("yazınca kendi temizle düğmesi çıkar, basınca kutu boşalır", async () => {
  const s = renderTest(() => <SearchBoxLab />)
  expect(s.find("Süzgeci temizle")).toBe(null)
  await s.type("Sipariş süz", "kargoda")
  expect(s.text().includes("Süzgeç: kargoda")).toBe(true)
  await s.click("Süzgeci temizle")
  expect(s.text().includes("Süzgeç: boş")).toBe(true)
})

// Escape clears a filled box. The disabled box carries the disabled attribute, and the wrapper of the first box is a
// "search" landmark (role="search"), which helps screen-reader users jump to it.
test("Escape temizler; devre dışı kutu kilitli", async () => {
  const s = renderTest(() => <SearchBoxLab />)
  const box = await s.type("Sipariş süz", "iade")
  await key(box, "Escape")
  expect(s.text().includes("Süzgeç: boş")).toBe(true)
  expect(s.find("Kapalı arama")?.hasAttribute("disabled")).toBe(true)
  expect(s.get(".lab-search")?.getAttribute("role")).toBe("search")
})
