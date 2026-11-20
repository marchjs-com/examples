import { test, expect, renderTest } from "march/testing"
import { BranchingStoryLab } from "./BranchingStoryLab.tsx"

// BranchingStoryLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ilk pasaj, ad ve numaralı seçenekler", () => {
  const s = renderTest(() => <BranchingStoryLab />)
  expect(s.get(".lab-bs")?.getAttribute("aria-label")).toBe("Orman macerası")
  expect(s.get(".lab-bs .m-bs-title")?.textContent).toBe("Ormanın girişi")
  expect(s.all(".lab-bs .m-bs-key").map((k: Element) => k.textContent)).toEqual(["1", "2"])
  expect(s.find("0/2 son")).not.toBe(null)
})

test("bir seçim yeni pasajı açar, onChange yolu yazar", async () => {
  const s = renderTest(() => <BranchingStoryLab />)
  await s.click("Dere boyu")
  expect(s.find("Derenin kıyısı")).not.toBe(null)
  expect(s.get(".lab-path")?.textContent).toBe("Yol: orman → dere")
})

test("sona varınca son adı, sayaç ve kendi düğme metni", async () => {
  const s = renderTest(() => <BranchingStoryLab />)
  await s.click("Tepeye")
  expect(s.text()).toContain("Son: Manzara")
  expect(s.find("1/2 son")).not.toBe(null)
  await s.click("Yeniden")
  expect(s.get(".lab-path")?.textContent).toBe("Yol: orman")
})

test("rakam tuşu seçer; dışarıdan başa sarılır", async () => {
  const s = renderTest(() => <BranchingStoryLab />)
  await s.press("2", s.get(".lab-bs")!)
  expect(s.find("Tepede")).not.toBe(null)
  await s.click("Başa sar")
  expect(s.find("Ormanın girişi")).not.toBe(null)
})
