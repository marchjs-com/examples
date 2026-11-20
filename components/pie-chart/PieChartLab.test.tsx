import { test, expect, renderTest } from "march/testing"
import { PieChartLab } from "./PieChartLab.tsx"

// PieChartLab'in testleri: kaydedince Testler sekmesinde çalışır
test("dört kalem dört dilim; ortada kendi yazısı", () => {
  const s = renderTest(() => <PieChartLab />)
  const pie = s.get(".lab-pie")!
  expect(pie.querySelectorAll(".m-chart-slice").length).toBe(4)
  expect(pie.querySelector(".m-chart-center")!.textContent).toBe("4 kalem")
})

test("bir dilime tıklamak onu payıyla seçer", async () => {
  const s = renderTest(() => <PieChartLab />)
  s.get(".lab-pie .m-chart-slice")!.dispatchEvent(new MouseEvent("click", { bubbles: true }))
  await s.flush()
  expect(s.get(".lab-picked")!.textContent).toContain("Kira")
})

test("veri boşalınca boş metni görünür", async () => {
  const s = renderTest(() => <PieChartLab />)
  await s.click(".lab-empty")
  expect(s.sees("Harcama yok")).toBe(true)
})

test("düz pastanın ortası yok", () => {
  const s = renderTest(() => <PieChartLab />)
  expect(s.get(".lab-plain .m-chart-center")).toBe(null)
})
