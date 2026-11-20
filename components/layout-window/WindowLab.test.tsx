import { test, expect, renderTest } from "march/testing"
import { WindowLab } from "./WindowLab.tsx"

// WindowLab'in testleri: kaydedince Testler sekmesinde çalışır
test("pencere başlığını ve içeriğini çizer", () => {
  const s = renderTest(() => <WindowLab />)
  expect(s.sees("Rapor")).toBe(true)
  expect(s.get(".lab-state")?.textContent).toBe("Durum: normal")
})

test("labels kapat düğmesinin adını verir", () => {
  const s = renderTest(() => <WindowLab />)
  expect(s.find("Raporu kapat")).not.toBe(null)
})

test("closable={false} kapat düğmesini kaldırır", () => {
  const s = renderTest(() => <WindowLab />)
  expect(s.get(".lab-fixed")?.textContent).toContain("Sabit")
  expect(s.all(".lab-fixed button").length).toBe(0)
})

test("kapat düğmesi onClose'u çağırır, open kapanır ve düğmeyle yeniden açılır", async () => {
  const s = renderTest(() => <WindowLab />)
  await s.click("Raporu kapat")
  expect(s.get(".lab-closes")?.textContent).toBe("Kapatma: 1")
  // open={false}: pencere DOM'da kalır, gizlenir
  expect(s.get(".lab-win")?.hasAttribute("hidden")).toBe(true)
  await s.click("Raporu aç")
  expect(s.get(".lab-win")?.hasAttribute("hidden")).toBe(false)
})
