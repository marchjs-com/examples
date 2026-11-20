import { test, expect, renderTest } from "march/testing"
import { SectionLabelLab } from "./SectionLabelLab.tsx"

// SectionLabelLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Görev ekle'ye basınca sayı canlı artar", async () => {
  const s = renderTest(() => <SectionLabelLab />)
  expect(s.get(".lab-tasks .m-section-label-count")?.textContent).toBe("3")
  await s.click("Görev ekle")
  expect(s.get(".lab-tasks .m-section-label-count")?.textContent).toBe("4")
})

test("as=\"h3\" kök öğeyi değiştirir; id köke gider", () => {
  const s = renderTest(() => <SectionLabelLab />)
  const root = s.get(".lab-reports")
  expect(root?.tagName).toBe("H3")
  expect(root?.getAttribute("id")).toBe("raporlar")
  expect(s.find("Bildirimler")?.closest("legend")).not.toBe(null)
})

test("upper={false}, size=\"md\" ve rule sınıf ve çizgi olarak görünür", () => {
  const s = renderTest(() => <SectionLabelLab />)
  const root = s.get(".lab-reports")
  expect(root?.classList.contains("is-plain")).toBe(true)
  expect(root?.classList.contains("m-section-label-md")).toBe(true)
  expect(s.get(".lab-reports .m-section-label-rule")?.getAttribute("aria-hidden")).toBe("true")
})

test("label canlı: Başlığı değiştir'e basınca metin değişir", async () => {
  const s = renderTest(() => <SectionLabelLab />)
  await s.click("Başlığı değiştir")
  expect(s.get(".lab-live .m-section-label-text")?.textContent).toBe("Yapılacaklar")
})
