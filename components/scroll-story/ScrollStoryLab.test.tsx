// Tests for ScrollStoryLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ScrollStoryLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null), s.all(selector) finds all matches.
// - s.click("text") clicks the control with that visible text (or aria-label); both click and the awaits wait until the
//   view has updated, which is why the tests that click are async.
// - The tests check what a user or a screen reader can observe (heading text, the number text, which parts exist, the
//   state classes on the section) rather than internal state, so they keep passing when the internals change.
// To adapt them: copy one test, change the selector or the expected value. The part classes (.m-story-step,
// .m-story-num, .m-story-dots, .m-story-media) are the classes ScrollStory puts on its own parts.
import { test, expect, renderTest } from "march/testing"
import { ScrollStoryLab } from "./ScrollStoryLab.tsx"

// Three steps are drawn, each title is a real heading (h3), and with the Lab's default numbers function the number
// text is the custom one ("Step 1" in Turkish).
test("üç adım, başlıkları h3; numaralar kendi metniyle", () => {
  const s = renderTest(() => <ScrollStoryLab />)
  expect(s.all(".lab-story .m-story-step h3").map((h: Element) => h.textContent)).toEqual(["Planla", "Davet et", "Buluş"])
  expect(s.get(".lab-story .m-story-num")?.textContent).toBe("Adım 1")
})

// The "numbers" prop: true gives "01", a function gives your own text, false draws no number element at all.
test("numara seçimi: 01 ya da hiç", async () => {
  const s = renderTest(() => <ScrollStoryLab />)
  await s.click("01")
  expect(s.get(".lab-story .m-story-num")?.textContent).toBe("01")
  await s.click("numarasız")
  expect(s.get(".lab-story .m-story-num")).toBe(null)
})

// `dots` and `theme` start on (the section carries is-themed); switching them off removes the dots element and the
// themed state.
test("noktalar ve adıma göre renk anahtarlarla kapanır", async () => {
  const s = renderTest(() => <ScrollStoryLab />)
  expect(s.get(".lab-story .m-story-dots")).not.toBe(null)
  expect(s.get(".lab-story")?.classList.contains("is-themed")).toBe(true)
  await s.click("Noktalar")
  await s.click("Adıma göre renk")
  expect(s.get(".lab-story .m-story-dots")).toBe(null)
  expect(s.get(".lab-story")?.classList.contains("is-themed")).toBe(false)
})

// side="start" puts the pinned media on the start side (a state class on the section); every one of the three steps
// has its own media element.
test("görsel başa alınır; her adımın görseli var", async () => {
  const s = renderTest(() => <ScrollStoryLab />)
  await s.click("başta")
  expect(s.get(".lab-story")?.classList.contains("m-story-media-start")).toBe(true)
  expect(s.all(".lab-story .m-story-media").length).toBe(3)
})
