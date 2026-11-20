import { test, expect, renderTest } from "march/testing"
import { StatusBarLab } from "./StatusBarLab.tsx"

// StatusBarLab'in testleri: kaydedince Testler sekmesinde çalışır
test("öğeler çizilir, çubuğun adı label", () => {
  const s = renderTest(() => <StatusBarLab />)
  expect(s.sees("Hazır")).toBe(true)
  expect(s.get(".lab-bar")?.getAttribute("aria-label")).toBe("Durum")
})

test("onSelect'li öğe düğmedir ve basılınca çalışır", async () => {
  const s = renderTest(() => <StatusBarLab />)
  await s.click("0 tık")
  expect(s.sees("1 tık")).toBe(true)
})
