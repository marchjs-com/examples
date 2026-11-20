import { test, expect, renderTest } from "march/testing"
import { SparklineLab } from "./SparklineLab.tsx"

// SparklineLab'in testleri: kaydedince Testler sekmesinde çalışır
test("çizgi ve alan çizilir; ekran okuyucu özeti biçimli", () => {
  const s = renderTest(() => <SparklineLab />)
  const svg = s.get(".lab-nums svg")!
  expect(svg.querySelector(".m-chart-area")).toBeTruthy()
  expect(svg.getAttribute("aria-label")!).toContain("Satış")
  expect(svg.getAttribute("aria-label")!).toContain("adet")
})

test("değer eklenince özet güncellenir", async () => {
  const s = renderTest(() => <SparklineLab />)
  const before = s.get(".lab-nums svg")!.getAttribute("aria-label")
  await s.click(".lab-add")
  expect(s.get(".lab-nums svg")!.getAttribute("aria-label")).not.toBe(before)
})

test("veri boşalınca boş metni söylenir", async () => {
  const s = renderTest(() => <SparklineLab />)
  await s.click(".lab-empty")
  expect(s.get(".lab-nums svg")!.getAttribute("aria-label")).toBe("Satış: Satış yok")
})

test("dot={false}: son nokta gizli; boyut yazılır", () => {
  const s = renderTest(() => <SparklineLab />)
  const obj = s.get(".lab-obj svg")!
  expect(obj.querySelector(".m-chart-marker")!.getAttribute("visibility")).toBe("hidden")
  expect(obj.getAttribute("width")).toBe("120")
})
