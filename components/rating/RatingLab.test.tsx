import { test, expect, renderTest } from "march/testing"
import { RatingLab } from "./RatingLab.tsx"

// RatingLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir yıldıza basınca puan ve onChange sayacı değişir", async () => {
  const s = renderTest(() => <RatingLab />)
  expect(s.text().includes("Puan: 3")).toBe(true)
  const four = await s.click("5 üzerinden 4")
  expect(four.getAttribute("aria-checked")).toBe("true")
  expect(s.find("5 üzerinden 3")?.getAttribute("aria-checked")).toBe("false")
  expect(s.text().includes("Puan: 4")).toBe(true)
  expect(s.text().includes("Değişiklik: 1")).toBe(true)
})

test("aynı değere bağlı başka bir Rating de güncellenir", async () => {
  const s = renderTest(() => <RatingLab />)
  await s.click("2 kalp")
  expect(s.text().includes("Puan: 2")).toBe(true)
  expect(s.find("Gece 2")?.getAttribute("aria-checked")).toBe("true")
})

test("label grubun adı; max={10} on işaret çizer; class köke gider", async () => {
  const s = renderTest(() => <RatingLab />)
  const group = s.find("Hizmet puanı")
  expect(group?.getAttribute("role")).toBe("radiogroup")
  expect(group?.querySelectorAll("[role=radio]").length).toBe(10)
  await s.click("Hizmet 9")
  expect(s.text().includes("Hizmet: 9 / 10")).toBe(true)
  expect(s.find("Genel puan")?.classList.contains("lab-rating")).toBe(true)
})

test("salt okunur puan değişmez; kesirli kısım yarım işaret çizer", async () => {
  const s = renderTest(() => <RatingLab />)
  const avg = s.find("Ortalama 4,5") as HTMLElement
  expect(avg.classList.contains("is-readonly")).toBe(true)
  const stars = avg.querySelectorAll<HTMLButtonElement>("[role=radio]")
  expect(stars[4]?.classList.contains("is-half")).toBe(true)
  expect(stars[0]?.disabled).toBe(true)
})
