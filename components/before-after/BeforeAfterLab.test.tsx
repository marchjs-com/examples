import { test, expect, renderTest } from "march/testing"
import { BeforeAfterLab } from "./BeforeAfterLab.tsx"

// BeforeAfterLab'in testleri: kaydedince Testler sekmesinde çalışır
test("tutamaç kendi adı ve değer metniyle bir slider", () => {
  const s = renderTest(() => <BeforeAfterLab />)
  const h = s.get('.lab-ba [role="slider"]')!
  expect(h.getAttribute("aria-label")).toBe("Gece ve gündüz")
  expect(h.getAttribute("aria-valuenow")).toBe("30")
  expect(h.getAttribute("aria-valuetext")).toBe("%30 gece")
})

test("ok tuşu beş adım kaydırır, onChange konumu yazar", async () => {
  const s = renderTest(() => <BeforeAfterLab />)
  await s.press("ArrowRight", s.get('.lab-ba [role="slider"]')!)
  expect(s.get(".lab-pos")?.textContent).toBe("Konum: 35")
  await s.click("Ortala")
  expect(s.get('.lab-ba [role="slider"]')?.getAttribute("aria-valuenow")).toBe("50")
})

test("dikey yön ve yalnız çizgi tutamak", async () => {
  const s = renderTest(() => <BeforeAfterLab />)
  await s.click("dikey")
  expect(s.get(".lab-ba")?.classList.contains("m-ba-vertical")).toBe(true)
  await s.click("çizgi")
  expect(s.container.querySelector(".lab-ba .m-ba-grip")).toBe(null)
})

test("iki köşe etiketi ve iki katman", () => {
  const s = renderTest(() => <BeforeAfterLab />)
  expect(s.all(".lab-ba .m-ba-label").length).toBe(2)
  expect(s.get(".lab-ba .m-ba-before")?.textContent).toContain("Gece")
  expect(s.get(".lab-ba .m-ba-after")?.textContent).toContain("Gündüz")
})
