import { test, expect, renderTest } from "march/testing"
import { closePalette } from "march/ui"
import { CommandPaletteLab } from "./CommandPaletteLab.tsx"

// CommandPaletteLab'in testleri. Palet sayfanın katmanında açılır (test kutusunun dışında): onu document'ta ararız;
// palet uygulamada tek olduğu için her test sonunda kapatılır
const palette = () => document.querySelector(".lab-palette")
const input = () => palette()?.querySelector("input") as HTMLInputElement | null
const typeIn = (text: string) => { const el = input()!; el.value = text; el.dispatchEvent(new Event("input", { bubbles: true })) }
const open = async () => {
  const s = renderTest(() => <CommandPaletteLab />)
  await s.click("Laboratuvar paleti")
  await s.wait(() => !!input())
  return s
}

test("düğme paleti açar; kendi adları ve sınıfı görünür", async () => {
  const s = await open()
  expect(input()?.getAttribute("aria-label")).toBe("Laboratuvarda ara")
  // uygulamanın kayıtlı komutları (registerCommands) da listede: kendi komutumuz aranarak bulunur
  typeIn("ekip")
  await s.wait(() => palette()?.textContent?.includes("Ekip sayfası") ?? false)
  expect(palette()?.textContent).toContain("Ekip sayfası")
  closePalette()
})

test("limit dört sonuç gösterir; harf hatasıyla da bulur", async () => {
  const s = await open()
  expect(palette()!.querySelectorAll(".m-pal-item").length).toBe(4)
  typeIn("ayrlar")
  await s.wait(() => palette()?.querySelector(".m-pal-list")?.textContent?.includes("Ayarları aç") ?? false)
  expect(palette()!.querySelector(".m-pal-list")?.textContent).toContain("Ayarları aç")
  closePalette()
})

test("ask: Asistana sor satırı çıkar, askDelay sonra öneriyi getirir", async () => {
  const s = await open()
  typeIn("ayar nerede")
  await s.wait(() => palette()?.textContent?.includes("Asistana sor: ayar nerede") ?? false)
  await s.wait(() => palette()?.textContent?.includes("Asistan öneriyor") ?? false)
  expect(palette()!.querySelector(".m-pal-ai")?.textContent).toContain("Ayarlar burada")
  closePalette()
})

test("bir satıra basınca çalışır, onRun bildirir", async () => {
  const s = await open()
  typeIn("ekip")
  await s.wait(() => [...palette()!.querySelectorAll(".m-pal-item")].some((r) => r.textContent?.includes("Ekip sayfası")))
  const row = [...palette()!.querySelectorAll(".m-pal-item")].find((r) => r.textContent?.includes("Ekip sayfası")) as HTMLElement
  row.click()
  // onRun bir bildirim (toast) gösterir: sayfanın bildirim yığınında
  await s.wait(() => document.body.textContent?.includes("Çalıştı: Ekip sayfası") ?? false)
  expect(document.body.textContent).toContain("Çalıştı: Ekip sayfası")
  closePalette()
})
