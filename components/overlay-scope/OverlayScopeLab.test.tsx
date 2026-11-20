import { test, expect, renderTest } from "march/testing"
import { OverlayScopeLab } from "./OverlayScopeLab.tsx"

// OverlayScopeLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kutu bir katman kapsamı", () => {
  const s = renderTest(() => <OverlayScopeLab />)
  expect(s.get(".lab-scope")?.classList.contains("m-overlay-scope")).toBe(true)
})

test("class canlı", async () => {
  const s = renderTest(() => <OverlayScopeLab />)
  await s.click("Sınıfı değiştir")
  expect(s.get(".lab-scope")?.classList.contains("lab-dark")).toBe(true)
})

test("içinde açılan çekmece kutunun içinde", async () => {
  const s = renderTest(() => <OverlayScopeLab />)
  await s.click("Kutuda aç")
  await s.flush(2)
  expect(s.get(".lab-scope")?.textContent).toContain("Kutudaki çekmece")
})
