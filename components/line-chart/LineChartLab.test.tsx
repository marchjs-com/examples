import { test, expect, renderTest } from "march/testing"
import { LineChartLab } from "./LineChartLab.tsx"

// LineChartLab'in testleri: kaydedince Testler sekmesinde çalışır
test("iki seri iki çizgi; başlık ve açıklama SVG'de", () => {
  const s = renderTest(() => <LineChartLab />)
  const chart = s.get(".lab-line")!
  expect(chart.querySelectorAll(".m-chart-line").length).toBe(2)
  expect(chart.querySelector("svg title")!.textContent).toBe("Sıcaklık")
  expect(chart.querySelector("svg desc")!.textContent).toBe("İç ve dış sıcaklık, saat saat")
})

test("veri tablosu 24 saati taşır, veri değişince güncellenir", async () => {
  const s = renderTest(() => <LineChartLab />)
  const chart = s.get(".lab-line")!
  expect(chart.querySelectorAll("table tbody tr").length).toBe(24)
  const before = chart.querySelector("table tbody tr")!.textContent
  await s.click(".lab-shift")
  expect(chart.querySelector("table tbody tr")!.textContent).not.toBe(before)
})

test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <LineChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Ölçüm yok")).toBe(true)
})

test("yığılmış alan grafiği iki alan çizer, açıklaması yok", () => {
  const s = renderTest(() => <LineChartLab />)
  const area = s.get(".lab-area")!
  expect(area.querySelectorAll(".m-chart-area").length).toBe(2)
  const legend = area.querySelector(".m-chart-legend")
  expect(legend == null || legend.hasAttribute("hidden")).toBe(true)
})
