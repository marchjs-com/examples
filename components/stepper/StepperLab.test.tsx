// Tests for StepperLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StepperLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds an element by its text, s.get / s.all by CSS selector; s.click(text) clicks like a user and
//   waits until the view has updated (so a test that clicks is async and awaits it).
// - The tests check what a user or a screen reader can observe (button states, the panel's accessible name, the
//   current step, visible text) rather than internal state. The Lab turns the morph off first in a test that moves
//   between steps, so the panel text can be read right after the click instead of after a transition.
// To adapt them: copy one test, change the text or the selector. The part classes (.m-stepper-frame, .m-stepper-count,
// .m-step2-title ...) are the parts of Stepper and Steps; .lab-main and .lab-bare come from StepperLab.
import { test, expect, renderTest } from "march/testing"
import { StepperLab } from "./StepperLab.tsx"

// `labels` supplies our own button texts and the panel's accessible name, and `counter` our own counter text. On the
// first step Back is disabled and Next is enabled.
test("labels: kendi düğme metinleri, panelin adı ve sayaç", () => {
  const s = renderTest(() => <StepperLab />)
  // On the first step the Back button is disabled and the Next button is enabled.
  expect((s.find("Önceki")?.closest("button") as HTMLButtonElement | null)?.disabled).toBe(true)
  expect((s.find("Devam")?.closest("button") as HTMLButtonElement | null)?.disabled).toBe(false)
  expect(s.get(".lab-main .m-stepper-frame")?.getAttribute("aria-label")).toBe("Aşama 1 / 3")
  expect(s.get(".lab-main .m-stepper-count")?.textContent).toBe("1. adım, toplam 3")
})

// Next moves one step ahead: the current step (aria-current) and the panel text change. On the last step the button is
// the finish button, and pressing it calls onFinish, which the Lab counts in visible text. Morph is switched off first
// so the new panel is in place immediately.
test("Devam bir sonraki adıma geçer; son adımda düğme Bitir olur ve onFinish çalışır", async () => {
  const s = renderTest(() => <StepperLab />)
  await s.click("Morph kapat")
  await s.click("Devam")
  expect(s.get('.lab-main [aria-current="step"] .m-step2-title')?.textContent).toBe("Doğrula")
  expect(s.get(".lab-main .m-stepper-pane")?.textContent).toBe("Gelen kodu gir.")
  await s.click("Devam")
  await s.click("Bitir")
  expect(s.find("Bitirme sayısı: 1")).not.toBe(null)
})

// The second Stepper turns the extras off: no highlight blob, no Back / Next bar, no connector line; `renderDot` writes
// our own content in each dot (a tick for done steps, a letter otherwise). The first Stepper keeps its highlight.
test("highlight, counter ve nav kapalı; renderDot ve çizgisiz Steps", async () => {
  const s = renderTest(() => <StepperLab />)
  expect(s.get(".lab-bare .m-stepper-blob")).toBe(null)
  expect(s.get(".lab-bare .m-stepper-nav")).toBe(null)
  expect(s.get(".lab-main .m-stepper-blob")).not.toBe(null)
  expect(s.get(".lab-bare .m-steps2")?.getAttribute("class")).toContain("m-steps2-bare")
  await s.click("Başla")
  expect(s.all(".lab-bare .m-step2-dot").map((d: Element) => d.textContent)).toEqual(["✓", "✓", "C"])
})

// `vertical` is live: flipping it changes the layout class but keeps the very same root element, so the Stepper's state
// and focus are not thrown away.
test("vertical canlı: aynı stepper döner", async () => {
  const s = renderTest(() => <StepperLab />)
  const main = s.get(".lab-main")
  await s.click("Dikey yap")
  expect(s.get(".lab-main")).toBe(main)
  expect(main?.getAttribute("class")).toContain("m-stepper-v")
})
