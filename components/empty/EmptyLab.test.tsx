// Tests for EmptyLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <EmptyLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it; s.click(target) clicks like a user (a visible text, a selector or an element) and waits for
//   the view to update, so tests that click are async.
// - s.flush() lets pending updates run before the check.
// - The tests check what a user or a screen reader can see (roles, attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { EmptyLab } from "./EmptyLab.tsx"

// Without `title` an Empty writes its default title ("Nothing here yet", translated), so the four Empty blocks that
// have a title show four of them; title={false} leaves the title out, and the text beside it stays.
test("title verilmezse varsayılan başlık, title={false} başlığı kaldırır", () => {
  const s = renderTest(() => <EmptyLab />)
  const titles = s.all(".m-empty-title").map((e: Element) => e.textContent)
  expect(titles.length).toBe(4)
  expect(s.find("Başlıksız; ikon kendi düğümüm.")?.closest(".m-empty")?.querySelector(".m-empty-title")).toBe(null)
})

// An object made with action(label, run) is drawn as a button. Pressing it runs the handler, and the Lab's `title`
// getter shows the new count.
test("action() nesnesi düğme olur; basınca başlık erişimcisi güncellenir", async () => {
  const s = renderTest(() => <EmptyLab />)
  await s.click("Davet et")
  await s.flush()
  expect(s.sees("Davet edilen: 1")).toBe(true)
})

// size="sm" puts a compact class on the root, `class` is added to it too, and an icon given as your own node is
// drawn as it is.
test("size=sm ve class köke eklenir; kendi düğüm olduğu gibi çizilir", () => {
  const s = renderTest(() => <EmptyLab />)
  const e = s.get(".lab-empty")
  expect(e?.classList.contains("m-empty-sm")).toBe(true)
  expect(s.get(".lab-art")?.textContent).toBe("🌵")
})
