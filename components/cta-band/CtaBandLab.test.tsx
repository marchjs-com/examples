// Tests for CtaBandLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CtaBandLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all find elements by CSS selector; s.find(text) finds the element that carries a text; s.click(text)
//   clicks like a user and waits until the view has updated (so those tests are async and await it).
// - The tests check what a user can observe (texts, the link, the variant class, whether the decorative layers exist)
//   rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { CtaBandLab } from "./CtaBandLab.tsx"

// The first variant is the gradient one. The title is a function that reads the counter, the lead and the note are shown,
// and an action given as a node (the link button) is rendered as a link with its href and class.
test("gradyan bant: başlık, açıklama, not ve düğüm eylem", () => {
  const s = renderTest(() => <CtaBandLab />)
  expect(s.get(".lab-cta")?.classList.contains("m-cta-gradient")).toBeTruthy()
  expect(s.find("Bugün 0 kişi katıldı")).not.toBe(null)
  expect(s.find("Sen de aramıza katıl, ilk hafta ücretsiz.")).not.toBe(null)
  expect(s.find("Kart gerekmez")).not.toBe(null)
  expect(s.get('.lab-cta a.lab-faq[href="#sss"]')).not.toBe(null)
})

// An action's onClick raises the counter; the title and the note are functions, so they update by themselves, without
// the band being drawn again.
test("Katıl: başlık ve not kendiliğinden güncellenir", async () => {
  const s = renderTest(() => <CtaBandLab />)
  await s.click("Katıl")
  expect(s.find("Bugün 1 kişi katıldı")).not.toBe(null)
  expect(s.find("Teşekkürler!")).not.toBe(null)
})

// The segmented control switches the variant; the band gets the class of the new one (mesh).
test("ağ görünümüne geçer", async () => {
  const s = renderTest(() => <CtaBandLab />)
  await s.click("ağ")
  expect(s.get(".lab-cta")?.classList.contains("m-cta-mesh")).toBeTruthy()
})

// backdrop={false} removes the decorative layers: the panel has some at the start, none after the toggle is switched off.
test("süs katmanları kapanınca panelde katman kalmaz", async () => {
  const s = renderTest(() => <CtaBandLab />)
  expect(s.all(".lab-cta .m-cta-panel > .m-ov").length).toBeGreaterThan(0)
  await s.click("Süs katmanları")
  expect(s.all(".lab-cta .m-cta-panel > .m-ov").length).toBe(0)
})
