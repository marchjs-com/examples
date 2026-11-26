// Tests for OverflowTextLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <OverflowTextLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements by CSS selector (the Lab gives every example its own class), s.find(name)
//   by accessible name, s.click(name) clicks like a user and waits until the view has updated, and s.wait(ms) or
//   s.wait(fn) waits a time or until fn() is true. Whatever awaits is why those tests are async.
// - The tests check the DOM contract: attributes and class names. They never measure scrolling, because whether text
//   overflows depends on the width of the window the tests run in.
// To adapt them: copy one test, change the class and the expected value. The part class names (.m-marquee-fade,
// .m-marquee-ellipsis, .m-marquee-unit, is-running) are listed in the OverflowText docs.
import { test, expect, renderTest } from "march/testing"
import { OverflowTextLab } from "./OverflowTextLab.tsx"

// The text is in the DOM once (screen readers read it once), dir="auto" is set so mixed scripts read correctly, and the
// default has the fade class on the clipped edges.
test("metin bir kez okunur; dir=auto ve kenarları soldurma sınıfı", () => {
  const s = renderTest(() => <OverflowTextLab />)
  const basic = s.get(".lab-basic")
  expect(basic?.getAttribute("dir")).toBe("auto")
  expect(basic?.getAttribute("class")).toContain("m-marquee-fade")
  expect(basic?.textContent).toBe("Haftalık etkinlik özeti: Kadıköy koşu grubu, Moda sahili buluşması, kitap kulübü ve akşam yemeği")
})

// fade={false} switches the fade class to the ellipsis class; a data-* attribute passes through to the element, while
// `disabled` is a prop of the component, not an HTML attribute, so it must not be copied onto the element.
test("fade={false} üç nokta sınıfı verir; data-* öğeye geçer, disabled bir öznitelik değildir", () => {
  const s = renderTest(() => <OverflowTextLab />)
  const off = s.get(".lab-off")
  expect(off?.getAttribute("class")).toContain("m-marquee-ellipsis")
  expect(off?.getAttribute("data-kind")).toBe("lab")
  expect(off?.hasAttribute("disabled")).toBe(false)
})

// duplicate={2}: the strip holds the content and two copies. Only the first is readable: the copies are aria-hidden and
// inert, so screen readers do not repeat them and links inside cannot be focused.
test("duplicate={2}: içerik ve iki kopyası; kopyalar gizli ve etkisiz", () => {
  const s = renderTest(() => <OverflowTextLab />)
  const units = s.all(".lab-strip .m-marquee-unit")
  expect(units.length).toBe(3)
  expect(units[0]?.hasAttribute("aria-hidden")).toBe(false)
  expect(units.slice(1).map((u: Element) => u.getAttribute("aria-hidden"))).toEqual(["true", "true"])
  expect(units[2]?.hasAttribute("inert")).toBe(true)
})

// The "turn scrolling off" button sets disabled on a trigger="always" text. The test waits a moment (400 ms) and checks
// that the running class never appeared; the label of the button flipping proves the click was handled.
test("Kaydırmayı kapat: hep tetikli metin de kaymaz", async () => {
  const s = renderTest(() => <OverflowTextLab />)
  await s.click("Kaydırmayı kapat")
  expect(s.find("Kaydırmayı aç")).not.toBe(null)
  await s.wait(400)
  expect(s.get(".lab-off")?.getAttribute("class")).not.toContain("is-running")
})
