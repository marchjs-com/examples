import { test, expect, renderTest } from "march/testing"
import { OptionListLab } from "./OptionListLab.tsx"

// OptionListLab'in testleri: kaydedince Testler sekmesinde çalışır
test("radyo: satıra basınca seçilir, aria-checked ve değer güncellenir; devre dışı satır seçilmez", async () => {
  const s = renderTest(() => <OptionListLab />)
  const list = s.get(".lab-theme")!
  expect(list.getAttribute("role")).toBe("radiogroup")
  const row = (name: string) => [...list.querySelectorAll('[role="radio"]')].find((r: Element) => (r.textContent ?? "").includes(name))!
  await s.click(row("Açık"))
  expect(row("Açık").getAttribute("aria-checked")).toBe("true")
  expect(s.text().includes("Tema: light")).toBe(true)
  await s.click(row("Yüksek"))
  expect(s.text().includes("Tema: light")).toBe(true)
})

test("çoklu seçim: listbox aria-multiselectable, basınca eklenir ve çıkar", async () => {
  const s = renderTest(() => <OptionListLab />)
  const box = s.all('[role="listbox"]').find((l: Element) => l.getAttribute("aria-multiselectable") === "true")!
  const opt = (name: string) => [...box.querySelectorAll('[role="option"]')].find((o: Element) => (o.textContent ?? "").includes(name))!
  await s.click(opt("yayın"))
  expect(s.text().includes("Etiketler: ürün, yayın")).toBe(true)
  await s.click(opt("ürün"))
  expect(s.text().includes("Etiketler: yayın")).toBe(true)
})

test("menü: menuitem'e basınca onPick çalışır", async () => {
  const s = renderTest(() => <OptionListLab />)
  const item = s.all('[role="menuitem"]').find((m: Element) => (m.textContent ?? "").includes("Sabitle"))!
  await s.click(item)
  expect(s.text().includes("Son işlem: pin")).toBe(true)
})

test("alanın tuşları: arama süzer, eşleşme yoksa boş liste metni görünür", async () => {
  const s = renderTest(() => <OptionListLab />)
  await s.type("Tema ara", "koy")
  const results = s.all('[role="listbox"]').find((l: Element) => l.getAttribute("aria-label") === "Arama sonuçları")!
  expect(results.querySelectorAll('[role="option"]').length).toBe(1)
  await s.type("Tema ara", "zzz")
  expect(s.text().includes("Eşleşen tema yok")).toBe(true)
})
