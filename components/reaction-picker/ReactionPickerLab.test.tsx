import { test, expect, renderTest } from "march/testing"
import { ReactionPickerLab } from "./ReactionPickerLab.tsx"

// ReactionPickerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("seçili tepki aria-pressed, basınca onPick", async () => {
  const s = renderTest(() => <ReactionPickerLab />)
  expect(s.find("Tepki 👍")?.getAttribute("aria-pressed")).toBe("true")
  await s.click("Tepki 🔥")
  expect(s.get(".lab-sel")?.textContent).toContain("🔥")
})

test("+ düğmesi moreLabel adıyla onMore'u çağırır", async () => {
  const s = renderTest(() => <ReactionPickerLab />)
  await s.click("Daha çok")
  expect(s.get(".lab-sel")?.textContent).toContain("1")
})

test("grid düzeni panel olarak çizilir ve seçer", async () => {
  const s = renderTest(() => <ReactionPickerLab />)
  expect(s.get(".lab-grid")?.className).toContain("m-react-grid")
  await s.click("🥳")
  expect(s.get(".lab-sel")?.textContent).toContain("🥳")
})
