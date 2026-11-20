import { test, expect, renderTest } from "march/testing"
import { RichTextEditorLab } from "./RichTextEditorLab.tsx"

// RichTextEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Markdown başlık ve liste olarak çizilir, kendi metinler görünür", async () => {
  const s = renderTest(() => <RichTextEditorLab />)
  await s.flush()
  expect(s.find("Plan metni")?.querySelector("h2")?.textContent).toBe("Plan")
  expect(s.find("Plan araçları")).not.toBe(null)
  expect(s.sees("@ ile kişi, : ile emoji")).toBe(true)
  expect(s.text()).toContain("7 sözcük")
})

test("api ile baştan yazılan metin Markdown değerine yazılır", async () => {
  const s = renderTest(() => <RichTextEditorLab />)
  await s.flush()
  await s.click("Baştan yaz")
  // CodeView satır numarasını da yazar: değer metnin içinde aranır
  expect(s.find("Markdown")?.textContent).toContain("## Sıfırdan")
  expect(s.sees("1 değişiklik")).toBe(true)
})

test("kendi araç adları ve ikonları: Kalın düğmesinde K yazar", async () => {
  const s = renderTest(() => <RichTextEditorLab />)
  await s.flush()
  expect(s.find("Kalın")?.textContent).toContain("K")
  expect(s.find("Eğik")?.textContent).toContain("İ")
})

test("salt okunur ön izleme yazılamaz ve sayaçsızdır", async () => {
  const s = renderTest(() => <RichTextEditorLab />)
  await s.flush()
  expect(s.find("Plan ön izlemesi")?.getAttribute("contenteditable")).toBe("false")
  expect(s.all(".lab-plan").length).toBe(1)
})
