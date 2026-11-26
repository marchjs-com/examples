// AttitudeIndicatorLab.test.tsx: tests for the full-featured AttitudeIndicator example.
// They run in the MarchIDE "Tests" tab each time you save. What they cover: the spoken attitude, the horizon card
// following pitch and roll, the colours and the parts you can switch off.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <AttitudeIndicatorLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.wait(ms) lets time pass (the spoken text follows at most 4 times a second).
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// The tests check what users and screen readers observe, not the component's private state.
import { test, expect, renderTest } from "march/testing"
import { AttitudeIndicatorLab } from "./AttitudeIndicatorLab.tsx"

// The horizon card's transform: "rotate(-20 100 100) translate(0 22)" → the bank (20) and the pitch offset (22).
const card = (el: Element | null) => {
  const m = /rotate\(([-\d.]+) 100 100\) translate\(0 ([-\d.]+)\)/.exec(el!.getAttribute("transform")!)!
  return { roll: -Number(m[1]), y: Number(m[2]) }
}

// Proves accessibility: the instrument is an image whose name says the attitude in words.
test("yapay ufuk bir görsel: duruş sözcüklerle okunur", () => {
  const s = renderTest(() => <AttitudeIndicatorLab />)
  const root = s.get(".lab-std .m-att")!
  expect(root.getAttribute("role")).toBe("img")
  expect(root.getAttribute("aria-label")).toContain("Laboratuvar")
  expect(root.getAttribute("aria-label")).toContain("10°")
})

// Proves the card follows the state: banking +10° turns it to 30°, the nose −5° moves it down; "Düz" levels it
// (motion={false} on that indicator, so no waiting). The spoken name follows within a quarter second and, level, has
// no degrees left in it.
test("kart yatışla döner, yunuslamayla kayar; düz uçuş", async () => {
  const s = renderTest(() => <AttitudeIndicatorLab />)
  expect(card(s.get(".lab-std .m-att-card")).roll).toBe(20)
  await s.click(".lab-bank")
  expect(card(s.get(".lab-std .m-att-card")).roll).toBe(30)
  await s.click(".lab-level")
  expect(card(s.get(".lab-std .m-att-card")).y).toBe(0)
  await s.wait(300)
  expect(s.get(".lab-std .m-att")!.getAttribute("aria-label")).not.toContain("°")
})

// Proves the colours: the sky and the ground take the theme tokens given in `colors`.
test("gök ve yer tema renkleri", () => {
  const s = renderTest(() => <AttitudeIndicatorLab />)
  expect(s.get(".lab-colors .m-att-sky")!.getAttribute("style")).toContain("--m-brand-purple")
  expect(s.get(".lab-colors .m-att-ground")!.getAttribute("style")).toContain("--m-brand-gold")
})

// Proves customization: no ladder numbers, no glass and no face on the bare one, and its own class.
test("kapalı parçalar ve kendi sınıfı", () => {
  const s = renderTest(() => <AttitudeIndicatorLab />)
  expect(s.get(".lab-bare .m-att-num")).toBeFalsy()
  expect(s.get(".lab-bare .m-gauge-glass")).toBeFalsy()
  expect(s.get(".lab-bare .m-gauge")!.getAttribute("class")).toContain("m-gauge-bare")
  expect(s.get(".lab-bare .m-att")!.getAttribute("class")).toContain("lab-mine")
})
