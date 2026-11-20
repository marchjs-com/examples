import { test, expect, renderTest } from "march/testing"
import { BadgeLab } from "./BadgeLab.tsx"

// BadgeLab'in testleri: kaydedince Testler sekmesinde çalışır
test("sayı 0'da gizli; basınca görünür ve okunan adı label'la yazılır", async () => {
  const s = renderTest(() => <BadgeLab />)
  expect(s.get(".lab-count")).toBe(null)
  await s.click("+1 ekle")
  expect(s.get(".lab-count")!.getAttribute("aria-label")).toBe("1 yeni")
})

test("max aşılınca N+, format kendi metnini yazar, showZero 0'ı gösterir", () => {
  const s = renderTest(() => <BadgeLab />)
  expect(s.sees("99+")).toBe(true)
  expect(s.sees("9+")).toBe(true)
  expect(s.sees("5 yeni")).toBe(true)
  expect(s.all(".m-badge-count").some((b: Element) => b.textContent === "0")).toBe(true)
})

test("pressed rozeti aç / kapa düğmesidir; ariaLabel adı verir", async () => {
  const s = renderTest(() => <BadgeLab />)
  const v2 = s.find("Sürüm iki filtresi")!
  expect(v2.tagName).toBe("BUTTON")
  expect(v2.getAttribute("aria-pressed")).toBe("false")
  await s.click(v2)
  expect(v2.getAttribute("aria-pressed")).toBe("true")
})

test("disabled rozet basılamaz", () => {
  const s = renderTest(() => <BadgeLab />)
  expect((s.find("kapalı") as HTMLButtonElement).disabled).toBe(true)
})
