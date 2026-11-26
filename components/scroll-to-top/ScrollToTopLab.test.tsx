// Tests for ScrollToTopLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ScrollToTopLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find("text") finds an element by its visible text or aria-label; s.get(selector) finds one element by selector.
// - s.click(el) clicks like a user and waits until the view has updated (that is why the test that clicks is async).
// - There is no real scrolling in this test environment, so the helper below sets scrollTop and sends the scroll
//   event by hand; the component then reacts exactly as it would to a real scroll.
// - The tests check what a user or a screen reader can observe (the accessible name, whether the button is shown,
//   its text, the scroll position) rather than internal state.
// To adapt them: copy one test, change the label, the scroll distance or the expected value.
import { test, expect, renderTest } from "march/testing"
import { ScrollToTopLab } from "./ScrollToTopLab.tsx"

// Scrolls the Lab's box to `top` px and fires the scroll event. The buttons listen to the event in the capture phase,
// so it is dispatched on the box itself.
const scrollBox = (s: { get(sel: string): Element | null }, top: number) => {
  const box = s.get(".lab-box") as HTMLElement
  box.scrollTop = top
  box.dispatchEvent(new Event("scroll"))
  return box
}

// `label` becomes the accessible name (aria-label), and before the threshold is crossed the button reports
// data-shown="false" (it is hidden and inert).
test("label erişilebilir ad olur; eşik geçilmeden düğme gizli (data-shown=false)", () => {
  const s = renderTest(() => <ScrollToTopLab />)
  const pop = s.find("Zıplayarak (pop, 40 px)")
  expect(pop?.getAttribute("aria-label")).toBe("Zıplayarak (pop, 40 px)")
  expect(pop?.getAttribute("data-shown")).toBe("false")
})

// Each button has its own threshold: at 150 px the 40 px and 120 px buttons are shown, the 200 px one is not yet.
test("kutu eşiği geçince yalnız eşiği geçilenler belirir", () => {
  const s = renderTest(() => <ScrollToTopLab />)
  const pop = s.find("Zıplayarak (pop, 40 px)")!
  scrollBox(s, 150)
  expect(pop.getAttribute("data-shown")).toBe("true")
  expect(s.find("Belirerek (fade, 120 px)")?.getAttribute("data-shown")).toBe("true")
  expect(s.find("Kayarak (slide, 200 px)")?.getAttribute("data-shown")).toBe("false")
})

// `class` lands on the button, `icon` accepts your own text (here "⇧") instead of an icon, and the common m:color prop
// is written to the data-m-color attribute.
test("class, m:color ve kendi metnin (icon) düğmeye gider", () => {
  const s = renderTest(() => <ScrollToTopLab />)
  const instant = s.get(".lab-instant")
  expect(instant?.textContent).toBe("⇧")
  expect(s.find("Kayarak (slide, 200 px)")?.getAttribute("data-m-color")).toBe("brand-green")
})

// smooth={false}: after scrolling the box down and pressing the button, scrollTop is 0 right away, with no animation
// to wait for.
test("smooth={false}: basınca kutu hemen başa döner", async () => {
  const s = renderTest(() => <ScrollToTopLab />)
  const instant = s.get(".lab-instant")!
  const box = scrollBox(s, 400)
  expect(instant.getAttribute("data-shown")).toBe("true")
  await s.click(instant)
  expect(box.scrollTop).toBe(0)
})
