import { test, expect, renderTest } from "march/testing"
import { ListEditorLab } from "./ListEditorLab.tsx"

// ListEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("yazıp Ekle'ye basınca öğe listenin sonuna eklenir ve onChange sayar", async () => {
  const s = renderTest(() => <ListEditorLab />)
  await s.type("İçecek ekle", "ayran")
  await s.click("Ekle")
  expect(s.text().includes("Liste: kahve · çay · su · ayran")).toBe(true)
  expect(s.text().includes("Değişiklik: 1")).toBe(true)
  expect(s.find("4. içecek")?.tagName).toBe("INPUT")
})

test("unique varsayılan: aynı öğe eklenmez; unique={false} ekler", async () => {
  const s = renderTest(() => <ListEditorLab />)
  await s.type("İçecek ekle", "çay")
  await s.click("Ekle")
  expect(s.text().includes("Liste: kahve · çay · su")).toBe(true)
  await s.type("Sıraya ad yaz", "Ali")
  await s.click("Yine de ekle")
  expect(s.text().includes("Sıra: Ali · Ali")).toBe(true)
})

test("kaldırma düğmesi kendi adıyla siler; liste boşalınca alan geçersiz olur", async () => {
  const s = renderTest(() => <ListEditorLab />)
  for (let i = 0; i < 3; i++) await s.click("Listeden çıkar")
  expect(s.text().includes("En az bir içecek gerekli")).toBe(true)
  expect(s.get("#lab-drink-input")?.getAttribute("aria-invalid")).toBe("true")
  expect(s.get("#lab-drink-input")?.getAttribute("aria-describedby")).toBe("lab-drinks-error")
})

test("max dolunca Ekle kilitlenir; salt okunur listede düğme yoktur", () => {
  const s = renderTest(() => <ListEditorLab />)
  expect(s.find("Dolu")?.closest("button")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Salt okunur satır")?.hasAttribute("readonly")).toBe(true)
  expect(s.get(".lab-drinks")?.getAttribute("role")).toBe("group")
  expect(s.get(".lab-drinks")?.getAttribute("aria-labelledby")).toBe("lab-drinks")
})
