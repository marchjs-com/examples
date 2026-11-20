import { test, expect, renderTest } from "march/testing"
import { SearchBoxLab } from "./SearchBoxLab.tsx"

// SearchBoxLab'in testleri: kaydedince Testler sekmesinde çalışır
const key = async (el: Element, k: string) => {
  el.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true }))
  await new Promise((r) => setTimeout(r, 0))
}

test("onInput her tuşta, onSearch gecikmeden sonra, onEnter hemen", async () => {
  const s = renderTest(() => <SearchBoxLab />)
  const box = await s.type("Ürün ara", "kalem")
  expect(s.text().includes("Yazılan: kalem")).toBe(true)
  await s.wait(() => s.text().includes("aranan: kalem"), { timeout: 3000 })
  await key(box, "Enter")
  expect(s.text().includes("Enter: kalem")).toBe(true)
  expect(s.text().includes("ref: INPUT")).toBe(true)
  expect(box.classList.contains("lab-search-input")).toBe(true)
})

test("combobox: aria bağları, ok tuşu vurgular, Enter seçer", async () => {
  const s = renderTest(() => <SearchBoxLab />)
  const box = s.find("Meyve seç")!
  expect(box.getAttribute("role")).toBe("combobox")
  expect(box.getAttribute("aria-controls")).toBe("lab-fruits")
  expect(box.getAttribute("aria-expanded")).toBe("true")
  await key(box, "ArrowDown")
  await key(box, "ArrowDown")
  expect(box.getAttribute("aria-activedescendant")).toBe("lab-fruit-1")
  await key(box, "Enter")
  expect(s.text().includes("Seçilen: armut")).toBe(true)
})

test("yazınca kendi temizle düğmesi çıkar, basınca kutu boşalır", async () => {
  const s = renderTest(() => <SearchBoxLab />)
  expect(s.find("Süzgeci temizle")).toBe(null)
  await s.type("Sipariş süz", "kargoda")
  expect(s.text().includes("Süzgeç: kargoda")).toBe(true)
  await s.click("Süzgeci temizle")
  expect(s.text().includes("Süzgeç: boş")).toBe(true)
})

test("Escape temizler; devre dışı kutu kilitli", async () => {
  const s = renderTest(() => <SearchBoxLab />)
  const box = await s.type("Sipariş süz", "iade")
  await key(box, "Escape")
  expect(s.text().includes("Süzgeç: boş")).toBe(true)
  expect(s.find("Kapalı arama")?.hasAttribute("disabled")).toBe(true)
  expect(s.get(".lab-search")?.getAttribute("role")).toBe("search")
})
