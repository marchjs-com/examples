import { test, expect, renderTest } from "march/testing"
import { DevicePreviewLab } from "./DevicePreviewLab.tsx"

// DevicePreviewLab'in testleri: kaydedince Testler sekmesinde çalışır
// adı (aria-label) uyan düğmeye basar; kumandanın adları önizlemenin diline göre Türkçe ya da İngilizce
const press = (s: ReturnType<typeof renderTest>, name: RegExp) => (s.all("button").find((b: Element) => name.test(b.getAttribute("aria-label") ?? "")) as HTMLElement | undefined)?.click()

test("içerik cihazların ekranında; label erişilebilir ad olur", () => {
  const s = renderTest(() => <DevicePreviewLab />)
  expect(s.get(".lab-own")?.textContent).toContain("Kendi cihazım")
  expect(s.get(".lab-phone")?.getAttribute("aria-label")).toBe("Sohbet telefonu")
})

test("masaüstü bir tarayıcı penceresi: adres çubuğu, dokunma yok", () => {
  const s = renderTest(() => <DevicePreviewLab />)
  expect(s.get(".lab-desk")?.className).toContain("m-device-desktop")
  expect(s.get(".lab-desk .m-device-address")?.textContent).toBe("hadi.app/etkinlikler")
})

test("kumanda cihazı çevirir ve çevrimdışı olayını atar", () => {
  const s = renderTest(() => <DevicePreviewLab />)
  press(s, /Çevrimdışı ol|Go offline/)
  expect(s.get(".lab-log")?.textContent).toContain("offline")
  press(s, /Yatay çevir|Turn to landscape/)
  expect(s.get(".lab-phone")?.className).toContain("is-landscape")
})
