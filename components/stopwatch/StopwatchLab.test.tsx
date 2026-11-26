// StopwatchLab.test.tsx: tests for the full-featured Stopwatch example.
// They run in the MarchIDE "Tests" tab each time you save. What they cover: the group's accessible name and its
// buttons, the events, the controlled `running` prop and the parts you can switch off.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <StopwatchLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.sees(text) is true when that text is on screen; s.wait(ms) lets real time pass.
// - expect(x).toBe(y), toContain, toBeTruthy, toBeFalsy…: the assertions, as in Jest or Vitest.
// The tests check what a user sees and presses (texts, classes, names), not the stopwatch's private state.
import { test, expect, renderTest } from "march/testing"
import { StopwatchLab } from "./StopwatchLab.tsx"

// Proves accessibility: the stopwatch is a named group with a timer text and real buttons that say what they do.
test("kronometre adlı bir grup; düğmeler ne yaptığını söyler", () => {
  const s = renderTest(() => <StopwatchLab />)
  const root = s.get(".lab-full .m-stopwatch")!
  expect(root.getAttribute("role")).toBe("group")
  expect(root.getAttribute("aria-label")).toBe("Laboratuvar kronometresi")
  expect(s.get(".lab-full [role=timer]")).toBeTruthy()
  expect(s.get(".lab-full .m-stopwatch-toggle")!.textContent).toBe("Başlat")
})

// Proves the events and the lap list: start, wait, take a lap, stop, reset. Each callback writes the log, and the lap
// list shows the lap by its own name. s.wait lets real time pass, because the stopwatch measures real time.
test("başlat, tur, durdur, sıfırla: olaylar ve tur listesi", async () => {
  const s = renderTest(() => <StopwatchLab />)
  await s.click(".lab-full .m-stopwatch-toggle")
  expect(s.get(".lab-full .m-stopwatch")!.getAttribute("class")).toContain("is-running")
  await s.wait(120)
  await s.click(".lab-full .m-stopwatch-second")
  expect(s.get(".lab-full .m-stopwatch-lap-name")!.textContent).toBe("Tur 1")
  await s.click(".lab-full .m-stopwatch-toggle")
  await s.click(".lab-full .m-stopwatch-second")
  expect(s.sees("sıfırlandı")).toBe(true)
  expect(s.get(".lab-full .m-stopwatch-lap")).toBeFalsy()
})

// Proves the controlled prop: the Toggle's value runs and stops the second stopwatch.
test("running dışarıdan çalıştırır ve durdurur", async () => {
  const s = renderTest(() => <StopwatchLab />)
  await s.click(".lab-run [role=switch]")
  expect(s.get(".lab-ctl .m-stopwatch")!.getAttribute("class")).toContain("is-running")
  await s.click(".lab-run [role=switch]")
  expect(s.get(".lab-ctl .m-stopwatch")!.getAttribute("class")).not.toContain("is-running")
})

// Proves customization: no sub-dial on the controlled one; no controls, laps or numbers on the bare one; own class.
test("kapalı parçalar ve kendi sınıfı", () => {
  const s = renderTest(() => <StopwatchLab />)
  expect(s.get(".lab-ctl .m-stopwatch-sub")).toBeFalsy()
  expect(s.get(".lab-bare .m-stopwatch-controls")).toBeFalsy()
  expect(s.get(".lab-bare .m-gauge-label")).toBeFalsy()
  expect(s.get(".lab-bare .m-stopwatch")!.getAttribute("class")).toContain("lab-mine")
})
