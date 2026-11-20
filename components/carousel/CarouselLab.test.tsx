import { test, expect, renderTest } from "march/testing"
import { CarouselLab } from "./CarouselLab.tsx"

// CarouselLab'in testleri: kaydedince Testler sekmesinde çalışır
test("carousel kendi adıyla; kendi düğme adları (labels)", async () => {
  const s = renderTest(() => <CarouselLab />)
  await s.flush()
  const main = s.get(".lab-main")
  expect(main?.getAttribute("aria-roledescription")).toBe("carousel")
  expect(main?.getAttribute("aria-label")).toBe("Renkli kartlar")
  expect(s.find("Geri")).not.toBe(null)
  expect(s.find("İleri")).not.toBe(null)
})

test("perView düğmeyle değişir", async () => {
  const s = renderTest(() => <CarouselLab />)
  expect(s.get(".lab-main")?.classList.contains("m-carousel-2")).toBe(true)
  await s.click("4 görünen")
  await s.flush()
  expect(s.get(".lab-main")?.classList.contains("m-carousel-4")).toBe(true)
})

test("arrows={false} dots={false}: düğme yok; metin slaytları kutu olur; smooth={false} anında", async () => {
  const s = renderTest(() => <CarouselLab />)
  await s.flush()
  const bare = s.get(".lab-bare")
  expect(bare?.querySelectorAll(".m-carousel-btn").length).toBe(0)
  expect(bare?.querySelector(".m-carousel-dots")).toBe(null)
  expect(bare?.querySelectorAll(".m-carousel-text").length).toBe(4)
  expect(bare?.classList.contains("is-instant")).toBe(true)
})

test("kaydırma seçimi carousel'e geçer", async () => {
  const s = renderTest(() => <CarouselLab />)
  await s.click("Fareyle de")
  await s.flush(2)
  expect(s.get(".lab-main")?.classList.contains("is-swipe")).toBe(true)
  await s.click("Kapalı")
  await s.flush(2)
  expect(s.get(".lab-main")?.classList.contains("is-noswipe")).toBe(true)
})
