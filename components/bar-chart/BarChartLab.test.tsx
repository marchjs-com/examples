import { test, expect, renderTest } from "march/testing"
import { BarChartLab } from "./BarChartLab.tsx"

// BarChartLab'in testleri: kaydedince Testler sekmesinde çalışır
test("altı ay iki seri: on iki çubuk, başlık ve açıklama", () => {
  const s = renderTest(() => <BarChartLab />)
  const chart = s.get(".lab-bars")!
  expect(chart.querySelectorAll(".m-chart-bar").length).toBe(12)
  expect(chart.querySelector("svg title")!.textContent).toBe("Üye artışı")
  expect(chart.querySelector("svg desc")!.textContent).toBe("Ay ay yeni ve eski üyeler")
})

test("bir çubuğa tıklamak onu seçer", async () => {
  const s = renderTest(() => <BarChartLab />)
  s.get(".lab-bars .m-chart-bar")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Oca")
})

test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <BarChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Henüz veri yok")).toBe(true)
})

test("yığılmış yatay grafik de on iki çubuk çizer", () => {
  const s = renderTest(() => <BarChartLab />)
  expect(s.get(".lab-stack")!.querySelectorAll(".m-chart-bar").length).toBe(12)
})
