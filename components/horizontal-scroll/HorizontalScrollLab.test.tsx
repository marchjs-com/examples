import { test, expect, renderTest } from "march/testing"
import { HorizontalScrollLab } from "./HorizontalScrollLab.tsx"

// HorizontalScrollLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bölge adını taşır, beş panel ve kendi sınıfı var", () => {
  const s = renderTest(() => <HorizontalScrollLab />)
  const region = s.get(".m-hs")
  expect(region?.getAttribute("aria-label")).toBe("5 panelli şerit")
  expect(region?.classList.contains("lab-hs")).toBeTruthy()
  expect(s.all(".m-hs-track > *").length).toBe(5)
})

test("Panel ekle: altıncı panel gelir, ad da güncellenir", async () => {
  const s = renderTest(() => <HorizontalScrollLab />)
  await s.click("Panel ekle")
  expect(s.all(".m-hs-track > *").length).toBe(6)
  expect(s.get(".m-hs")?.getAttribute("aria-label")).toBe("6 panelli şerit")
})

test("ilerleme çizgisi anahtarla kapanır", async () => {
  const s = renderTest(() => <HorizontalScrollLab />)
  expect(s.get(".m-hs-bar")).not.toBe(null)
  await s.click(s.all('[role="switch"]')[1]!)
  expect(s.get(".m-hs-bar")).toBe(null)
})

test("sabitleme kapanınca yerel kaydırıcı olur; panel genişliği bir değişkende", async () => {
  const s = renderTest(() => <HorizontalScrollLab />)
  await s.click(s.all('[role="switch"]')[0]!)
  await s.flush()
  expect(s.get(".m-hs")?.classList.contains("is-native")).toBeTruthy()
  expect((s.get(".m-hs") as HTMLElement).style.getPropertyValue("--m-hs-panel")).toBe("22rem")
})
