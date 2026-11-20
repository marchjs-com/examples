import { test, expect, renderTest } from "march/testing"
import { AvatarGroupLab } from "./AvatarGroupLab.tsx"

// AvatarGroupLab'in testleri: kaydedince Testler sekmesinde çalışır
test("max'tan fazlası +N balonunda", () => {
  const s = renderTest(() => <AvatarGroupLab />)
  expect(s.get(".lab-more")?.textContent).toContain("+3")
  expect(s.get(".lab-more")?.getAttribute("aria-label")).toBe("Ekip")
})

test("more={false} balonu kaldırır", () => {
  const s = renderTest(() => <AvatarGroupLab />)
  expect(s.get(".lab-nomore")?.textContent).not.toContain("+")
})
