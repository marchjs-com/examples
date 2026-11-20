import { test, expect, renderTest } from "march/testing"
import { UndoRedoLab } from "./UndoRedoLab.tsx"

// UndoRedoLab'in testleri: kaydedince Testler sekmesinde çalışır
test("+1'den sonra Vazgeç adımı adıyla söyler, geri alınca Yeniden açılır", async () => {
  const s = renderTest(() => <UndoRedoLab />)
  expect((s.get(".lab-undo") as HTMLButtonElement).disabled).toBe(true)
  await s.click("+1")
  expect(s.get(".lab-undo")?.getAttribute("aria-label")).toBe("Vazgeç: +1")
  await s.click("Vazgeç: +1")
  expect(s.get(".lab-count")?.textContent).toBe("0")
  expect((s.get(".lab-redo") as HTMLButtonElement).disabled).toBe(false)
  expect(s.get(".lab-redo")?.getAttribute("aria-label")).toBe("Yeniden: +1")
})

test("grubun adı labels.group; ipucunda adım ve kendi kısayolu", async () => {
  const s = renderTest(() => <UndoRedoLab />)
  expect(s.find("Sayaç geçmişi")?.getAttribute("role")).toBe("group")
  await s.click("×2")
  const title = s.get(".lab-undo")?.getAttribute("title") ?? ""
  expect(title).toContain("Vazgeç: ×2")
  expect(title).toContain("Z")
})

test("actions sırası; steps={false} ve shortcuts={false}: ipucu yalnız ad", async () => {
  const s = renderTest(() => <UndoRedoLab />)
  expect(s.get(".lab-props button")?.classList.contains("m-undo-redo-redo")).toBe(true)
  await s.click("Bayrağı dik")
  const undo = s.get(".lab-props .m-undo-redo-undo")
  expect((undo as HTMLButtonElement).disabled).toBe(false)
  expect(undo?.getAttribute("title")).toBe(undo?.getAttribute("aria-label"))
})

test("Kilitle: disabled düğmeleri kapatır; actions={[\"undo\"]} tek düğme çizer", async () => {
  const s = renderTest(() => <UndoRedoLab />)
  await s.click("+1")
  await s.click("Kilitle")
  expect((s.get(".lab-undo") as HTMLButtonElement).disabled).toBe(true)
  expect(s.all(".lab-only button").length).toBe(1)
})
