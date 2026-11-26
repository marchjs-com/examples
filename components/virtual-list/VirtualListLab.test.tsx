// Tests for VirtualListLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <VirtualListLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns the first match, s.all(selector) every match, s.sees(text) asks if a text is visible,
//   s.click(text) clicks like a user and waits until the view has updated, and s.flush() just waits for the view to
//   update (so those tests are async and await it).
// - The tests check observable things (role, id, class, visible text, how many rows exist) rather than internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { VirtualListLab } from "./VirtualListLab.tsx"

// The id, class and role props land on the rows' container (role="list").
test("liste adını, kimliğini ve rolünü alır", () => {
  const s = renderTest(() => <VirtualListLab />)
  const list = s.get("#lab-vlist")
  expect(list?.getAttribute("role")).toBe("list")
  expect(s.get(".lab-vlist")).not.toBe(null)
})

// header and footer are drawn inside the scroll area, before the first and after the last row; the test checks that
// both texts are in the page.
test("başlık ve son satırı çizer", () => {
  const s = renderTest(() => <VirtualListLab />)
  expect(s.sees("Başlık: 1 000 satır")).toBe(true)
  expect(s.sees("Liste sonu")).toBe(true)
})

// The point of virtualisation: out of 1,000 rows only the ones near the viewport are in the page.
test("1 000 satırın hepsi DOM'a girmez", async () => {
  const s = renderTest(() => <VirtualListLab />)
  await s.flush()
  expect(s.all("[role=listitem]").length < 1000).toBe(true)
})

// The gap button changes a signal that the list reads (the button text shows its value).
test("ara düğmesi değeri değiştirir", async () => {
  const s = renderTest(() => <VirtualListLab />)
  await s.click("Ara: 0")
  expect(s.sees("Ara: 8")).toBe(true)
})
