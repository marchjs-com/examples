// Tests for OverlayScopeLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <OverlayScopeLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds an element by CSS selector, s.click(name) clicks the button with that accessible name like a
//   user and waits until the view has updated, and s.flush(n) waits n more update rounds (the drawer is created by code
//   after the click, so it needs an extra round). Anything that awaits is why those tests are async.
// - The tests check observable results (classes on the box, text inside the box) rather than internal state.
// To adapt them: copy one test, change the name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { OverlayScopeLab } from "./OverlayScopeLab.tsx"

// The box is marked as a layer scope with the m-overlay-scope class, next to the class we gave it.
test("kutu bir katman kapsamı", () => {
  const s = renderTest(() => <OverlayScopeLab />)
  expect(s.get(".lab-scope")?.classList.contains("m-overlay-scope")).toBe(true)
})

// `class` is given as a function, so the box's class follows the state: pressing the button adds the second class.
test("class canlı", async () => {
  const s = renderTest(() => <OverlayScopeLab />)
  await s.click("Sınıfı değiştir")
  expect(s.get(".lab-scope")?.classList.contains("lab-dark")).toBe(true)
})

// A drawer opened from inside the scope is placed inside the box: its text is found within the box's own textContent,
// not somewhere else on the page.
test("içinde açılan çekmece kutunun içinde", async () => {
  const s = renderTest(() => <OverlayScopeLab />)
  await s.click("Kutuda aç")
  await s.flush(2)
  expect(s.get(".lab-scope")?.textContent).toContain("Kutudaki çekmece")
})
