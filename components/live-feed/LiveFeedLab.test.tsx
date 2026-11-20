import { test, expect, renderTest } from "march/testing"
import { LiveFeedLab } from "./LiveFeedLab.tsx"

// LiveFeedLab'in testleri: kaydedince Testler sekmesinde çalışır
const rows = (s: { all(sel: string): Element[] }) => s.all(".lab-lf .m-lf-item:not(.is-leaving)")

test("akış adlandırılmış bir bölüm; en yenisi üstte", () => {
  const s = renderTest(() => <LiveFeedLab />)
  expect(s.get(".lab-lf")?.getAttribute("aria-label")).toBe("Kulüp akışı")
  expect(rows(s).length).toBe(2)
  expect(rows(s)[0]!.textContent).toContain("Burak koşuya katıldı")
})

test("yeni olay en üste girer", async () => {
  const s = renderTest(() => <LiveFeedLab />)
  await s.click("Olay ekle")
  expect(rows(s).length).toBe(3)
  expect(rows(s)[0]!.textContent).toContain("Yeni olay 3")
})

test("durdur düğmesi kendi metinleriyle açılıp kapanır", async () => {
  const s = renderTest(() => <LiveFeedLab />)
  const b = s.get(".lab-lf .m-lf-pause")!
  expect(b.textContent).toContain("Canlı · durdur")
  await s.click(b)
  expect(s.get(".lab-lf .m-lf-pause")?.textContent).toContain("Durdu · sürdür")
})

test("duvar görünümü ve kendi satır çizimi", async () => {
  const s = renderTest(() => <LiveFeedLab />)
  await s.click("duvar")
  expect(s.get(".lab-lf")?.classList.contains("m-lf-wall")).toBe(true)
  await s.click("Kendi çizimim")
  expect(s.all(".lab-lf .lab-own").length).toBe(2)
})
