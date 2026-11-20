import { test, expect, renderTest } from "march/testing"
import { StatLab } from "./StatLab.tsx"

// StatLab'in testleri: kaydedince Testler sekmesinde çalışır
test("değer biçimlenir; önceki değere göre artış iyi (yeşil)", () => {
  const s = renderTest(() => <StatLab />)
  const main = s.get(".lab-main")!
  expect(main.querySelector(".m-stat-value")!.textContent).toBe("120 puan")
  expect(main.querySelector(".m-stat-delta")!.className).toContain("m-stat-good")
  expect(main.querySelector(".m-stat-delta-value")!.textContent).toContain("20")
})

test("azalınca değişim düşüşe ve kötüye döner", async () => {
  const s = renderTest(() => <StatLab />)
  await s.click(".lab-down")
  const delta = s.get(".lab-main .m-stat-delta")!
  expect(delta.className).toContain("m-stat-down")
  expect(delta.className).toContain("m-stat-bad")
})

test("değer yoksa boş metni yazar; eğilim çizgisi var", async () => {
  const s = renderTest(() => <StatLab />)
  expect(s.get(".lab-main .m-sparkline")).toBeTruthy()
  await s.click(".lab-none")
  expect(s.get(".lab-main .m-stat-value")!.textContent).toBe("ölçülmedi")
})

test("invert: maliyetteki artış kötüdür", () => {
  const s = renderTest(() => <StatLab />)
  expect(s.get(".lab-cost .m-stat-delta")!.className).toContain("m-stat-bad")
})
