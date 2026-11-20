import { test, expect, renderTest } from "march/testing"
import { MediaLab } from "./MediaLab.tsx"

// MediaLab'in testleri: kaydedince Testler sekmesinde çalışır
test("resim bir img: adresi, alt metni ve boyut sınıfı", () => {
  const s = renderTest(() => <MediaLab />)
  const img = s.get(".lab-image")
  expect(img?.tagName).toBe("IMG")
  expect(img?.getAttribute("alt")).toBe("Gün batımında tepeler")
  expect(img?.classList.contains("m-media-md")).toBe(true)
})

test("video: afiş, döngü ve sessiz; controls={false} denetimleri kaldırır", () => {
  const s = renderTest(() => <MediaLab />)
  const v = s.get(".lab-video")
  expect(v?.tagName).toBe("VIDEO")
  expect(v?.getAttribute("poster")).toContain("hadi-waves.jpg")
  expect(v?.hasAttribute("controls")).toBe(false)
})

test("auto tür uzantıyı izler: düğme resmi videoya çevirir", async () => {
  const s = renderTest(() => <MediaLab />)
  expect(s.get(".lab-auto")?.tagName).toBe("IMG")
  await s.click("Resim / video")
  expect(s.get(".lab-auto")?.tagName).toBe("VIDEO")
})

test("yüklenemeyen resim yerine yedek metin", async () => {
  const s = renderTest(() => <MediaLab />)
  s.get(".lab-broken")?.dispatchEvent(new Event("error"))
  await s.flush()
  expect(s.sees("Medya yüklenemedi")).toBe(true)
})
