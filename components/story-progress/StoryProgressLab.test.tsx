import { test, expect, renderTest } from "march/testing"
import { StoryProgressLab } from "./StoryProgressLab.tsx"

// StoryProgressLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ince bölümlü çubuk, class köke eklenir", () => {
  const s = renderTest(() => <StoryProgressLab />)
  expect(s.get(".lab-sp")?.classList.contains("m-story-progress")).toBe(true)
})

test("label şimdiki hikâyeyi okur", () => {
  const s = renderTest(() => <StoryProgressLab />)
  expect(s.get(".lab-sp")?.outerHTML).toContain("Hikâye 3 / 4")
})
