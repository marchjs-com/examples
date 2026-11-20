import { test, expect, renderTest } from "march/testing"
import { RowToolsLab } from "./RowToolsLab.tsx"

// RowToolsLab'in testleri: kaydedince Testler sekmesinde çalışır
const tool = (root: Element, label: string) => root.querySelector(`[aria-label="${label}"]`) as HTMLButtonElement
const names = (root: Element | null) => [...(root?.querySelectorAll("button") ?? [])].map((b) => b.getAttribute("aria-label"))

test("uçlarda oklar kapalı; aşağı taşıyınca sıra ve onAction değişir", async () => {
  const s = renderTest(() => <RowToolsLab />)
  expect(tool(s.container, "Elma yukarı").disabled).toBe(true)
  expect(tool(s.container, "Kiraz aşağı").disabled).toBe(true)
  expect(tool(s.container, "Armut yukarı").disabled).toBe(false)
  await s.click(tool(s.container, "Elma aşağı"))
  expect(s.text()).toContain("Sıra: Armut, Elma, Kiraz · Son araç: down")
  expect(tool(s.container, "Elma aşağı").disabled).toBe(false)
  s.dispose()
})

test("silme: tek satır kalınca sil kapanır; grup adı ve danger", async () => {
  const s = renderTest(() => <RowToolsLab />)
  const group = s.container.querySelector('[aria-label="Elma araçları"]')!
  expect(group.getAttribute("role")).toBe("group")
  expect(tool(s.container, "Elma sil").classList.contains("m-icon-btn-danger")).toBe(true)
  await s.click(tool(s.container, "Kiraz sil"))
  await s.click(tool(s.container, "Armut sil"))
  expect(s.text()).toContain("Sıra: Elma · Son araç: remove")
  expect(tool(s.container, "Elma sil").disabled).toBe(true)
  s.dispose()
})

test("actions: kendi sıram, ad metni ve metin ikon", () => {
  const s = renderTest(() => <RowToolsLab />)
  expect(names(s.container.querySelector(".lab-order"))).toEqual(["Sil", "Yukarı"])
  expect(names(s.container.querySelector(".lab-move"))).toEqual(["Taşı yukarı", "Taşı aşağı"])
  expect(tool(s.container, "Metinle kaldır").textContent).toContain("Kaldır")
  expect(s.container.querySelectorAll('[aria-label^="Boyut"]').length).toBe(4)
  s.dispose()
})

test("disabled: Kilitle bütün araçları kapatır, Kilidi aç geri açar", async () => {
  const s = renderTest(() => <RowToolsLab />)
  expect([...s.container.querySelectorAll(".lab-off button")].every((b) => (b as HTMLButtonElement).disabled)).toBe(true)
  const lock = [...s.container.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Kilitle")!
  await s.click(lock)
  expect([...s.container.querySelectorAll(".lab-row button")].every((b) => (b as HTMLButtonElement).disabled)).toBe(true)
  await s.click(lock)
  expect(tool(s.container, "Armut yukarı").disabled).toBe(false)
  s.dispose()
})

test("onReorder: her satırda sürükleme tutamağı; tutamaktan sürüklenince sıra değişir", async () => {
  const s = renderTest(() => <RowToolsLab />)
  const grips = s.all(".lab-row .m-row-grip")
  expect(grips.length).toBe(3)
  expect(grips[0]!.getAttribute("aria-hidden")).toBe("true")
  const rows = s.all("ol > li")
  const first = rows[0]!.getBoundingClientRect(), last = rows[rows.length - 1]!.getBoundingClientRect()
  const at = (y: number) => ({ bubbles: true, cancelable: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: 1, clientX: first.left + 4, clientY: y })
  grips[0]!.dispatchEvent(new PointerEvent("pointerdown", at(first.top + 6)))
  const send = (type: string, y: number) => { for (const t of [window, document]) t.dispatchEvent(new PointerEvent(type, at(y))) }
  for (let y = first.top + 6; y <= last.bottom + 4; y += 6) send("pointermove", y)
  send("pointerup", last.bottom + 4)
  await s.flush()
  expect(s.text()).toContain("Sıra: Armut, Kiraz, Elma")
})
