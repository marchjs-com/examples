import { test, expect, renderTest } from "march/testing"
import { PopoverLab } from "./PopoverLab.tsx"

// PopoverLab'in testleri: kaydedince Testler sekmesinde çalışır
test("tetikleyiciye basınca panel açılır ve nedeni yazılır", async () => {
  const s = renderTest(() => <PopoverLab />)
  await s.click("Ayrıntı")
  await s.flush(2)
  expect(s.get(".lab-why")?.textContent).toContain("açıldı")
  expect(s.sees("Alt bilgi")).toBe(true)
})

test("işlev çocuğun close'u paneli kapatır", async () => {
  const s = renderTest(() => <PopoverLab />)
  await s.click("Ayrıntı")
  await s.flush(2)
  await s.click("Tamam")
  await s.flush(2)
  expect(s.get(".lab-why")?.textContent).toContain("kapandı")
})

test("id, flush ve panelProps panele geçer", async () => {
  const s = renderTest(() => <PopoverLab />)
  await s.click("Değiştir")
  await s.flush(2)
  const p = document.getElementById("lab-cities")
  expect(p).not.toBe(null)
  expect(p?.getAttribute("data-lab")).toBe("şehir")
  expect(p?.className).toContain("is-flush")
  await s.click("Değiştir")
  await s.flush(2)
})

test("şehir seçilince alan değişir, panel kapanır", async () => {
  const s = renderTest(() => <PopoverLab />)
  await s.click("Değiştir")
  await s.flush(2)
  await s.click("Ankara")
  await s.flush(2)
  expect(s.get(".lab-field")?.textContent).toBe("Şehir: Ankara")
  expect(s.sees("Antalya")).toBe(false)
})
