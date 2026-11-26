// Tests for SchedulerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SchedulerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The calendar carries the class set in the Lab (.lab-sch); its texts come from the Lab's `labels`, `help` and
//   `renderEvent`.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { SchedulerLab } from "./SchedulerLab.tsx"

// `class` lands on the root and the `help` text is shown under the calendar.
test("takvim sınıfını ve kendi ipucunu alır", () => {
  const s = renderTest(() => <SchedulerLab />)
  expect(s.get(".lab-sch")).not.toBe(null)
  expect(s.sees("boş saate sürükleyip ekleyin")).toBe(true)
})

// `renderEvent` draws our own content for an event: the title together with the place.
test("kendi içeriği: etkinlik başlığı ve yeri birlikte yazılır", () => {
  const s = renderTest(() => <SchedulerLab />)
  expect(s.sees("Tasarım incelemesi")).toBe(true)
  expect(s.sees("Stüdyo")).toBe(true)
})

//  The Lab controls `view` (view + onView): its button switches the calendar from week to day, and the Lab's text
// follows.
test("görünüm düğmesi haftadan güne geçer", async () => {
  const s = renderTest(() => <SchedulerLab />)
  await s.click("Görünüm: week")
  expect(s.sees("Görünüm: day")).toBe(true)
})

// `locale` is a function here: switching it changes the lang attribute of the calendar root from "tr" to "en-US".
test("dil düğmesi takvimin dilini değiştirir (lang)", async () => {
  const s = renderTest(() => <SchedulerLab />)
  expect(s.get(".lab-sch")?.getAttribute("lang")).toBe("tr")
  await s.click("Dil: tr")
  expect(s.get(".lab-sch")?.getAttribute("lang")).toBe("en-US")
})
