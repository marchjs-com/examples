import { test, expect, renderTest } from "march/testing"
import { PageDotsLab } from "./PageDotsLab.tsx"

// PageDotsLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Bir noktaya basınca o sayfa geçerli olur; salt okunur noktalar konumu duyurur", async () => {
  const s = renderTest(() => <PageDotsLab />)
  const third = await s.click("Fotoğraf 3")
  expect(third.getAttribute("aria-current")).toBe("true")
  expect(s.sees("Seçili: 3 / 5")).toBe(true)
  expect(s.find("Konum: 3 / 5")?.getAttribute("role")).toBe("img")
})

test("labels.group grubun adı; size ve class kökte", () => {
  const s = renderTest(() => <PageDotsLab />)
  const group = s.find("Galeri sayfaları")
  expect(group?.getAttribute("role")).toBe("group")
  expect(group?.classList.contains("lab-gallery")).toBe(true)
  expect(group?.classList.contains("m-page-dots-lg")).toBe(true)
})

test("dot kendi içeriği çizer ve etkin olanı bilir; dikey dizilim", async () => {
  const s = renderTest(() => <PageDotsLab />)
  expect(s.find("Bölüm 2")?.textContent).toBe("2")
  const second = await s.click("Bölüm 2")
  expect(second.textContent).toBe("★")
  expect(second.parentElement?.classList.contains("m-page-dots-vertical")).toBe(true)
})

test("decorative ekran okuyucudan gizler; disabled düğmeleri kapatır", () => {
  const s = renderTest(() => <PageDotsLab />)
  expect(s.get(".lab-decor")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.find("Kilitli 1")?.hasAttribute("disabled")).toBe(true)
})
