import { test, expect, renderTest } from "march/testing"
import { CodeEditorLab } from "./CodeEditorLab.tsx"

// CodeEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kod, alt satır mesajı, kendi ipucu ve inputRef yerinde", () => {
  const s = renderTest(() => <CodeEditorLab />)
  const input = s.find("Örnek kod") as HTMLTextAreaElement | null
  expect(input?.value).toContain("function add")
  expect(input?.getAttribute("data-lab")).toBe("input")
  expect(s.sees("Satır sayısı: 5")).toBe(true)
  expect(s.get(".lab-code .lab-hint")?.textContent).toBe("F12 · F2")
})

test("satır numaraları, oluktaki işaret ve etkin satır", async () => {
  const s = renderTest(() => <CodeEditorLab />)
  const lines = s.all(".lab-code .m-ced-ln")
  expect(lines.length).toBe(5)
  expect(lines[1]?.className).toContain("is-breakpoint")
  expect(s.get(".lab-code .m-ced-lit")).not.toBe(null)
  await s.click("Etkin satır: 3")
  expect(s.sees("Etkin satır: 2")).toBe(true)
})

test("onMessage: mesaj bir düğme olur, basınca çağrılır", async () => {
  const s = renderTest(() => <CodeEditorLab />)
  await s.click("Satır sayısı: 5")
  expect(s.sees("mesaja basıldı")).toBe(true)
})

test("tek satırlık kopya: alt çubuksuz ve salt okunur", () => {
  const s = renderTest(() => <CodeEditorLab />)
  expect(s.find("Tek satır")?.hasAttribute("readonly")).toBe(true)
  expect(s.all(".m-ced-foot").length).toBe(1)
})
