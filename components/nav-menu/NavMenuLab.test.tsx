import { test, expect, renderTest } from "march/testing"
import { NavMenuLab } from "./NavMenuLab.tsx"

// NavMenuLab'in testleri: kaydedince Testler sekmesinde çalışır. Menü sabitlenenleri localStorage'da tutar:
// her test temiz başlasın diye anahtar önce silinir. (Dar ekranda menü çekmeceye geçer; bu testler geniş ekran içindir.)
const fresh = () => { try { localStorage.removeItem("lab.navmenu") } catch { /* gizli pencere */ } }

test("menü adı, sınıfı, rengi, üst ve alt yuvası", () => {
  fresh()
  const s = renderTest(() => <NavMenuLab />)
  expect(s.get(".lab-nav nav")?.getAttribute("aria-label")).toBe("Lab menüsü")
  expect(s.get(".lab-nav")?.getAttribute("data-m-color")).toBe("brand-purple")
  expect(s.sees("Lab Panel")).toBe(true)
  expect(s.sees("Elif · yönetici")).toBe(true)
})

test("gruplar kapalı başlar; başlığa basınca açılır", async () => {
  fresh()
  const s = renderTest(() => <NavMenuLab />)
  const group = s.get("[data-group='Yönetim']")
  expect(group?.getAttribute("aria-expanded")).toBe("false")
  await s.click(group!)
  expect(group?.getAttribute("aria-expanded")).toBe("true")
})

test("yıldız yerine kalp: sabitleyince Gözdeler bölümü gelir, düğmenin adı değişir", async () => {
  fresh()
  const s = renderTest(() => <NavMenuLab />)
  expect(s.sees("Gözdeler")).toBe(false)
  await s.click("Raporlar gözdelere")
  expect(s.sees("Gözdeler")).toBe(true)
  expect(s.find("Raporlar gözdelerden çıksın")).not.toBe(null)
})

test("can ve hidden öğeyi menüden çıkarır; süzgeç kendi boş sonuç metnini gösterir", async () => {
  fresh()
  const s = renderTest(() => <NavMenuLab />)
  expect(s.sees("Yönetici ayarları")).toBe(false)
  await s.click("Yönetici ol")
  expect(s.sees("Yönetici ayarları")).toBe(true)
  expect(s.sees("Yeni panel (beta)")).toBe(true)
  await s.click("Betayı gizle")
  expect(s.sees("Yeni panel (beta)")).toBe(false)
  await s.type("Sayfalarda ara", "zzzz")
  expect(s.sees("Hiçbir şey yok")).toBe(true)
})
