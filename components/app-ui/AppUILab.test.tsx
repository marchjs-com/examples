import { test, expect, renderTest } from "march/testing"
import { AppUILab } from "./AppUILab.tsx"

// AppUILab'in testleri: üst çubuk, eklentinin dosya türü ve paneli, yuvalar, düğmeler
test("üst çubuk: başlık, kendi işaretli açıklama, Düzenler düğmesi, id", () => {
  const s = renderTest(() => <AppUILab />)
  expect(s.get(".lab-app .m-app-title")?.textContent).toBe("lab-ide")
  expect(s.get(".lab-app .m-app-desc")?.textContent).toContain("# bütün özellikler")
  expect(s.find("Düzenler")).toBeTruthy()
  expect(s.get("#lab-app")).toBeTruthy()
})

test("eklenti: .md dosyasını kendi türü çizer, kendi paneli de gelir", () => {
  const s = renderTest(() => <AppUILab />)
  expect(s.get(".lab-app .m-app-file article")?.textContent).toBe("# Merhaba AppUI")
  expect(s.sees("Yıldızlar")).toBe(true)
  expect(s.sees("eklenti paneli: 1")).toBe(true)
})

test("yan ve durum yuvaları yerinde", () => {
  const s = renderTest(() => <AppUILab />)
  expect(s.get(".lab-app .m-app-main")?.firstElementChild?.classList.contains("m-app-body")).toBe(false)
  expect(s.sees("değişiklik:")).toBe(true)
})

test("durum çubuğundaki düğme üst çubuğu gizler ve geri getirir", async () => {
  const s = renderTest(() => <AppUILab />)
  await s.click("Çubuğu gizle")
  expect(s.get(".lab-app .m-app-bar")).toBe(null)
  await s.click("Çubuğu göster")
  expect(s.get(".lab-app .m-app-bar")).toBeTruthy()
})
