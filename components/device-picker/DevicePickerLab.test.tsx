// Tests for DevicePickerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DevicePickerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.click(target) clicks like
//   a user (a visible text or an element) and waits for the view to update, so tests that click are async.
// - Where a test only needs one plain DOM click, it calls element.click() directly instead of s.click.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DevicePickerLab } from "./DevicePickerLab.tsx"

// `devices` replaces the catalog: exactly the five devices we passed are listed (one is our own kiosk), `fit` with a
// text shows that text on the "fit the panel" button, and `class` marks this instance.
test("kendi listesi: beş cihaz ve üst satırda kendi metniyle sığdır", () => {
  const s = renderTest(() => <DevicePickerLab />)
  const rows = s.all(".lab-picker .m-dpick-item")
  expect(rows.length).toBe(5)
  expect(s.get(".lab-picker .m-dpick-fit-btn")?.textContent).toContain("Tam ekran")
  expect(s.sees("Lobi kiosku")).toBe(true)
})

// Pressing a device row selects it: onChange runs with its id and the Lab writes it into the visible line.
test("bir cihaza basınca seçilir", () => {
  const s = renderTest(() => <DevicePickerLab />)
  const ipad = s.all(".lab-picker .m-dpick-item").find((r: Element) => r.textContent?.startsWith("iPad")) as HTMLElement | undefined
  ipad?.click()
  expect(s.get(".lab-picked")?.textContent).toContain("ipad")
})

// Because `landscape` is given, the portrait / landscape switch is shown. Choosing landscape swaps width and height in
// the list (820 x 1180 becomes 1180 x 820). The button's name depends on the app language, so the test accepts both.
test("Yatay seçilince boyutlar yer değiştirir", () => {
  const s = renderTest(() => <DevicePickerLab />)
  expect(s.sees("820 × 1180")).toBe(true)
  const land = s.all("button").find((b: Element) => /^(Yatay|Landscape)$/.test(b.textContent?.trim() ?? "")) as HTMLElement | undefined
  land?.click()
  expect(s.sees("1180 × 820")).toBe(true)
  expect(s.get(".lab-picked")?.textContent).toContain("yatay")
})
