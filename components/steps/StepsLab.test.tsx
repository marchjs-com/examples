// Tests for StepsLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <StepsLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all find elements by CSS selector, s.find(text) by visible text; s.click(text) clicks like a user and
//   waits until the view has updated (so a test that clicks is async and awaits it).
// - The tests check what a user or a screen reader can observe (buttons, aria-current, the text inside the dots) rather
//   than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. Part classes (.m-step2-title,
// .m-step2-dot, .m-steps2-bare ...) are the parts of Steps; the .lab-* classes come from StepsLab.
import { test, expect, renderTest } from "march/testing"
import { StepsLab } from "./StepsLab.tsx"

// With `onSelect` every step is a button (three of them), and pressing one makes it the current step (aria-current)
// and calls onSelect, which the Lab writes in visible text.
test("onSelect ile adımlar düğme; Başla'ya basınca geçerli adım olur", async () => {
  const s = renderTest(() => <StepsLab />)
  expect(s.all(".lab-steps button").length).toBe(3)
  await s.click("Başla")
  expect(s.get('.lab-steps [aria-current="step"] .m-step2-title')?.textContent).toBe("Başla")
  expect(s.find("Seçilen: Başla")).not.toBe(null)
})

// Without `onSelect` there are no buttons. doneIcon={false} keeps the number in a done step, connector={false} adds the
// "bare" class (no line), and doneIcon="✔" writes that short text in a done step.
test("onSelect yoksa düğme yok; doneIcon={false} numarayı, connector={false} çizgisiz sınıfı verir", () => {
  const s = renderTest(() => <StepsLab />)
  expect(s.all(".lab-numbers button").length).toBe(0)
  expect(s.get(".lab-numbers .m-step2-dot")?.textContent).toBe("1")
  expect(s.get(".lab-numbers")?.getAttribute("class")).toContain("m-steps2-bare")
  expect(s.get(".lab-text .m-step2-dot")?.textContent).toBe("✔")
})

// `renderDot` decides the content of each dot: a star for the done step, a letter for the rest.
test("renderDot her noktanın içeriğini verir", () => {
  const s = renderTest(() => <StepsLab />)
  expect(s.all(".lab-dots .m-step2-dot").map((d: Element) => d.textContent)).toEqual(["★", "B", "C"])
})

// The Lab's Next button moves the shared `current` forward, so all lists advance together. The vertical list
// has its own class, and the done steps carry the is-done class.
test("İleri hepsini ilerletir; dikey liste kendi sınıfını alır", async () => {
  const s = renderTest(() => <StepsLab />)
  expect(s.get(".lab-vertical")?.getAttribute("class")).toContain("m-steps2-v")
  await s.click("İleri")
  expect(s.get('.lab-vertical [aria-current="step"] .m-step2-title')?.textContent).toBe("Başla")
  expect(s.get(".lab-dots .m-step2-dot")?.textContent).toBe("★")
  expect(s.all(".lab-dots .is-done").length).toBe(2)
})
