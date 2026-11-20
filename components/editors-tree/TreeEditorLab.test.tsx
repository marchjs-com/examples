import { test, expect, renderTest } from "march/testing"
import { TreeEditorLab } from "./TreeEditorLab.tsx"

// TreeEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("şema ve validate sorunları sayılır, kendi metinlerle yazılır", async () => {
  const s = renderTest(() => <TreeEditorLab />)
  await s.flush()
  expect(s.get(".lab-tree .m-tre-status")?.textContent).toBe("2 düzeltilecek yer")
  expect(s.sees("0 değişiklik · 2 sorun")).toBe(true)
  expect(s.get(".lab-tree [role=tree]")?.getAttribute("aria-label")).toBe("Sunucu")
  expect(s.get(".lab-tree .m-tre-empty")?.textContent).toBe("boş")
})

test("yalnız listelenen satır eylemleri: ekle ve sil, çoğalt yok", async () => {
  const s = renderTest(() => <TreeEditorLab />)
  await s.flush()
  expect(s.get(".lab-tree .m-tre-add")).not.toBe(null)
  expect(s.get(".lab-tree .m-tre-dup")).toBe(null)
})

test("Sil bir alanı kaldırır, Geri al geri getirir", async () => {
  const s = renderTest(() => <TreeEditorLab />)
  await s.flush()
  const row = s.get('.lab-tree [data-ptr="/note"]')
  const del = [...(row?.querySelectorAll("button") ?? [])].find((b) => b.getAttribute("aria-label") === "Sil")
  await s.click(del!)
  expect(s.get('.lab-tree [data-ptr="/note"]')).toBe(null)
  expect(s.sees("1 değişiklik")).toBe(true)
  await s.click("Geri al")
  await s.flush()
  expect(s.get('.lab-tree [data-ptr="/note"]')).not.toBe(null)
})

test("kopya salt okunur: eylem yok, arama yok", async () => {
  const s = renderTest(() => <TreeEditorLab />)
  await s.flush()
  const copy = s.all("[role=tree]").find((t) => t.getAttribute("aria-label") === "Salt okunur kopya")
  expect(copy?.getAttribute("aria-readonly")).toBe("true")
  expect(s.all(".m-tre-actions").length).toBeGreaterThan(0)
  expect(s.all(".m-tre-search-input").length).toBe(1)
})
