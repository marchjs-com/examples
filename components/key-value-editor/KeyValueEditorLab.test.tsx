import { test, expect, renderTest } from "march/testing"
import { KeyValueEditorLab } from "./KeyValueEditorLab.tsx"

// KeyValueEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
// değer "Kota" adlı CodeView'da (satır numarasıyla): JSON metnin içinde aranır
test("numbers ile yazılan değer sayı olur, onChange sayar", async () => {
  const s = renderTest(() => <KeyValueEditorLab />)
  await s.type("Koltuk", "3")
  expect(s.find("Kota")?.textContent).toContain('{"free":3,"team":10}')
  expect(s.text().includes("Değişiklik: 1")).toBe(true)
})

test("Plan ekle yeni bir satır açar; ad ve değer yazılınca nesneye girer", async () => {
  const s = renderTest(() => <KeyValueEditorLab />)
  await s.click("Plan ekle")
  const keys = s.all('input[aria-label="Plan"]')
  expect(keys.length).toBe(3)
  await s.type(keys[2]!, "pro")
  await s.type(s.all('input[aria-label="Koltuk"]')[2]!, "25")
  expect(s.find("Kota")?.textContent).toContain('{"free":1,"team":10,"pro":25}')
})

test("yinelenen anahtar işaretlenir ve nesneye girmez", async () => {
  const s = renderTest(() => <KeyValueEditorLab />)
  const second = await s.type(s.all('input[aria-label="Plan"]')[1]!, "free")
  expect(s.text().includes("Bu plan zaten var")).toBe(true)
  expect(second.getAttribute("aria-invalid")).toBe("true")
  expect(s.find("Kota")?.textContent).toContain('{"free":1}')
})

test("Planı sil satırı kaldırır; numbers olmadan değer metin kalır; salt okunurda düğme yok", async () => {
  const s = renderTest(() => <KeyValueEditorLab />)
  await s.click("Planı sil")
  expect(s.find("Kota")?.textContent).toContain('{"team":10}')
  await s.type("Başlık değeri", "100")
  expect(s.find("Başlıklar")?.textContent).toContain('{"Accept":"100"}')
  expect(s.find("Salt okunur anahtar")?.hasAttribute("readonly")).toBe(true)
  expect(s.get(".lab-plans")?.getAttribute("aria-labelledby")).toBe("lab-plans")
})
