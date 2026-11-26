// Tests for LiveCounterLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LiveCounterLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds an element by CSS selector; s.click("text") clicks a button or switch by its text or label
//   and waits until the view has updated, which is why every test that clicks is async and awaits it.
// - s.container is the root element the component is mounted in; one test uses it to look for something that should
//   no longer exist.
// - The tests check what a user or a screen reader can observe (the label, the number text, the text with prefix and
//   suffix) rather than internal state, so they keep passing when the component's internals change. They do not test
//   the animation itself, only its result.
// To adapt them: copy one test, change the selector or the expected text. LiveCounter's part classes (m-lc-label,
// m-lc-text, m-lc-plain, m-lc-dot-own) are what the tests look up.
import { test, expect, renderTest } from "march/testing"
import { LiveCounterLab } from "./LiveCounterLab.tsx"

// The label, the number (m-lc-text) and the plain full text with prefix and suffix (m-lc-plain) all show the start value
// 120.
test("etiket, ön ve son ek, başlangıç değeri", () => {
  const s = renderTest(() => <LiveCounterLab />)
  expect(s.get(".lab-lc .m-lc-label")?.textContent).toBe("kişi sırada")
  expect(s.get(".lab-lc .m-lc-text")?.textContent).toBe("120")
  expect(s.get(".lab-lc .m-lc-plain")?.textContent).toBe("👥 120 kişi")
})

// Pressing the button raises the live value by 5, and the counter shows the new number.
test("değer artınca sayı değişir", async () => {
  const s = renderTest(() => <LiveCounterLab />)
  await s.click("+5 kişi")
  expect(s.get(".lab-lc .m-lc-text")?.textContent).toBe("125")
})

// The custom dot (our own mark) is drawn while the switch is on; turning the switch off removes it. We use
// s.container because the counter is rebuilt by the switch.
test("kendi canlı noktası; anahtar kapatınca gider", async () => {
  const s = renderTest(() => <LiveCounterLab />)
  expect(s.get(".lab-lc .lab-dot")).not.toBe(null)
  await s.click("Canlı nokta")
  expect(s.container.querySelector(".lab-lc .m-lc-dot-own")).toBe(null)
})

// With the simulation switch on, `value` is not given, so the counter starts from `from` (500).
test("taklit büyüme from değerinden başlar", async () => {
  const s = renderTest(() => <LiveCounterLab />)
  await s.click("Taklit büyüme")
  expect(s.get(".lab-lc .m-lc-text")?.textContent).toBe("500")
})
