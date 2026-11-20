import { test, expect, renderTest } from "march/testing"
import { SelectLab } from "./SelectLab.tsx"

// SelectLab'in testleri: kaydedince Testler sekmesinde çalışır
// (yerel select'te seçeneklerin value'su sıra numarasıdır: "3" dördüncü şık; Select değeri kendi türünde verir)
test("seçilen sayı sayı olarak gelir, onChange çağrılır", async () => {
  const s = renderTest(() => <SelectLab />)
  expect(s.text().includes("Seçili: 3 (number)")).toBe(true)
  await s.type("Fibonacci", "4")
  expect(s.text().includes("Seçili: 8 (number) · değişiklik: 1")).toBe(true)
})

test("nesne şık seçilir; kapalı şık seçilemez işaretli", async () => {
  const s = renderTest(() => <SelectLab />)
  const plan = s.find("Plan")!.querySelectorAll("option")
  expect(plan.length).toBe(3)
  expect(plan[2]!.hasAttribute("disabled")).toBe(true)
  await s.type("Plan", "1")
  expect(s.text().includes("Plan: team · 10 koltuk")).toBe(true)
})

test("canlı liste büyür; virgüllü metin şıklara bölünür", async () => {
  const s = renderTest(() => <SelectLab />)
  const sizes = () => s.find("Beden")!.querySelectorAll("option")
  expect(sizes().length).toBe(4)
  await s.click("Beden ekle")
  expect(sizes().length).toBe(5)
  expect(sizes()[4]!.textContent).toBe("XXL")
  expect([...s.find("İçecek")!.querySelectorAll("option")].map((o) => o.textContent)).toEqual(["Çay", "Kahve", "Ayran", "Limonata"])
  await s.type("İçecek", "2")
  expect(s.text().includes("İçecek: Ayran")).toBe(true)
})

test("zorunlu boş alan geçersiz, seçince düzelir; salt okunur select kapalıdır", async () => {
  const s = renderTest(() => <SelectLab />)
  const team = s.get("#lab-team")!
  expect(team.getAttribute("aria-invalid")).toBe("true")
  expect(team.hasAttribute("required")).toBe(true)
  expect(team.getAttribute("aria-describedby")).toBe("lab-team-hint")
  expect(team.querySelector("option")?.textContent).toBe("Takım seç…")
  await s.type("#lab-team", "1")
  expect(s.text().includes("Takım: Mobil")).toBe(true)
  expect(team.getAttribute("aria-invalid")).toBe(null)
  expect(s.find("Kilitli şehir")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Para birimi")?.hasAttribute("disabled")).toBe(true)
})
