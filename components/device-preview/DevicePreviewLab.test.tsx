// Tests for DevicePreviewLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DevicePreviewLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.click(target) clicks like
//   a user (a visible text or an element) and waits for the view to update, so tests that click are async.
// - The rail buttons are found by their aria-label and pressed with a plain DOM click, because their names follow the
//   app language (Turkish or English).
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DevicePreviewLab } from "./DevicePreviewLab.tsx"

// Presses the first rail button whose aria-label matches `name`.
const press = (s: ReturnType<typeof renderTest>, name: RegExp) => (s.all("button").find((b: Element) => name.test(b.getAttribute("aria-label") ?? "")) as HTMLElement | undefined)?.click()

// The content is rendered inside the device's screen (the own watch device shows its text), and `label` becomes the
// accessible name of the device group.
test("içerik cihazların ekranında; label erişilebilir ad olur", () => {
  const s = renderTest(() => <DevicePreviewLab />)
  expect(s.get(".lab-own")?.textContent).toContain("Kendi cihazım")
  expect(s.get(".lab-phone")?.getAttribute("aria-label")).toBe("Sohbet telefonu")
})

// A desktop device is drawn as a browser window (class m-device-desktop) whose address bar shows the `address` prop.
test("masaüstü bir tarayıcı penceresi: adres çubuğu, dokunma yok", () => {
  const s = renderTest(() => <DevicePreviewLab />)
  expect(s.get(".lab-desk")?.className).toContain("m-device-desktop")
  expect(s.get(".lab-desk .m-device-address")?.textContent).toBe("hadi.app/etkinlikler")
})

// The control rail does what a real device would: "go offline" fires the offline event (onEvent writes it into the log)
// and "turn to landscape" puts the device in landscape (class is-landscape).
test("kumanda cihazı çevirir ve çevrimdışı olayını atar", () => {
  const s = renderTest(() => <DevicePreviewLab />)
  press(s, /Çevrimdışı ol|Go offline/)
  expect(s.get(".lab-log")?.textContent).toContain("offline")
  press(s, /Yatay çevir|Turn to landscape/)
  expect(s.get(".lab-phone")?.className).toContain("is-landscape")
})
