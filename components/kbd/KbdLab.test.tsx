import { test, expect, renderTest } from "march/testing"
import { KbdLab } from "./KbdLab.tsx"

// KbdLab'in testleri: kaydedince Testler sekmesinde çalışır
test("düz metin gerçek bir <kbd> öğesinde durur", () => {
  const s = renderTest(() => <KbdLab />)
  expect(s.find("Esc")?.tagName).toBe("KBD")
  expect(s.find("Esc")?.classList.contains("m-kbd")).toBe(true)
})

test("keys platforma göre yazılır: mod sözcüğü görünmez", () => {
  const s = renderTest(() => <KbdLab />)
  const cmd = s.get(".lab-cmd")?.textContent ?? ""
  expect(cmd).toContain("K")
  expect(cmd).not.toContain("mod")
  expect(s.get(".lab-enter")?.textContent).toContain("Enter")
})

test("class m-kbd'nin yanına eklenir", () => {
  const s = renderTest(() => <KbdLab />)
  expect(s.get("kbd.lab-enter.m-kbd")).not.toBe(null)
})

test("keys canlı: alt ile'ye basınca tuş yeniden yazılır", async () => {
  const s = renderTest(() => <KbdLab />)
  const before = s.get(".lab-live")?.textContent
  await s.click("alt ile")
  const after = s.get(".lab-live")?.textContent ?? ""
  expect(after).not.toBe(before)
  expect(after).toContain("S")
})
