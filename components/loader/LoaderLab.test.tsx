import { test, expect, renderTest } from "march/testing"
import { LoaderLab } from "./LoaderLab.tsx"

// LoaderLab'in testleri: kaydedince Testler sekmesinde çalışır
test("yükleyici role=status, metin görünür", () => {
  const s = renderTest(() => <LoaderLab />)
  const l = s.get(".lab-text")
  expect(l?.getAttribute("role")).toBe("status")
  expect(l?.querySelector(".m-loader-text")?.textContent).toBe("Panolar hazırlanıyor…")
})

test("text yoksa label yalnız ekran okuyucuya; fade={false} hemen görünür", () => {
  const s = renderTest(() => <LoaderLab />)
  const l = s.get(".lab-label")
  expect(l?.querySelector(".m-sr-only")?.textContent).toBe("Kullanıcılar açılıyor")
  expect(l?.classList.contains("is-still")).toBe(true)
})

test("spinner={false} halkayı kaldırır, overlay perde olur", async () => {
  const s = renderTest(() => <LoaderLab />)
  await s.flush()
  expect(s.get(".lab-bare")?.querySelector(".m-loading")).toBe(null)
  expect(s.get(".lab-text")?.querySelector(".m-loading")).not.toBe(null)
  expect(s.get(".lab-overlay")?.classList.contains("m-loader-overlay")).toBe(true)
})

test("text erişimcisi düğmeyle güncellenir", async () => {
  const s = renderTest(() => <LoaderLab />)
  await s.click("İlerlet")
  expect(s.get(".lab-pct .m-loader-text")?.textContent).toBe("%40 tamam")
})
