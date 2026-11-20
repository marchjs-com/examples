import { test, expect, renderTest } from "march/testing"
import { IconPickerLab } from "./IconPickerLab.tsx"

// IconPickerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("düğme paneli açar; aranıp seçilen ikon değer olur ve düğmenin adına yazılır", async () => {
  const s = renderTest(() => <IconPickerLab />)
  await s.click(s.find("Menü ikonu: plus") as Element)
  await s.wait(() => s.get(".m-ipk-panel input"))
  await s.type(s.get(".m-ipk-panel input") as Element, "trophy")
  await s.wait(() => s.get('.m-ipk-panel [aria-label="trophy"]'))
  await s.click(s.get('.m-ipk-panel [aria-label="trophy"]') as Element)
  expect(s.text().includes("Menü: trophy")).toBe(true)
  expect(s.find("Menü ikonu: trophy") !== null).toBe(true)
})

test("satır içi seçki: pageSize kadar çizer, simge yok ve süzgeç yok; seçilen basılı durur", async () => {
  const s = renderTest(() => <IconPickerLab />)
  expect(s.all(".lab-picks .m-ipk-item").length).toBe(6)
  expect(s.get(".lab-picks .m-ipk-off")).toBe(null)
  expect(s.get(".lab-picks .m-ipk-groups")).toBe(null)
  const sun = await s.click(s.get('.lab-picks [aria-label="sun"]') as Element)
  expect(s.text().includes("Seçki: sun")).toBe(true)
  expect(sun.getAttribute("aria-pressed")).toBe("true")
  await s.type(s.get(".lab-picks input") as Element, "coffee")
  await s.wait(() => s.all(".lab-picks .m-ipk-item").length === 1)
})

test("kendi süzgeç çipi yalnız eşleşen ikonları bırakır", async () => {
  const s = renderTest(() => <IconPickerLab />)
  await s.click("Kişiler")
  const names = s.all(".lab-people .m-ipk-item:not(.m-ipk-off)").map((b: Element) => b.getAttribute("aria-label") ?? "")
  expect(names.length).toBe(3)
  expect(names.every((n: string) => n.startsWith("user"))).toBe(true)
})

test("değeri bir paketten olan seçici o paketi yükler ve ikonu seçili gösterir", async () => {
  const s = renderTest(() => <IconPickerLab />)
  await s.wait(() => s.get('.lab-packs [aria-label="crown"]'))
  expect(s.get('.lab-packs [aria-label="crown"]')?.getAttribute("aria-pressed")).toBe("true")
  expect(s.text().includes("Rozet: hadi:crown")).toBe(true)
})
