import { test, expect, renderTest } from "march/testing"
import { MarkdownEditorLab } from "./MarkdownEditorLab.tsx"

// MarkdownEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kendi görünüm adları sekmelerde, kendi araç adları düğmelerde", () => {
  const s = renderTest(() => <MarkdownEditorLab />)
  const tabs = s.get(".lab-md")?.querySelectorAll("[role=tab]") ?? []
  expect([...tabs].map((t) => t.textContent)).toEqual(["Yaz", "Yan yana", "Oku", "Biçimli"])
  expect(s.find("Görev")).not.toBe(null)
  expect(s.find("Biçim")?.getAttribute("role")).toBe("toolbar")
})

test("Oku sekmesi Markdown'u çizer ve araç çubuğunu kaldırır", async () => {
  const s = renderTest(() => <MarkdownEditorLab />)
  await s.click("Oku")
  expect(s.get(".lab-md .m-mde-preview h2")?.textContent).toBe("Toplantı")
  expect(s.get(".lab-md .m-mde-toolbar")).toBe(null)
})

test("yazınca değer ve sayaç güncellenir, kopya da izler", async () => {
  const s = renderTest(() => <MarkdownEditorLab />)
  await s.type("Kaynak", "bir iki üç")
  expect(s.sees("1 düzenleme")).toBe(true)
  expect(s.get(".lab-md .m-mde-foot")?.textContent).toContain("3 sözcük")
  expect((s.find("Salt okunur kopya") as HTMLTextAreaElement | null)?.value).toBe("bir iki üç")
})

test("ikinci düzenleyici: eski preview=split ile bölünmüş açılır, salt okunur", () => {
  const s = renderTest(() => <MarkdownEditorLab />)
  const copy = s.find("Salt okunur kopya")
  expect(copy?.hasAttribute("readonly")).toBe(true)
  expect(s.all(".m-mde-hint").length).toBe(1)
})
