// Tests for SectionTimelineLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SectionTimelineLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find("name") finds an element by its visible text or aria-label; the dots are found by their names.
// - s.click("name") clicks the control with that name and returns it; it waits until the view has updated, which is why
//   the test that clicks is async and awaits it. s.sees("text") says whether the text is on screen.
// - The tests check what a user or a screen reader can observe (the accessible name of the nav, links versus buttons,
//   the status text, aria-current, the tab stop) rather than internal state, so they keep passing when the internals
//   change.
// To adapt them: copy one test, change the name or the expected value. The state classes (m-stl-vertical, ...) are the
// classes SectionTimeline puts on its root.
import { test, expect, renderTest } from "march/testing"
import { SectionTimelineLab } from "./SectionTimelineLab.tsx"

// labels.group is the accessible name of the nav element, `class` is added to the root, and the vertical orientation
// shows as a state class.
test("labels.group nav'ın adı; class ve dikey yön kökte", () => {
  const s = renderTest(() => <SectionTimelineLab />)
  const nav = s.find("Lab bölümleri")
  expect(nav?.tagName).toBe("NAV")
  expect(nav?.classList.contains("lab-timeline")).toBe(true)
  expect(nav?.classList.contains("m-stl-vertical")).toBe(true)
})

// An item with a `slug` becomes a link (the address of its section), one without it a button. The `label` function
// changes what a dot is called (the number is added in front), which is why the third item is found as "3. Sinyaller".
test("slug verilen nokta bir bağlantı, verilmeyen bir düğme; label adın içeriğini değiştirir", () => {
  const s = renderTest(() => <SectionTimelineLab />)
  expect(s.find("Giriş")?.tagName).toBe("A")
  expect(s.find("Giriş")?.getAttribute("href")).toBe("#lab-0")
  expect(s.find("Kurulum")?.tagName).toBe("BUTTON")
  expect(s.find("3. Sinyaller")).not.toBe(null)
})

// Pressing a dot makes its section the one being read: onChange reports its index (the Lab prints it), the dot gets
// aria-current="location" and becomes the single tab stop (tabindex 0).
test("Bir noktaya basınca o bölüm okunan olur: onChange ve aria-current", async () => {
  const s = renderTest(() => <SectionTimelineLab />)
  const mark = await s.click("Temalar")
  expect(s.sees("Okunan: Temalar (onChange: 4)")).toBe(true)
  expect(mark.getAttribute("aria-current")).toBe("location")
  expect(mark.getAttribute("tabindex")).toBe("0")
})
