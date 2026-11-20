import { test, expect, renderTest } from "march/testing"
import { WizardLab } from "./WizardLab.tsx"

// WizardLab'in testleri: kaydedince Testler sekmesinde çalışır. İleri düğmesi formu gönderir (submit): s.submit aynısını yapar
const next = ".lab-wizard"

test("zorunlu ad boşken İleri ilk adımda kalır", async () => {
  const s = renderTest(() => <WizardLab />)
  await s.submit(next)
  expect(s.sees("1 / 3")).toBe(true)
  expect(s.sees("Adım 1")).toBe(true)
})

test("adın ek doğrulaması alan hatası verir", async () => {
  const s = renderTest(() => <WizardLab />)
  await s.type("shop", "test")
  await s.submit(next)
  expect(s.sees("Bu ad ayrılmış")).toBe(true)
  expect(s.sees("Adım 1")).toBe(true)
})

test("ad yazılınca ikinci adıma geçer; başlıksız adımın adı labels.step'ten gelir", async () => {
  const s = renderTest(() => <WizardLab />)
  await s.type("shop", "Kahve Durağı")
  await s.submit(next)
  expect(s.sees("2 / 3")).toBe(true)
  expect(s.get(".lab-wizard .m-wizard-title")?.textContent).toBe("Bölüm 2")
  expect(s.sees("Adım 2")).toBe(true)
})

test("onReady'nin go'su özete atlar; Mağazayı aç onSubmit'i çalıştırır", async () => {
  const s = renderTest(() => <WizardLab />)
  await s.type("shop", "Kahve Durağı")
  await s.click("Özete atla")
  expect(s.sees("Kahve Durağı · İzmir · Pro")).toBe(true)
  await s.submit(next)
  await s.wait(() => s.sees("Kahve Durağı açıldı (Pro, 3 kişi)"))
  expect(s.sees("Kahve Durağı açıldı")).toBe(true)
})
