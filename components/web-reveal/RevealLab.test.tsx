import { test, expect, renderTest } from "march/testing"
import { RevealLab } from "./RevealLab.tsx"

// RevealLab'in testleri: kaydedince Testler sekmesinde çalışır
test("sarmalayıcı bir section: sınıfı ve adı yerinde", () => {
  const s = renderTest(() => <RevealLab />)
  const box = s.get("section.lab-reveal")
  expect(box).not.toBe(null)
  expect(box?.getAttribute("aria-label")).toBe("Açılan kartlar")
  expect(box?.classList.contains("m-reveal")).toBeTruthy()
})

test("seçiciye uyan kartlar sıraya girer (m-reveal-item)", () => {
  const s = renderTest(() => <RevealLab />)
  expect(s.all(".lab-card.m-reveal-item").length).toBe(3)
})

test("Kart ekle: dördüncü kart gelir", async () => {
  const s = renderTest(() => <RevealLab />)
  await s.click("Kart ekle")
  expect(s.all(".lab-card").length).toBe(4)
})

test("efekt yok: içerik hemen görünür, bekleyen bir şey kalmaz", async () => {
  const s = renderTest(() => <RevealLab />)
  await s.click("yok")
  const box = s.get(".lab-reveal")
  expect(box?.classList.contains("is-revealed")).toBeTruthy()
  expect(box?.classList.contains("is-pending")).toBeFalsy()
})
