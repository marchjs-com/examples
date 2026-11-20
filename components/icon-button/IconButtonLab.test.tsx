import { test, expect, renderTest } from "march/testing"
import { IconButtonLab } from "./IconButtonLab.tsx"

// IconButtonLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Beğen'e basınca adı Beğenildi olur ve basılı durur", async () => {
  const s = renderTest(() => <IconButtonLab />)
  const like = await s.click("Beğen")
  expect(like.getAttribute("aria-label")).toBe("Beğenildi")
  expect(like.getAttribute("aria-pressed")).toBe("true")
})

test("label hem erişilebilir ad hem ipucu; title={false} ipucunu kaldırır", () => {
  const s = renderTest(() => <IconButtonLab />)
  expect(s.find("Bilgi")?.getAttribute("title")).toBe("Kendi ipucum: sürüm 0.2.0")
  expect(s.find("Ayarlar")?.hasAttribute("title")).toBe(false)
  expect(s.find("Ekle (sm)")?.getAttribute("title")).toBe("Ekle (sm)")
})

test("Bildirimlere basınca rozet sıfırlanır, +1 yeniden artırır", async () => {
  const s = renderTest(() => <IconButtonLab />)
  await s.click("Bildirimler (3)")
  expect(s.find("Bildirimler (0)")).not.toBe(null)
  await s.click("Yeni bildirim")
  expect(s.find("Bildirimler (1)")?.textContent).toContain("1")
})

test("href verilince düğme bir bağlantı olur", () => {
  const s = renderTest(() => <IconButtonLab />)
  const site = s.find("March sitesi")
  expect(site?.tagName).toBe("A")
  expect(site?.getAttribute("href")).toBe("https://marchjs.com")
})
