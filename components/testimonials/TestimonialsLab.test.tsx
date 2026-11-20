import { test, expect, renderTest } from "march/testing"
import { TestimonialsLab } from "./TestimonialsLab.tsx"

// TestimonialsLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ızgarada yedi kart, iki sütun; yıldızlar kendi adıyla", () => {
  const s = renderTest(() => <TestimonialsLab />)
  expect(s.all(".lab-tm figure").length).toBe(7)
  expect(s.get(".lab-tm .m-tm-list")?.classList.contains("m-tm-cols-2")).toBe(true)
  expect(s.get('.lab-tm [aria-label="5 üzerinden 4"]')).not.toBe(null)
})

test("duvarda 'Hepsini göster' açar, 'Daralt' kapatır", async () => {
  const s = renderTest(() => <TestimonialsLab />)
  await s.click("wall")
  await s.click("Hepsini göster")
  expect(s.find("Daralt")).not.toBe(null)
  expect(s.get(".lab-tm .m-tm-list")?.classList.contains("is-closed")).toBe(false)
})

test("yıldız, avatar ve tırnaklar anahtarlarla kapanır", async () => {
  const s = renderTest(() => <TestimonialsLab />)
  await s.click("Yıldızlar")
  await s.click("Avatarlar")
  await s.click("Tırnaklar")
  expect(s.get(".lab-tm .m-tm-rating")).toBe(null)
  expect(s.get(".lab-tm .m-avatar")).toBe(null)
  expect(s.get(".lab-tm")?.classList.contains("m-tm-plain")).toBe(true)
})

test("kaydırmalı düzen kendi adıyla bir carousel", async () => {
  const s = renderTest(() => <TestimonialsLab />)
  await s.click("slider")
  expect(s.get('.lab-tm [aria-label="Yorumlar"]')).not.toBe(null)
})
