// Tests for RowToolsLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <RowToolsLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - Tools are icon buttons named by the labels the Lab gives them, so the helper `tool` finds one by its aria-label.
// - The last test drives a drag with synthetic pointer events, which is why it computes positions from the rows.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { RowToolsLab } from "./RowToolsLab.tsx"

// Find a tool button by its accessible name.
const tool = (root: Element, label: string) => root.querySelector(`[aria-label="${label}"]`) as HTMLButtonElement
// The accessible names of all buttons inside an element, in order.
const names = (root: Element | null) => [...(root?.querySelectorAll("button") ?? [])].map((b) => b.getAttribute("aria-label"))

// index / count switch the arrows off at the ends of the list (up on the first row, down on the last); moving a row
// changes the order, and onAction reports the tool that was used.
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

// The group has role="group" and the name from `labels.group`; `danger` styles the remove tool; when one row is left
// the disabled object turns its remove tool off.
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

// `actions` picks which tools exist and in which order (as an array or as a text); `labels` rename them; `icons` can be
// text instead of an icon; `size` is accepted in four sizes.
test("actions: kendi sıram, ad metni ve metin ikon", () => {
  const s = renderTest(() => <RowToolsLab />)
  expect(names(s.container.querySelector(".lab-order"))).toEqual(["Sil", "Yukarı"])
  expect(names(s.container.querySelector(".lab-move"))).toEqual(["Taşı yukarı", "Taşı aşağı"])
  expect(tool(s.container, "Metinle kaldır").textContent).toContain("Kaldır")
  expect(s.container.querySelectorAll('[aria-label^="Boyut"]').length).toBe(4)
  s.dispose()
})

// disabled on everything turns every tool off; the Lab's lock switch toggles it for the list and back again.
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

// With onReorder every row has a drag grip (hidden from screen readers). The test presses the first grip, moves the
// pointer down past the last row and releases; onReorder runs once on drop and the order changes.
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
