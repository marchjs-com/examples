import { test, expect, renderTest } from "march/testing"
import { TooltipLab } from "./TooltipLab.tsx"

// TooltipLab'in testleri: kaydedince Testler sekmesinde çalışır
test("odakta ipucu açılır ve hedefe aria-describedby ile bağlanır", async () => {
  const s = renderTest(() => <TooltipLab />)
  s.get(".m-tip-anchor")!.dispatchEvent(new Event("focusin", { bubbles: true }))
  await s.flush(2)
  expect(s.get(".lab-target")?.hasAttribute("aria-describedby")).toBe(true)
})

test("disabled iken ipucu açılmaz", async () => {
  const s = renderTest(() => <TooltipLab />)
  await s.click("İpucunu kapat")
  s.get(".m-tip-anchor")!.dispatchEvent(new Event("focusin", { bubbles: true }))
  await s.flush(2)
  expect(s.get(".lab-target")?.hasAttribute("aria-describedby")).toBe(false)
})
