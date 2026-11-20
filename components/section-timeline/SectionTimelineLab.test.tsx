import { test, expect, renderTest } from "march/testing"
import { SectionTimelineLab } from "./SectionTimelineLab.tsx"

// SectionTimelineLab'in testleri: kaydedince Testler sekmesinde çalışır
test("labels.group nav'ın adı; class ve dikey yön kökte", () => {
  const s = renderTest(() => <SectionTimelineLab />)
  const nav = s.find("Lab bölümleri")
  expect(nav?.tagName).toBe("NAV")
  expect(nav?.classList.contains("lab-timeline")).toBe(true)
  expect(nav?.classList.contains("m-stl-vertical")).toBe(true)
})

test("slug verilen nokta bir bağlantı, verilmeyen bir düğme; label adın içeriğini değiştirir", () => {
  const s = renderTest(() => <SectionTimelineLab />)
  expect(s.find("Giriş")?.tagName).toBe("A")
  expect(s.find("Giriş")?.getAttribute("href")).toBe("#lab-0")
  expect(s.find("Kurulum")?.tagName).toBe("BUTTON")
  expect(s.find("3. Sinyaller")).not.toBe(null)
})

test("Bir noktaya basınca o bölüm okunan olur: onChange ve aria-current", async () => {
  const s = renderTest(() => <SectionTimelineLab />)
  const mark = await s.click("Temalar")
  expect(s.sees("Okunan: Temalar (onChange: 4)")).toBe(true)
  expect(mark.getAttribute("aria-current")).toBe("location")
  expect(mark.getAttribute("tabindex")).toBe("0")
})
