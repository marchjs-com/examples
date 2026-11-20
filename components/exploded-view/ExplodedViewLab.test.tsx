import { test, expect, renderTest } from "march/testing"
import { ExplodedViewLab } from "./ExplodedViewLab.tsx"

// ExplodedViewLab'in testleri: kaydedince Testler sekmesinde çalışır
test("içerik çizilir", () => {
  const s = renderTest(() => <ExplodedViewLab startOpen={false} />)
  expect(s.sees("Kaydet")).toBe(true)
  expect(s.sees("Elif Arslan")).toBe(true)
})

test("Ayır düğmesi open'ı değiştirir", async () => {
  const s = renderTest(() => <ExplodedViewLab startOpen={false} />)
  await s.click(".lab-flip")
  expect(s.get(".lab-state")?.textContent).toContain("ayrık")
})

test("target ve parts: hedef düğme katmanlarına, avatar ve rozet plakalara ayrılır", async () => {
  const s = renderTest(() => <ExplodedViewLab startOpen={false} />)
  await s.click(".lab-flip")
  expect(s.get(".lab-ev .lab-save")?.getAttribute("data-m-xv-id")).toBe("content")
  expect(s.get(".lab-parts .m-avatar")?.getAttribute("data-m-xv-id")).toBe("avatar")
  // id verilmeyen parçanın kimliği label
  expect(s.get(".lab-parts .m-badge")?.getAttribute("data-m-xv-id")).toBe("Rozet")
})

test("ayrıkken bir plakaya basınca onPick seçilen id'yi verir", async () => {
  const s = renderTest(() => <ExplodedViewLab startOpen={false} />)
  await s.click(".lab-flip")
  await s.click(".lab-parts .m-avatar")
  expect(s.get(".lab-state")?.textContent).toContain("seçilen: avatar")
})
