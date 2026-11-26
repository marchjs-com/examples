// Tests for PresentationLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PresentationLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - s.press(key, element) sends a key to an element, as a user typing; s.wait(predicate, { timeout }) waits until the
//   predicate is truthy (the deck changes slides through the motion engine, so we wait instead of guessing a delay).
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { PresentationLab } from "./PresentationLab.tsx"

// The deck's accessible name and role description come from `label` and `labels.deck`; the counter uses the custom
// counter function ("1 / 4"), and the first slide carries the is-current class.
test("deste adı, rolü, kendi sayacı; ilk slayt geçerli", () => {
  const s = renderTest(() => <PresentationLab />)
  const deck = s.get(".lab-deck")
  expect(deck?.getAttribute("aria-label")).toBe("Deneme sunumu")
  expect(deck?.getAttribute("aria-roledescription")).toBe("slayt destesi")
  expect(s.find("1 / 4")).not.toBe(null)
  expect(s.get(".lab-first")?.classList.contains("is-current")).toBeTruthy()
})

// The custom "next" button moves to slide 2; the Lab's outside text (bind:index) follows, and one more step shows the
// first Appear item (is-shown) before the deck leaves the slide.
test("Sonraki: ikinci slayt, dışarıdaki sıra da değişir; sonra ilk adım belirir", async () => {
  const s = renderTest(() => <PresentationLab />)
  await s.click("Sonraki")
  expect(s.find("2 / 4")).not.toBe(null)
  expect(s.find("Dışarıdaki sıra: 2")).not.toBe(null)
  await s.click("Sonraki")
  expect(s.all(".lab-steps li.is-shown").length).toBe(1)
})

// Keyboard: End on the deck jumps to the last slide. We wait for the counter text because the change is animated.
test("End tuşu son slayda gider", async () => {
  const s = renderTest(() => <PresentationLab />)
  await s.press("End", s.get(".lab-deck") as HTMLElement)
  await s.wait(() => s.find("4 / 4"), { timeout: 2000 })
  expect(s.find("4 / 4")).not.toBe(null)
})

// The `controls` prop removes the control row, and the `presenter` prop shows the speaker view with the slide's notes.
test("denetimler kapanır; konuşmacı görünümü notu gösterir", async () => {
  const s = renderTest(() => <PresentationLab />)
  await s.click("Denetimler")
  expect(s.get(".m-deck-controls")).toBe(null)
  await s.click("Konuşmacı görünümü")
  expect(s.get(".m-deck-speaker")?.textContent).toContain("Merhaba de")
})
