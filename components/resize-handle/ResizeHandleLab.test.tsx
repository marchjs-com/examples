import { test, expect, renderTest } from "march/testing"
import { ResizeHandleLab } from "./ResizeHandleLab.tsx"

// ResizeHandleLab'in testleri: kaydedince Testler sekmesinde çalışır
test("value + set ile tam ayırıcı", () => {
  const s = renderTest(() => <ResizeHandleLab />)
  const h = s.get(".lab-full")
  expect(h?.getAttribute("role")).toBe("separator")
  expect(h?.getAttribute("aria-label")).toBe("Genişlik")
})

test("ok tuşu bir adım büyütür", async () => {
  const s = renderTest(() => <ResizeHandleLab />)
  const h = s.get(".lab-full") as HTMLElement
  await s.focus(h)
  await s.press("ArrowRight", h)
  expect(s.get(".lab-w")?.textContent).toBe("210 px")
})

test("köşede ok tuşu onStep'i çağırır", async () => {
  const s = renderTest(() => <ResizeHandleLab />)
  await s.press("ArrowDown", s.get(".lab-corner"))
  expect(s.get(".lab-steps")?.textContent).toBe("1 adım")
})
