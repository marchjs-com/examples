import { test, expect, renderTest } from "march/testing"
import { JoinedLab } from "./JoinedLab.tsx"

// JoinedLab'in testleri: kaydedince Testler sekmesinde çalışır
test("öteki öznitelikler köke gider", () => {
  const s = renderTest(() => <JoinedLab />)
  const live = s.get(".lab-live")
  expect(live?.getAttribute("role")).toBe("group")
  expect(live?.getAttribute("aria-label")).toBe("Kartlar")
})

test("direction canlı: düğmeye basınca sınıf değişir", async () => {
  const s = renderTest(() => <JoinedLab />)
  const before = s.get(".lab-live")!.className
  await s.click("Yatay yap")
  expect(s.get(".lab-live")!.className).not.toBe(before)
})

test("border ve dividers kapatılınca sınıflar farklı", () => {
  const s = renderTest(() => <JoinedLab />)
  expect(s.get(".lab-bare")!.className).not.toBe(s.get(".lab-full")!.className)
})
