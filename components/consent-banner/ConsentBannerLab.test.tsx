import { test, expect, renderTest } from "march/testing"
import { ConsentBannerLab } from "./ConsentBannerLab.tsx"

// ConsentBannerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bant kendi başlığı ve düğme metinleriyle çizilir; Özelleştir kendi metniyle", async () => {
  const s = renderTest(() => <ConsentBannerLab />)
  await s.click("Bandı yeniden göster")
  await s.flush(2)
  expect(s.sees("Lab bandı")).toBe(true)
  expect(s.sees("Reddet (lab)")).toBe(true)
  expect(s.sees("Kabul (lab)")).toBe(true)
  expect(s.sees("Seç (lab)")).toBe(true)
})

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
