// Tests for ChipLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ChipLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds the element carrying a text or an accessible name; s.get(selector) finds one element;
//   s.sees(text) says whether a text is visible; s.click(textOrElement) clicks like a user, waits until the view
//   has updated and returns the clicked element (so those tests are async and await it).
// - The tests check what a user or a screen reader can observe (aria-pressed, the accessible name of the remove
//   button, visible text) plus the documented state classes, not internal state.
import { test, expect, renderTest } from "march/testing"
import { ChipLab } from "./ChipLab.tsx"

// tone and size become classes of the chip (m-chip2-danger, m-chip2-sm), and `class` is added to the chip itself.
test("tone ve size sınıf olur; class çipe eklenir", () => {
  const s = renderTest(() => <ChipLab />)
  expect(s.find("danger")?.closest(".m-chip2")?.className.includes("m-chip2-danger")).toBe(true)
  expect(s.find("Küçük")?.closest(".m-chip2")?.className.includes("m-chip2-sm")).toBe(true)
  expect(s.get(".lab-new")?.className.includes("m-chip2")).toBe(true)
})

// `selected` together with `onClick` makes the chip a toggle button: aria-pressed reflects the state, which is what a
// screen reader announces. Pressing an unselected chip selects it; pressing the preselected one clears it.
test("selected + onClick bir aç / kapa düğmesidir (aria-pressed)", async () => {
  const s = renderTest(() => <ChipLab />)
  const liked = await s.click("Beğenilen")
  expect(liked.getAttribute("aria-pressed")).toBe("true")
  expect(liked.closest(".m-chip2")?.className.includes("is-selected")).toBe(true)
  const starred = await s.click("Yıldızlı")
  expect(starred.getAttribute("aria-pressed")).toBe("false")
})

// onRemove adds a real remove button whose accessible name comes from removeLabel; pressing it removes the tag, and
// the other tags keep their own buttons.
test("onRemove kaldırma düğmesini ekler; removeLabel onun adıdır", async () => {
  const s = renderTest(() => <ChipLab />)
  expect(s.sees("Ürün")).toBe(true)
  await s.click("Ürün etiketini sil")
  expect(s.sees("Ürün")).toBe(false)
  expect(s.find("Tasarım etiketini sil")?.tagName).toBe("BUTTON")
})

// A chip with only onClick (no `selected`) is a plain button; clicking it runs the handler (the label shows the count).
test("selected olmadan onClick de düğme yapar ve çağrılır", async () => {
  const s = renderTest(() => <ChipLab />)
  await s.click("Tıklandı: 0")
  expect(s.sees("Tıklandı: 1")).toBe(true)
})
