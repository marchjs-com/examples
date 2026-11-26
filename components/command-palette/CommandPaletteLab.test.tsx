// Tests for CommandPaletteLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CommandPaletteLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(text) clicks like a user and waits until the view has updated; s.wait(fn) waits until fn returns true (the
//   palette dialog loads on first open and the "ask" answer comes after a delay, so the tests wait for them).
// - The palette opens in the page's overlay layer, outside the test box, so these tests look for it in `document`.
//   There is only one palette in an app, so every test closes it at the end with closePalette().
// - The tests check what a user can observe (texts, rows, the accessible name of the search field), not internal state.
import { test, expect, renderTest } from "march/testing"
import { closePalette } from "march/ui"
import { CommandPaletteLab } from "./CommandPaletteLab.tsx"

// Helpers: find the palette by its class, its search input, type into it (set the value and fire an input event, as
// typing does) and open it through the Lab's button.
const palette = () => document.querySelector(".lab-palette")
const input = () => palette()?.querySelector("input") as HTMLInputElement | null
const typeIn = (text: string) => { const el = input()!; el.value = text; el.dispatchEvent(new Event("input", { bubbles: true })) }
const open = async () => {
  const s = renderTest(() => <CommandPaletteLab />)
  await s.click("Laboratuvar paleti")
  await s.wait(() => !!input())
  return s
}

// The button opens the palette; labels.search is the accessible name of the search field. Commands that the app
// registered (registerCommands) are in the list too, so our own command is found by searching for it.
test("düğme paleti açar; kendi adları ve sınıfı görünür", async () => {
  const s = await open()
  expect(input()?.getAttribute("aria-label")).toBe("Laboratuvarda ara")
  // The app's registered commands (registerCommands) are in the list too: our own command is found by searching.
  typeIn("ekip")
  await s.wait(() => palette()?.textContent?.includes("Ekip sayfası") ?? false)
  expect(palette()?.textContent).toContain("Ekip sayfası")
  closePalette()
})

// limit={4} caps the rows at four, and the search tolerates typos ("ayrlar" still finds the settings command).
test("limit dört sonuç gösterir; harf hatasıyla da bulur", async () => {
  const s = await open()
  expect(palette()!.querySelectorAll(".m-pal-item").length).toBe(4)
  typeIn("ayrlar")
  await s.wait(() => palette()?.querySelector(".m-pal-list")?.textContent?.includes("Ayarları aç") ?? false)
  expect(palette()!.querySelector(".m-pal-list")?.textContent).toContain("Ayarları aç")
  closePalette()
})

// `ask` adds an "Ask the assistant" row (text from labels.ask); after askDelay the intent search runs by itself and
// its suggestion appears with the reason it returned.
test("ask: Asistana sor satırı çıkar, askDelay sonra öneriyi getirir", async () => {
  const s = await open()
  typeIn("ayar nerede")
  await s.wait(() => palette()?.textContent?.includes("Asistana sor: ayar nerede") ?? false)
  await s.wait(() => palette()?.textContent?.includes("Asistan öneriyor") ?? false)
  expect(palette()!.querySelector(".m-pal-ai")?.textContent).toContain("Ayarlar burada")
  closePalette()
})

// Pressing a row runs its command and calls onRun with the entry; the Lab shows a toast, which is a visible effect.
test("bir satıra basınca çalışır, onRun bildirir", async () => {
  const s = await open()
  typeIn("ekip")
  await s.wait(() => [...palette()!.querySelectorAll(".m-pal-item")].some((r) => r.textContent?.includes("Ekip sayfası")))
  const row = [...palette()!.querySelectorAll(".m-pal-item")].find((r) => r.textContent?.includes("Ekip sayfası")) as HTMLElement
  row.click()
  // onRun shows a notification (toast): it appears in the page's notification stack
  await s.wait(() => document.body.textContent?.includes("Çalıştı: Ekip sayfası") ?? false)
  expect(document.body.textContent).toContain("Çalıştı: Ekip sayfası")
  closePalette()
})
