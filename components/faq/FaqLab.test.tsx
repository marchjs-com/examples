import { test, expect, renderTest } from "march/testing"
import { FaqLab } from "./FaqLab.tsx"

// FaqLab'in testleri: kaydedince Testler sekmesinde çalışır
test("beş soru; iki sütunda başlık ve iletişim satırı", () => {
  const s = renderTest(() => <FaqLab />)
  expect(s.all(".lab-faq .m-acc-item").length).toBe(5)
  expect(s.get(".lab-faq")?.classList.contains("m-faq-split")).toBe(true)
  expect(s.sees("Sık sorulanlar (5)")).toBe(true)
  expect(s.find("Bize yaz")).not.toBe(null)
})

test("arama listeyi daraltır ve sayıyı kendi metniyle yazar", async () => {
  const s = renderTest(() => <FaqLab />)
  await s.type("Soru ara", "iptal")
  await s.wait(() => s.sees("5 sorudan"))
  expect(s.all(".lab-faq .m-acc-item").length).toBeGreaterThan(0)
  expect(s.get(".lab-faq .m-acc-item")?.textContent).toContain("İptal olursa ne olur?")
  await s.type("Soru ara", "zzzqqq")
  await s.wait(() => s.sees("Hiçbir soru tutmadı."))
})

test("iletişim düğmesi açıklamayı günceller", async () => {
  const s = renderTest(() => <FaqLab />)
  await s.click("Bize yaz")
  expect(s.sees("1 kişi bize yazdı")).toBe(true)
})

test("ortada düzende başlık sütunu, arama kapanınca kutu gider", async () => {
  const s = renderTest(() => <FaqLab />)
  await s.click("ortada")
  await s.click("Arama")
  expect(s.get(".lab-faq")?.classList.contains("m-faq-split")).toBe(false)
  expect(s.get(".lab-faq .m-faq-search")).toBe(null)
})
