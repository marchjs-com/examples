import { test, expect, renderTest } from "march/testing"
import { ProjectGridLab } from "./ProjectGridLab.tsx"

// ProjectGridLab'in testleri: kaydedince Testler sekmesinde çalışır
test("dört kart; süzgeç grubunun adı ve Tümü + üç kategori çipi", () => {
  const s = renderTest(() => <ProjectGridLab />)
  expect(s.all(".lab-grid .m-pg-card").length).toBe(4)
  const group = s.get('.lab-grid [role="group"]')
  expect(group?.getAttribute("aria-label")).toBe("Projeleri süz")
  expect(group?.textContent).toContain("Tümü")
  expect(group?.textContent).toContain("Uygulama")
})

test("Marka çipi: yalnız iki marka işi görünür kalır (hareketsiz)", async () => {
  const s = renderTest(() => <ProjectGridLab />)
  await s.click("Marka")
  const shown = s.all(".lab-grid .m-pg-card").filter((c: Element) => !(c as HTMLElement).hidden)
  expect(shown.length).toBe(2)
})

test("başlığa basınca onOpen projeyi alır", async () => {
  const s = renderTest(() => <ProjectGridLab />)
  await s.click("Kite uygulaması")
  expect(s.find("Açılan: Kite uygulaması")).not.toBe(null)
})

test("anahtarlar: iki sütun ve rozette yıl", async () => {
  const s = renderTest(() => <ProjectGridLab />)
  await s.click("İki sütun")
  expect(s.get(".m-pg-cols-2")).not.toBe(null)
  await s.click("Rozette yıl")
  expect(s.all(".m-pg-go.is-own").length).toBe(4)
})
