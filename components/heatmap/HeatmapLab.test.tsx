import { test, expect, renderTest } from "march/testing"
import { HeatmapLab } from "./HeatmapLab.tsx"

// HeatmapLab'in testleri: kaydedince Testler sekmesinde çalışır
test("beş gün × dört saat: yirmi hücre, başlık ve açıklama", () => {
  const s = renderTest(() => <HeatmapLab />)
  const grid = s.get(".lab-grid")!
  expect(grid.querySelectorAll(".m-heat-cell").length).toBe(20)
  expect(grid.querySelector("svg title")!.textContent).toBe("Toplantı odası")
  expect(grid.querySelector("svg desc")!.textContent).toBe("Gün ve saate göre oda kullanımı")
})

test("bir hücreye tıklamak onu seçer", async () => {
  const s = renderTest(() => <HeatmapLab />)
  s.get(".lab-grid .m-heat-cell")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).not.toBe("Seçilen: —")
})

test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <HeatmapLab />)
  await s.click(".lab-empty")
  expect(s.sees("Kayıt yok")).toBe(true)
})

test("takvim dört haftayı çizer", () => {
  const s = renderTest(() => <HeatmapLab />)
  expect(s.get(".lab-cal")!.querySelectorAll(".m-heat-cell").length).toBeGreaterThan(20)
})
