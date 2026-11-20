import { test, expect, renderTest } from "march/testing"
import { ToastLab } from "./ToastLab.tsx"

// ToastLab'in testleri: kaydedince Testler sekmesinde çalışır
test("toast() bir bildirim ekler, clear() hepsini kaldırır", async () => {
  const s = renderTest(() => <ToastLab />)
  await s.click("Hepsini temizle")
  await s.click("Bilgi")
  await s.click("Başarı")
  expect(s.get(".lab-count")?.textContent).toBe("2 bildirim")
  await s.click("Hepsini temizle")
  expect(s.get(".lab-count")?.textContent).toBe("0 bildirim")
})

test("ToastHost bildirimi metniyle çizer", async () => {
  const s = renderTest(() => <ToastLab />)
  await s.click("Hepsini temizle")
  await s.click("Uyarı")
  expect(s.get(".lab-host")?.textContent).toContain("Dikkat")
})
