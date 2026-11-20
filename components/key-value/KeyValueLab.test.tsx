import { test, expect, renderTest } from "march/testing"
import { KeyValueLab } from "./KeyValueLab.tsx"

// KeyValueLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir dl; columns sınıfı yazılır, gizli satır görünmez", () => {
  const s = renderTest(() => <KeyValueLab />)
  const kv = s.get(".lab-kv")!
  expect(kv.tagName).toBe("DL")
  expect(kv.classList.contains("m-kv-cols-2")).toBe(true)
  expect(s.sees("abc-123")).toBe(false)
})

test("null değer empty metnini, 0 kendisini gösterir", () => {
  const s = renderTest(() => <KeyValueLab />)
  expect(s.get(".lab-kv")!.textContent).toContain("(boş)")
  expect(s.get(".lab-kv")!.textContent).toContain("0")
})

test("gizli satır düğmeyle açılır", async () => {
  const s = renderTest(() => <KeyValueLab />)
  await s.click("Gizli satırı aç / kapa")
  expect(s.sees("abc-123")).toBe(true)
})

test("nesne verince anahtarlar etiket olur", () => {
  const s = renderTest(() => <KeyValueLab />)
  expect(s.sees("Çerçeve")).toBe(true)
  expect(s.sees("March")).toBe(true)
})
