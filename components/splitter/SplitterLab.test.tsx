import { test, expect, renderTest } from "march/testing"
import { SplitterLab } from "./SplitterLab.tsx"

// SplitterLab'in testleri: kaydedince Testler sekmesinde çalışır
test("tutamaç bir ayırıcı: adı ve değeri var", () => {
  const s = renderTest(() => <SplitterLab />)
  const sep = s.get(".lab-live [role=separator]")
  expect(sep?.getAttribute("aria-label")).toBe("Denetimli pay")
  expect(sep?.getAttribute("aria-valuenow")).toBe("30")
})

test("value denetimli: düğme payı değiştirir", async () => {
  const s = renderTest(() => <SplitterLab />)
  await s.click("Payı %70 yap")
  expect(s.get(".lab-share")?.textContent).toBe("%70")
})

test("handle={false} sürüklenmeyen düz bir ayraç bırakır", () => {
  const s = renderTest(() => <SplitterLab />)
  expect(s.get(".lab-fixed .m-split-handle")?.classList.contains("is-fixed")).toBe(true)
  expect(s.get(".lab-fixed [role=separator]")?.hasAttribute("aria-valuenow")).toBe(false)
})
