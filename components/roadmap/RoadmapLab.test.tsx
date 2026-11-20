import { test, expect, renderTest } from "march/testing"
import { RoadmapLab } from "./RoadmapLab.tsx"

// RoadmapLab'in testleri: kaydedince Testler sekmesinde çalışır
test("dört girdi; durum rozetleri kendi metinleriyle", () => {
  const s = renderTest(() => <RoadmapLab />)
  expect(s.all(".lab-rm .m-rm-tl > li").length).toBe(4)
  const badges = s.all(".lab-rm .m-rm-badge").map((b: Element) => b.textContent)
  expect(badges).toEqual(["Yayında", "Yayında", "Yapılıyor", "Sırada"])
})

test("kaydırma kapalıyken çizgi dolu; çizgi kapanınca gider", async () => {
  const s = renderTest(() => <RoadmapLab />)
  expect(s.get(".lab-rm")?.classList.contains("is-scroll")).toBe(false)
  expect(s.get(".lab-rm .m-rm-rail")).not.toBe(null)
  await s.click("Çizgi")
  expect(s.get(".lab-rm .m-rm-rail")).toBe(null)
})

test("kendi rozetim: durum ve metin bir arada", async () => {
  const s = renderTest(() => <RoadmapLab />)
  await s.click("kendi rozetim")
  expect(s.get(".lab-rm .m-rm-badge")).toBe(null)
  expect(s.get(".lab-rm .lab-badge")?.textContent).toContain("Yayında")
})

test("rozetsiz: başlıklar yalın", async () => {
  const s = renderTest(() => <RoadmapLab />)
  await s.click("rozetsiz")
  expect(s.get(".lab-rm .m-rm-badge")).toBe(null)
  expect(s.get(".lab-rm .lab-badge")).toBe(null)
  expect(s.sees("Topluluk ödülleri")).toBe(true)
})
