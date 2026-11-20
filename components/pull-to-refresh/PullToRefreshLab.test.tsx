import { test, expect, renderTest } from "march/testing"
import { PullToRefreshLab } from "./PullToRefreshLab.tsx"

// PullToRefreshLab'in testleri: kaydedince Testler sekmesinde çalışır
test("klavye düğmesi kendi metniyle yenilemeyi çalıştırır", async () => {
  const s = renderTest(() => <PullToRefreshLab />)
  await s.click("Şimdi yenile")
  await s.wait(() => s.sees("yenileme: 1"), { timeout: 2000 })
  expect(s.sees("yenileme: 1")).toBe(true)
})

test("yenilenirken kap aria-busy olur", async () => {
  const s = renderTest(() => <PullToRefreshLab />)
  await s.click("Şimdi yenile")
  expect(s.get(".lab-ptr")?.getAttribute("aria-busy")).toBe("true")
})

test("kapalıyken klavye düğmesi devre dışı", async () => {
  const s = renderTest(() => <PullToRefreshLab />)
  await s.click("Yenilemeyi kapat")
  await s.flush()
  expect((s.find("Şimdi yenile")?.closest("button") as HTMLButtonElement | null)?.disabled).toBe(true)
})

test("içerik kaydırma alanında çizilir", () => {
  const s = renderTest(() => <PullToRefreshLab />)
  expect(s.sees("Öğe 12")).toBe(true)
})
