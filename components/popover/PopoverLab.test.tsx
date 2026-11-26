// Tests for PopoverLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PopoverLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The panel is portaled out of the component's root; s.sees and s.get search the whole page, so they find it.
//   Popover opens and closes through the motion engine, hence `s.flush(2)` after a click before looking at the page.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { PopoverLab } from "./PopoverLab.tsx"

// Pressing the trigger opens the panel: onOpenChange reports "opened" (the Lab writes the reason into .lab-why) and
// the panel's footer (`footer={<span>Alt bilgi</span>}`) is visible. Checks the controlled open / setOpen pair too.
test("tetikleyiciye basınca panel açılır ve nedeni yazılır", async () => {
  const s = renderTest(() => <PopoverLab />)
  await s.click("Ayrıntı")
  await s.flush(2)
  expect(s.get(".lab-why")?.textContent).toContain("açıldı")
  expect(s.sees("Alt bilgi")).toBe(true)
})

// The function child gets `close`: pressing its button closes the panel, and onOpenChange reports "closed".
test("işlev çocuğun close'u paneli kapatır", async () => {
  const s = renderTest(() => <PopoverLab />)
  await s.click("Ayrıntı")
  await s.flush(2)
  await s.click("Tamam")
  await s.flush(2)
  expect(s.get(".lab-why")?.textContent).toContain("kapandı")
})

// The second Popover forwards `id`, `flush` and `panelProps` to the panel element: its id, a data attribute from
// panelProps and the is-flush class are all visible on the panel. It is closed again at the end to leave a clean page.
test("id, flush ve panelProps panele geçer", async () => {
  const s = renderTest(() => <PopoverLab />)
  await s.click("Değiştir")
  await s.flush(2)
  const p = document.getElementById("lab-cities")
  expect(p).not.toBe(null)
  expect(p?.getAttribute("data-lab")).toBe("şehir")
  expect(p?.className).toContain("is-flush")
  await s.click("Değiştir")
  await s.flush(2)
})

// Picking a city runs the child's click handler, which sets the Lab's field text and calls `close`; afterwards the
// other cities are no longer on the page, proving the panel really closed.
test("şehir seçilince alan değişir, panel kapanır", async () => {
  const s = renderTest(() => <PopoverLab />)
  await s.click("Değiştir")
  await s.flush(2)
  await s.click("Ankara")
  await s.flush(2)
  expect(s.get(".lab-field")?.textContent).toBe("Şehir: Ankara")
  expect(s.sees("Antalya")).toBe(false)
})
