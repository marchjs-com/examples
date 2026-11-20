import { test, expect, renderTest } from "march/testing"
import { DebuggerLab } from "./DebuggerLab.tsx"

// DebuggerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("başta beklemede; kendi metinleri ve başlığı görünür", () => {
  const s = renderTest(() => <DebuggerLab />)
  expect(s.sees("Beklemede")).toBe(true)
  expect(s.get(".lab-dbg")?.getAttribute("aria-label")).toBe("Toplam avı")
})

test("Koş: kesme noktasında durur, onStart sayılır", async () => {
  const s = renderTest(() => <DebuggerLab />)
  await s.click("Koş (F5)")
  await s.wait(() => s.sees("Durakta durdu"))
  expect(s.sees("Koşu: 1")).toBe(true)
  expect(s.find("Sürdür (F8)")?.hasAttribute("disabled")).toBe(false)
})

test("Bitir onStop'u çağırır ve oturum biter", async () => {
  const s = renderTest(() => <DebuggerLab />)
  await s.click("Koş (F5)")
  await s.wait(() => s.sees("Durakta durdu"))
  await s.click("Bitir (Shift+F5)")
  expect(s.sees("Bitirme: 1")).toBe(true)
  expect(s.sees("Beklemede")).toBe(true)
})

test("kesme noktasının satırına basınca onReveal dosyayı ve satırı verir", async () => {
  const s = renderTest(() => <DebuggerLab />)
  // (aynı adı taşıyan onay kutusu değil, yanındaki satır düğmesi)
  await s.click(s.get(".lab-dbg button.m-dbg-at")!)
  expect(s.sees("Git: toplam.js:3")).toBe(true)
})
