import { test, expect, renderTest } from "march/testing"
import { NewsletterLab } from "./NewsletterLab.tsx"

// NewsletterLab'in testleri: kaydedince Testler sekmesinde çalışır
test("başlık, açıklama, not, yer tutucu ve düğme metni", () => {
  const s = renderTest(() => <NewsletterLab />)
  expect(s.find("Haberdar ol")).not.toBe(null)
  expect(s.find("İstediğin an ayrılabilirsin.")).not.toBe(null)
  expect(s.get('.lab-nl input[type="email"]')?.getAttribute("placeholder")).toBe("adın@ornek.com")
  expect(s.find("Kaydol")).not.toBe(null)
})

test("geçersiz adres: kendi hata metni okunur", async () => {
  const s = renderTest(() => <NewsletterLab />)
  await s.type("E-posta adresin", "abc")
  await s.click("Kaydol")
  await s.wait(() => s.sees("Geçerli bir adres yaz."))
  expect(s.sees("Geçerli bir adres yaz.")).toBeTruthy()
})

test("geçerli adres: teşekkür satırı ve sayaç", async () => {
  const s = renderTest(() => <NewsletterLab />)
  await s.type("E-posta adresin", "ali@ornek.com")
  await s.click("Kaydol")
  await s.wait(() => s.sees("Görüşmek üzere!"))
  expect(s.get('.lab-nl [role="status"]')?.textContent).toContain("Görüşmek üzere!")
  expect(s.find("1 abone")).not.toBe(null)
})

test("sunucu hatası: genel hata metni, form yerinde kalır", async () => {
  const s = renderTest(() => <NewsletterLab />)
  await s.click("Sunucu hatası")
  await s.type("E-posta adresin", "ali@ornek.com")
  await s.click("Kaydol")
  await s.wait(() => s.sees("Bir sorun çıktı."))
  expect(s.get(".lab-nl form")).not.toBe(null)
})
