// Tests for ConsentBannerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ConsentBannerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(text) clicks like a user; s.flush(n) lets the view settle for n frames (the consent module is lazy, so
//   the banner is drawn a moment after the click); s.sees(text) says whether a text is visible; s.get(selector) finds
//   one element. Tests that click are async and await it.
// - The tests check what a user can observe (the banner's texts and buttons, whether it is on the page) rather than the
//   stored consent state.
import { test, expect, renderTest } from "march/testing"
import { ConsentBannerLab } from "./ConsentBannerLab.tsx"

// The "show again" button reopens the banner (an earlier decision may be stored). The banner then uses the title and
// the three button texts given in `title` and `labels`, including the Customize button (`customize`).
test("bant kendi başlığı ve düğme metinleriyle çizilir; Özelleştir kendi metniyle", async () => {
  const s = renderTest(() => <ConsentBannerLab />)
  await s.click("Bandı yeniden göster")
  await s.flush(2)
  expect(s.sees("Lab bandı")).toBe(true)
  expect(s.sees("Reddet (lab)")).toBe(true)
  expect(s.sees("Kabul (lab)")).toBe(true)
  expect(s.sees("Seç (lab)")).toBe(true)
})

// Rejecting closes the banner; the ConsentGate placeholder stays because the third-party category is still not allowed.
// Showing the banner again brings it back.
test("reddedince bant kapanır, yer tutucu kalır; yeniden göster bandı geri getirir", async () => {
  const s = renderTest(() => <ConsentBannerLab />)
  await s.click("Bandı yeniden göster")
  await s.flush(2)
  await s.click("Reddet (lab)")
  await s.flush(2)
  expect(s.get(".lab-banner")).toBeFalsy()
  expect(s.sees("Lab yer tutucusu")).toBe(true)
  await s.click("Bandı yeniden göster")
  await s.flush(2)
  expect(s.get(".lab-banner")).toBeTruthy()
})
