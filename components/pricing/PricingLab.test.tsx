// Tests for PricingLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PricingLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The badge and the custom-price texts come from the Lab's own `labels` and plan data, so the tests look for them.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { PricingLab } from "./PricingLab.tsx"

// Three plan cards are drawn, the featured plan carries the badge, the null price shows labels.custom, and a feature
// with included: false is marked off and announced with the custom "not included" text.
test("üç plan; öne çıkan rozetli, özel fiyat kendi metniyle", () => {
  const s = renderTest(() => <PricingLab />)
  expect(s.all(".lab-pricing .m-price-card").length).toBe(3)
  expect(s.get(".m-price-card.is-featured .m-price-badge")?.textContent).toBe("Önerilen")
  expect(s.get(".m-price-custom")?.textContent).toBe("Bize sorun")
  expect(s.get(".m-price-feat.is-off")?.textContent).toContain("dahil değil")
})

// Pressing the yearly option of the switch sets the period (the Lab prints it), changes the second plan's price and
// switches the "billed" line to the yearly text.
test("Yıllık'a basınca dönem değişir, fiyat ve satır güncellenir", async () => {
  const s = renderTest(() => <PricingLab />)
  const before = s.all(".m-price-plain")[1]?.textContent
  await s.click("Yıllık")
  expect(s.sees("Dönem: yearly")).toBe(true)
  expect(s.all(".m-price-plain")[1]?.textContent).not.toBe(before)
  expect(s.get(".m-price-billed")?.textContent).toBe("yıllık ödenir")
})

// A plan's cta.onClick runs (the label counts presses), and `featureIcon` as a function replaces the built-in mark:
// with the Lab's own-mark toggle on, our check text is drawn.
test("eylem sayar; kendi işaret anahtarı işareti değiştirir", async () => {
  const s = renderTest(() => <PricingLab />)
  await s.click("Pro'yu seç (0)")
  expect(s.find("Pro'yu seç (1)")).not.toBe(null)
  expect(s.get(".m-price-feat-own")).toBe(null)
  await s.click("Kendi işaretim")
  expect(s.get(".m-price-feat-own")?.textContent).toBe("✓")
})

// toggle={false} removes the period switch and per={false} removes the "per month" line; both elements are gone.
test("dönem düğmesi ve ay satırı kapanır", async () => {
  const s = renderTest(() => <PricingLab />)
  await s.click("Dönem düğmesi")
  await s.click("Ay satırı")
  expect(s.get(".m-price-switch")).toBe(null)
  expect(s.get(".m-price-per")).toBe(null)
})
