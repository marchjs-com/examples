import { test, expect, renderTest } from "march/testing"
import { VideoBackgroundLab } from "./VideoBackgroundLab.tsx"

// VideoBackgroundLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kök sınıfı, koyu katman ve üstteki içerik", () => {
  const s = renderTest(() => <VideoBackgroundLab />)
  const root = s.get(".lab-vbg")
  expect(root?.classList.contains("m-vbg-tint-dark")).toBeTruthy()
  expect(s.get(".lab-vbg .m-vbg-tint")).not.toBe(null)
  expect(s.find("Dalgaların üstünde")).not.toBe(null)
})

test("afiş hemen görünür", () => {
  const s = renderTest(() => <VideoBackgroundLab />)
  expect(s.get(".lab-vbg img")?.getAttribute("src")).toContain("hadi-waves.jpg")
})

test("katman yok: renk katmanı kalkar", async () => {
  const s = renderTest(() => <VideoBackgroundLab />)
  await s.click("yok")
  expect(s.get(".lab-vbg")?.classList.contains("m-vbg-tint-none")).toBeTruthy()
  expect(s.get(".lab-vbg .m-vbg-tint")).toBe(null)
})

test("içerik videonun üstünde tıklanır; durdur düğmesi kapanınca gider", async () => {
  const s = renderTest(() => <VideoBackgroundLab />)
  await s.click("Beğen (0)")
  expect(s.find("Beğen (1)")).not.toBe(null)
  await s.click("Durdur düğmesi")
  expect(s.get(".m-vbg-toggle")).toBe(null)
})
