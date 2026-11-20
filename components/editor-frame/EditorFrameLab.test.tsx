import { test, expect, renderTest } from "march/testing"
import { EditorFrameLab } from "./EditorFrameLab.tsx"

// EditorFrameLab'in testleri: kaydedince Testler sekmesinde çalışır
test("üst ve alt çubuk, kendi sınıfları ve öznitelikleriyle çizilir", () => {
  const s = renderTest(() => <EditorFrameLab />)
  const frame = s.get("#lab-frame")
  expect(frame?.getAttribute("data-kind")).toBe("note")
  expect(frame?.querySelector(".lab-head")).not.toBe(null)
  expect(frame?.querySelector(".lab-foot")?.getAttribute("aria-live")).toBe("polite")
  expect(s.sees("7 harf")).toBe(true)
})

test("showHead erişimcisi üst çubuğu gizler ve geri getirir", async () => {
  const s = renderTest(() => <EditorFrameLab />)
  await s.click("Araçları gizle")
  expect(s.get("#lab-frame .lab-head")).toBe(null)
  await s.click("Araçları göster")
  expect(s.get("#lab-frame .lab-head")).not.toBe(null)
})

test("durum: salt okunur, sonra devre dışı (alt çubuk da gider)", async () => {
  const s = renderTest(() => <EditorFrameLab />)
  await s.click("Durum: edit")
  expect(s.get("#lab-frame")?.className).toContain("is-readonly")
  await s.click("Durum: readonly")
  expect(s.get("#lab-frame")?.className).toContain("is-disabled")
  expect(s.get("#lab-frame .lab-foot")).toBe(null)
})

test("ring={false} halkasız, showFoot={false} foot'u gizler", () => {
  const s = renderTest(() => <EditorFrameLab />)
  expect(s.get(".lab-plain")?.className).toContain("is-plain")
  expect(s.sees("görünmez")).toBe(false)
})
