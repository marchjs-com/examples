// Tests for BeforeAfterLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <BeforeAfterLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements, s.click(text) clicks like a user, s.press(key, element) sends a
//   key press to an element. Both wait until the view has updated, so the tests that use them are async and await.
// - The tests check what a user or a screen reader can observe (the slider role and its aria values, classes such as
//   .m-ba-vertical, which parts exist) rather than internal state.
// To adapt them: copy one test, change the selector or the expected value. Part classes (.m-ba-handle, .m-ba-grip,
// .m-ba-label, .m-ba-before, .m-ba-after) are listed in the BeforeAfter docs.
import { test, expect, renderTest } from "march/testing"
import { BeforeAfterLab } from "./BeforeAfterLab.tsx"

// The divider's handle is a role="slider": `label` is its accessible name, aria-valuenow is the position, and
// `valueText` is what screen readers read instead of a bare number.
test("tutamaç kendi adı ve değer metniyle bir slider", () => {
  const s = renderTest(() => <BeforeAfterLab />)
  const h = s.get('.lab-ba [role="slider"]')!
  expect(h.getAttribute("aria-label")).toBe("Gece ve gündüz")
  expect(h.getAttribute("aria-valuenow")).toBe("30")
  expect(h.getAttribute("aria-valuetext")).toBe("%30 gece")
})

// The Lab sets step={5}: an arrow key moves the handle by five and onChange reports the new position (the Lab prints
// it). The Ortala button sets the controlled `value` from outside, and the slider follows.
test("ok tuşu beş adım kaydırır, onChange konumu yazar", async () => {
  const s = renderTest(() => <BeforeAfterLab />)
  await s.press("ArrowRight", s.get('.lab-ba [role="slider"]')!)
  expect(s.get(".lab-pos")?.textContent).toBe("Konum: 35")
  await s.click("Ortala")
  expect(s.get('.lab-ba [role="slider"]')?.getAttribute("aria-valuenow")).toBe("50")
})

// The Lab's controls switch props: the vertical option sets orientation="vertical" (the root gets .m-ba-vertical),
// and the line option sets grip={false}, so the round grip is not drawn at all (only the line).
test("dikey yön ve yalnız çizgi tutamak", async () => {
  const s = renderTest(() => <BeforeAfterLab />)
  await s.click("dikey")
  expect(s.get(".lab-ba")?.classList.contains("m-ba-vertical")).toBe(true)
  await s.click("çizgi")
  expect(s.container.querySelector(".lab-ba .m-ba-grip")).toBe(null)
})

// beforeLabel and afterLabel give two corner chips, and each layer holds its own content.
test("iki köşe etiketi ve iki katman", () => {
  const s = renderTest(() => <BeforeAfterLab />)
  expect(s.all(".lab-ba .m-ba-label").length).toBe(2)
  expect(s.get(".lab-ba .m-ba-before")?.textContent).toContain("Gece")
  expect(s.get(".lab-ba .m-ba-after")?.textContent).toContain("Gündüz")
})
