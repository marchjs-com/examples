import { test, expect, renderTest } from "march/testing"
import { ThemeMenuLab } from "./ThemeMenuLab.tsx"

// ThemeMenuLab'in testleri: menüler açılır, bölümler özelliklere uyar; önizlemenin teması sayfanınkine dokunmaz
const last = (s: ReturnType<typeof renderTest>) => s.all(".m-theme-menu").pop()

test("sayfa menüsü: kendi başlık metinleri ve üç vurgu rengi", async () => {
  const s = renderTest(() => <ThemeMenuLab />)
  await s.click(".lab-page-menu")
  const p = last(s)
  expect(p?.querySelectorAll(".m-theme-menu-heading").length).toBe(2)
  expect(p?.textContent).toContain("Renk teması")
  expect(p?.textContent).toContain("Vurgu rengi")
  expect(p?.querySelectorAll(".m-accent-list [role=radio]").length).toBe(3)
})

test("yalnız vurgu menüsü: tema listesi, kipler ve başlıklar yok; düğmede ikon yok", async () => {
  const s = renderTest(() => <ThemeMenuLab />)
  expect(s.get(".lab-accent-menu svg")).toBe(null)
  await s.click(".lab-accent-menu")
  const p = last(s)
  expect(p?.querySelector(".m-theme-list")).toBe(null)
  expect(p?.querySelector(".m-theme-modes")).toBe(null)
  expect(p?.querySelector(".m-accent-list")).toBeTruthy()
})

test("önizleme menüsü: kartlar, ilk kart sayfanın teması; seçim yalnız önizlemeyi boyar", async () => {
  const s = renderTest(() => <ThemeMenuLab />)
  await s.click(".m-theme-menu-btn")
  const p = s.get(".lab-preview-panel")
  expect(p?.classList.contains("m-theme-menu-cards")).toBe(true)
  const cards = Array.from(p?.querySelectorAll(".m-theme-cards [role=radio]") ?? [])
  expect(cards[0]?.getAttribute("aria-checked")).toBe("true")
  const page = document.documentElement.getAttribute("data-m-theme")
  ;(cards[2] as HTMLElement).click()
  await s.flush()
  expect(s.sees("Önizleme: sayfanın teması")).toBe(false)
  expect(document.documentElement.getAttribute("data-m-theme")).toBe(page)
})
