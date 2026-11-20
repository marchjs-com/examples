import { test, expect, renderTest } from "march/testing"
import { StoryRingLab } from "./StoryRingLab.tsx"

// StoryRingLab'in testleri: kaydedince Testler sekmesinde çalışır
test("onClick ile halka bir düğme olur, ariaLabel adını verir", async () => {
  const s = renderTest(() => <StoryRingLab />)
  await s.click("Elif'in hikâyesi")
  expect(s.get(".lab-clicks")?.textContent).toBe("1")
})

test("onClick yoksa resim rolünde", () => {
  const s = renderTest(() => <StoryRingLab />)
  expect(s.get(".lab-img")?.getAttribute("role")).toBe("img")
})

test("add rozeti addIcon ile çizilir", () => {
  const s = renderTest(() => <StoryRingLab />)
  expect(s.get(".lab-img .m-sring-add svg")).not.toBe(null)
})
