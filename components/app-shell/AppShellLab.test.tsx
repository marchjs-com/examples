import { test, expect, renderTest } from "march/testing"
import { AppShellLab } from "./AppShellLab.tsx"

// AppShellLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bölgeler ve içerik çizilir", () => {
  const s = renderTest(() => <AppShellLab />)
  for (const t of ["Duyuru", "Üst bilgi", "Gezinme", "Yan alan", "Alt bilgi", "Sayfa"]) expect(s.sees(t)).toBe(true)
})

test("İçeriğe geç bağlantısı ana alana gider", () => {
  const s = renderTest(() => <AppShellLab />)
  expect(s.get("#lab-shell-main")).not.toBe(null)
  expect(s.get("a[href='#lab-shell-main']")).not.toBe(null)
})
