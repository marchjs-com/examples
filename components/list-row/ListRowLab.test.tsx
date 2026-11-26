// Tests for ListRowLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ListRowLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector and s.all("selector") finds every match. s.click(element)
//   clicks like a user and waits until the view has updated, which is why the tests that click are async and await it.
//   s.flush() waits one more update, used here because some rows finish drawing after the first render.
// - The tests check what a user or a screen reader can observe (the element type, aria-current, aria-pressed,
//   aria-selected, disabled, visible text) rather than internal state, so they keep passing when the component's
//   internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { ListRowLab } from "./ListRowLab.tsx"

// `href` makes the row a real link; `active` gives it aria-current="page"; `tooltip` becomes the title attribute.
test("href bağlantı yapar; active aria-current verir; tooltip title olur", async () => {
  const s = renderTest(() => <ListRowLab />)
  await s.flush()
  const a = s.get(".lab-link")!
  expect(a.tagName).toBe("A")
  expect(a.getAttribute("aria-current")).toBe("page")
  expect(a.getAttribute("title")).toBe("Ana sayfaya git")
})

// `onClick` makes the row a real button. After one click the live title shows the count and `selected` (a function of
// the count) turns aria-pressed on. We keep the same element `b`, which shows the row is updated, not replaced.
test("onClick düğme yapar; basınca başlık ve selected (aria-pressed) değişir", async () => {
  const s = renderTest(() => <ListRowLab />)
  const b = s.get(".lab-btn")!
  expect(b.tagName).toBe("BUTTON")
  await s.click(b)
  expect(b.textContent).toContain("Düğme satırı (1)")
  expect(b.getAttribute("aria-pressed")).toBe("true")
})

// A disabled button row has the disabled attribute, so it cannot be pressed.
test("disabled satır basılamaz", async () => {
  const s = renderTest(() => <ListRowLab />)
  const off = s.all("button").find((x: Element) => x.textContent!.includes("Kullanılamaz")) as HTMLButtonElement
  expect(off.disabled).toBe(true)
})

// Rows with as="li" and role="option" are list items; clicking the second one moves aria-selected to it. And
// titleAs="h3" makes the tile row's title a real heading inside its <article>.
test("as=li seçenekler; tıklayınca aria-selected değişir; titleAs=h3", async () => {
  const s = renderTest(() => <ListRowLab />)
  const opts = s.all("[role=option]")
  expect(opts[0].tagName).toBe("LI")
  await s.click(opts[1])
  expect(opts[1].getAttribute("aria-selected")).toBe("true")
  expect(s.get("article h3")!.textContent).toBe("Karo")
})
