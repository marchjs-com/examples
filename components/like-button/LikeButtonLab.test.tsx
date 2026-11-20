import { test, expect, renderTest } from "march/testing"
import { LikeButtonLab } from "./LikeButtonLab.tsx"

// LikeButtonLab'in testleri: kaydedince Testler sekmesinde çalışır
test("basınca beğenilir ve sayaç artar", async () => {
  const s = renderTest(() => <LikeButtonLab />)
  const b = s.get(".lab-like")!
  expect(b.getAttribute("aria-pressed")).toBe("false")
  await s.click(b)
  expect(s.get(".lab-like")?.getAttribute("aria-pressed")).toBe("true")
  expect(s.get(".lab-n")?.textContent).toBe("2000")
})

test("işlev ikonu duruma göre çizer", () => {
  const s = renderTest(() => <LikeButtonLab />)
  expect(s.get(".lab-own")?.textContent).toContain("★")
})
