import { test, expect, renderTest } from "march/testing"
import { StackLab } from "./StackLab.tsx"

// StackLab'in testleri: kaydedince Testler sekmesinde çalışır
test("as=ul listeyi ul olarak çizer, wrap sınıfı var", () => {
  const s = renderTest(() => <StackLab />)
  const row = s.get(".lab-row")!
  expect(row.tagName).toBe("UL")
  expect(row.className).toContain("m-stack-wrap")
})

test("Genişlet boşluğu bir adım artırır", async () => {
  const s = renderTest(() => <StackLab />)
  await s.click("Genişlet")
  expect(s.get(".lab-gap")?.textContent).toBe("gap 3")
  expect(s.get(".lab-row")!.className).toContain("m-gap-3")
})

test("Toolbar erişilebilir adını alır, Divider etiketini gösterir", () => {
  const s = renderTest(() => <StackLab />)
  expect(s.get("[role=toolbar]")?.getAttribute("aria-label")).toBe("Boşluk")
  expect(s.sees("sütun")).toBe(true)
})
