// Tests for TimeRulerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TimeRulerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds an element by CSS selector, s.sees(text) says whether a text is on the page, and s.flush() lets
//   pending ticks run after an event that the test dispatched by hand (here a keydown on the playhead).
// - The tests check what a screen reader or a user can observe (the group's and the slider's names and roles, the spoken
//   value, the visible labels and the position the Lab prints) rather than internal state, so they keep passing when the
//   component's internals change.
// To adapt them: copy one test, change the selector or the expected text. .lab-ruler is the class given to the first ruler and
// .lab-head the class given to its playhead through `headClass`.
import { test, expect, renderTest } from "march/testing"
import { TimeRulerLab } from "./TimeRulerLab.tsx"

// A ruler with `onSeek` is a group named by labels.ruler, and its playhead is a slider named by labels.playhead whose value
// is spoken through our own `valueText` ("1500 milisaniye").
test("onSeek'li cetvel bir grup, başı bir kaydırıcı; labels adları verir", () => {
  const s = renderTest(() => <TimeRulerLab />)
  const ruler = s.get(".lab-ruler")!
  expect(ruler.getAttribute("aria-label")).toBe("Lab cetveli")
  const head = ruler.querySelector(".lab-head")!
  expect(head.getAttribute("role")).toBe("slider")
  expect(head.getAttribute("aria-label")).toBe("Lab başı")
  expect(head.getAttribute("aria-valuetext")).toBe("1500 milisaniye")
})

// The Right arrow on the playhead moves it by `keyStep` (500 ms here, from 1500 to 2000) and calls onSeekStart, which the Lab
// counts; both are written in visible text.
test("→ tuşu keyStep kadar ilerletir ve onSeekStart sayar", async () => {
  const s = renderTest(() => <TimeRulerLab />)
  const head = s.get(".lab-head")!
  head.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }))
  await s.flush()
  expect(s.sees("Konum: 2000 ms")).toBe(true)
  expect(s.sees("sürükleme / tuş: 1")).toBe(true)
})

// `ticks` replaces the computed ticks with our own, including their labels, and `format` writes the label of a major tick
// in our own form ("2 sn" for 2000 ms).
test("ticks kendi etiketlerini, format kendi biçimini yazar", () => {
  const s = renderTest(() => <TimeRulerLab />)
  expect(s.sees("yarı")).toBe(true)
  expect(s.sees("2 sn")).toBe(true)
})
