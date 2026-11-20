import { test, expect, renderTest } from "march/testing"
import { TerminalLab } from "./TerminalLab.tsx"

// TerminalLab'in testleri: kaydedince Testler sekmesinde çalışır
const run = async (s: ReturnType<typeof renderTest>, line: string) => {
  const input = await s.type("Komut satırı", line)
  input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }))
  await s.flush(4)
}

test("say komutu yazar ve alttaki kayda düşer", async () => {
  const s = renderTest(() => <TerminalLab />)
  await run(s, "say --loud merhaba")
  expect(s.sees("MERHABA")).toBe(true)
  expect(s.find("Olay kaydı")?.textContent).toContain("say merhaba")
})

test("alt komut: math add 2 3 = 5", async () => {
  const s = renderTest(() => <TerminalLab />)
  await run(s, "math add 2 3")
  expect(s.find("Laboratuvar çıktısı")?.textContent).toContain("5")
})

test("komut değilse fallback hesaplar, anlaşılmazsa söyler", async () => {
  const s = renderTest(() => <TerminalLab />)
  await run(s, "6*7")
  expect(s.sees("= 42")).toBe(true)
  await run(s, "selam")
  expect(s.sees("anlaşılmadı: selam")).toBe(true)
})

test("takım düğmesi renk takımını ve istemi değiştirir", async () => {
  const s = renderTest(() => <TerminalLab />)
  expect(s.get(".lab-term")?.className).toContain("m-term-auto")
  await s.click("Takım: auto")
  expect(s.get(".lab-term")?.className).toContain("m-term-surface")
  expect(s.sees("surface$")).toBe(true)
})
