import { test, expect, renderTest } from "march/testing"
import { BottomRightControlsLab } from "./BottomRightControlsLab.tsx"

// BottomRightControlsLab'in testleri: kaydedince Testler sekmesinde çalışır
test("köşe kendi adıyla çizilir", () => {
  const s = renderTest(() => <BottomRightControlsLab />)
  expect(s.get(".lab-corner")?.getAttribute("aria-label")).toBe("Sayfa denetimleri")
})

test("eklenen denetim köşeye girer, off() çıkarır", async () => {
  const s = renderTest(() => <BottomRightControlsLab />)
  await s.click("Köşeye ekle")
  await s.click("Köşeye ekle")
  // the bottom-end corner is one for the page: it may sit outside the test's box
  const corner = () => document.querySelector(".m-corner-bottom-end, .lab-corner")?.textContent ?? ""
  expect(s.get(".lab-count")?.textContent).toBe("2 denetim")
  expect(document.body.textContent).toContain("Denetim 2")
  await s.click("Hepsini çıkar")
  expect(s.get(".lab-count")?.textContent).toBe("0 denetim")
  expect(corner()).not.toContain("Denetim 1")
})
