import { test, expect, renderTest } from "march/testing"
import { StatsBandLab } from "./StatsBandLab.tsx"

// StatsBandLab'in testleri: kaydedince Testler sekmesinde çalışır
test("dört rakam bir tanım listesinde; çizgili görünüm", () => {
  const s = renderTest(() => <StatsBandLab />)
  expect(s.get("dl.lab-stats")?.classList.contains("m-stats-divided")).toBe(true)
  expect(s.all(".lab-stats .m-stats-item").length).toBe(4)
  expect(s.sees("her gün artıyor")).toBe(true)
})

test("sayaçsız modda düz sayı, ön ve son ekleriyle", () => {
  const s = renderTest(() => <StatsBandLab />)
  const plain = s.all(".lab-stats .m-stats-plain")
  expect(plain.length).toBe(4)
  expect(plain[0]?.textContent).toBe("42")
  expect(plain[2]?.textContent).toContain("%")
  expect(plain[3]?.textContent).toContain("€")
})

test("üye sayısı bir işlev: düğmeyle artar", async () => {
  const s = renderTest(() => <StatsBandLab />)
  await s.click("+1 üye")
  expect(s.get(".lab-stats .m-stats-plain")?.textContent).toBe("43")
})

test("kartlar görünümü ve sayaç modu seçilir", async () => {
  const s = renderTest(() => <StatsBandLab />)
  await s.click("cards")
  await s.click("count")
  expect(s.get("dl.lab-stats")?.classList.contains("m-stats-cards")).toBe(true)
  expect(s.get(".lab-stats .m-stats-plain")).toBe(null)
  expect(s.get(".lab-stats .m-counter")).not.toBe(null)
})
