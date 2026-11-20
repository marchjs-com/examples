import { test, expect, renderTest } from "march/testing"
import { ButtonLab } from "./ButtonLab.tsx"

// ButtonLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Beğen'e basınca Beğenildi olur, basılı durur", async () => {
  const s = renderTest(() => <ButtonLab />)
  const like = await s.click("Beğen")
  expect(s.sees("Beğenildi")).toBe(true)
  expect(like.getAttribute("aria-pressed")).toBe("true")
})

test("Gönder her basışta sayacı bir artırır", async () => {
  const s = renderTest(() => <ButtonLab />)
  await s.click("Gönder (0)")
  await s.click("Gönder (1)")
  expect(s.text()).toContain("Gönder (2)")
})

test("Silinemez düğmesi devre dışı", () => {
  const s = renderTest(() => <ButtonLab />)
  const del = s.find("Silinemez")?.closest("button")
  expect(del?.hasAttribute("disabled")).toBe(true)
})
