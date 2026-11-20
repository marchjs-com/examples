import { test, expect, renderTest } from "march/testing"
import { ProfileHeaderLab } from "./ProfileHeaderLab.tsx"

// ProfileHeaderLab'in testleri: kaydedince Testler sekmesinde çalışır
test("istatistikler seçilen sırada ve kendi adlarıyla; basınca onStat çalışır", async () => {
  const s = renderTest(() => <ProfileHeaderLab />)
  expect(s.sees("Takipçi")).toBe(true)
  expect(s.sees("Takip edilenler")).toBe(false)
  const stat = s.all(".lab-profile button").find((b) => (b.textContent ?? "").includes("Gönderi"))
  expect(stat).toBeTruthy()
  await s.click(stat!)
  expect(s.sees("liste: posts")).toBe(true)
})

test("Mesaj at düğmesi onMessage'ı çalıştırır", async () => {
  const s = renderTest(() => <ProfileHeaderLab />)
  await s.click("Mesaj at")
  expect(s.sees("mesaj")).toBe(true)
})

test("kendi profilimde takip ve mesaj yerine Profili düzenle çıkar", async () => {
  const s = renderTest(() => <ProfileHeaderLab />)
  await s.click("Kendi profilim")
  expect(s.find("Mesaj at")).toBe(null)
  await s.click("Profili düzenle")
  expect(s.sees("düzenle")).toBe(true)
})

test("ikinci başlıkta kapak ve istatistik yok; ilkinde iki istatistik var", () => {
  const s = renderTest(() => <ProfileHeaderLab />)
  const [lab, plain] = s.all(".m-prof")
  expect(lab?.querySelectorAll(".m-prof-stat").length).toBe(2)
  expect(plain?.textContent).toContain("Gizli Hesap")
  expect(plain?.querySelector(".m-prof-stats")).toBe(null)
  expect(plain?.querySelector(".m-prof-cover-art")).toBe(null)
})
