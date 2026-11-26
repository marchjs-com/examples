// Tests for StatusDotLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StatusDotLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds the element by its visible or accessible name, s.get(selector) by CSS selector, and
//   s.click(text) clicks like a user and waits until the view has updated (so a test that clicks is async and awaits).
// - The tests check what a screen reader or a user can observe (role, aria-hidden, the accessible name, the state
//   classes) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected class. The state classes (is-danger, is-pulse-ring ...)
// are the ones StatusDot puts on its root; .lab-dot and .lab-live come from StatusDotLab.
import { test, expect, renderTest } from "march/testing"
import { StatusDotLab } from "./StatusDotLab.tsx"

// With `label` the dot is an image with that name (role="img") for assistive technology, and its tone shows as a class.
test("label verilen nokta role=img ve adıyla okunur", () => {
  const s = renderTest(() => <StatusDotLab />)
  const dot = s.find("Ton danger")
  expect(dot?.getAttribute("role")).toBe("img")
  expect(dot?.classList.contains("is-danger")).toBe(true)
})

// Without `label` the dot is decoration and hidden from assistive technology (the state must be in the text beside it).
// Our own class and the extra attributes (title, data-*) go to the root.
test("label'sız nokta süs: aria-hidden; class ve öznitelikler köke gider", () => {
  const s = renderTest(() => <StatusDotLab />)
  const dot = s.get(".lab-dot")
  expect(dot?.getAttribute("aria-hidden")).toBe("true")
  expect(dot?.getAttribute("title")).toBe("Turuncu süs")
  expect(dot?.getAttribute("data-state")).toBe("decor")
})

// `pulse` true is the breathing ring, and pulse="blink" makes the dot fade instead.
test("pulse true halka olur, blink yanıp söner", () => {
  const s = renderTest(() => <StatusDotLab />)
  expect(s.find("Halka (true)")?.classList.contains("is-pulse-ring")).toBe(true)
  expect(s.find("Yanıp sönme")?.classList.contains("is-pulse-blink")).toBe(true)
})

// tone, pulse and label of the live dot are functions of one state. Pressing the button changes all three together:
// the accessible name, the tone class and the pulse class, which proves the props really are live.
test("düğmeyle canlı nokta durur: ad, ton ve hareket değişir", async () => {
  const s = renderTest(() => <StatusDotLab />)
  await s.click("Yayını durdur")
  const dot = s.get(".lab-live")!
  expect(dot.getAttribute("aria-label")).toBe("Durdu")
  expect(dot.classList.contains("is-neutral")).toBe(true)
  expect(dot.classList.contains("is-pulse-ring")).toBe(false)
})
