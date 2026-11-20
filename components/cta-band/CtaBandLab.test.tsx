import { test, expect, renderTest } from "march/testing"
import { CtaBandLab } from "./CtaBandLab.tsx"

// CtaBandLab'in testleri: kaydedince Testler sekmesinde çalışır
test("gradyan bant: başlık, açıklama, not ve düğüm eylem", () => {
  const s = renderTest(() => <CtaBandLab />)
  expect(s.get(".lab-cta")?.classList.contains("m-cta-gradient")).toBeTruthy()
  expect(s.find("Bugün 0 kişi katıldı")).not.toBe(null)
  expect(s.find("Sen de aramıza katıl, ilk hafta ücretsiz.")).not.toBe(null)
  expect(s.find("Kart gerekmez")).not.toBe(null)
  expect(s.get('.lab-cta a.lab-faq[href="#sss"]')).not.toBe(null)
})

test("Katıl: başlık ve not kendiliğinden güncellenir", async () => {
  const s = renderTest(() => <CtaBandLab />)
  await s.click("Katıl")
  expect(s.find("Bugün 1 kişi katıldı")).not.toBe(null)
  expect(s.find("Teşekkürler!")).not.toBe(null)
})

test("ağ görünümüne geçer", async () => {
  const s = renderTest(() => <CtaBandLab />)
  await s.click("ağ")
  expect(s.get(".lab-cta")?.classList.contains("m-cta-mesh")).toBeTruthy()
})

test("süs katmanları kapanınca panelde katman kalmaz", async () => {
  const s = renderTest(() => <CtaBandLab />)
  expect(s.all(".lab-cta .m-cta-panel > .m-ov").length).toBeGreaterThan(0)
  await s.click("Süs katmanları")
  expect(s.all(".lab-cta .m-cta-panel > .m-ov").length).toBe(0)
})
