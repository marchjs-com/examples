import { test, expect, renderTest } from "march/testing"
import { OverflowTextLab } from "./OverflowTextLab.tsx"

// OverflowTextLab'in testleri: kaydedince Testler sekmesinde çalışır
test("metin bir kez okunur; dir=auto ve kenarları soldurma sınıfı", () => {
  const s = renderTest(() => <OverflowTextLab />)
  const basic = s.get(".lab-basic")
  expect(basic?.getAttribute("dir")).toBe("auto")
  expect(basic?.getAttribute("class")).toContain("m-marquee-fade")
  expect(basic?.textContent).toBe("Haftalık etkinlik özeti: Kadıköy koşu grubu, Moda sahili buluşması, kitap kulübü ve akşam yemeği")
})

test("fade={false} üç nokta sınıfı verir; data-* öğeye geçer, disabled bir öznitelik değildir", () => {
  const s = renderTest(() => <OverflowTextLab />)
  const off = s.get(".lab-off")
  expect(off?.getAttribute("class")).toContain("m-marquee-ellipsis")
  expect(off?.getAttribute("data-kind")).toBe("lab")
  expect(off?.hasAttribute("disabled")).toBe(false)
})

test("duplicate={2}: içerik ve iki kopyası; kopyalar gizli ve etkisiz", () => {
  const s = renderTest(() => <OverflowTextLab />)
  const units = s.all(".lab-strip .m-marquee-unit")
  expect(units.length).toBe(3)
  expect(units[0]?.hasAttribute("aria-hidden")).toBe(false)
  expect(units.slice(1).map((u: Element) => u.getAttribute("aria-hidden"))).toEqual(["true", "true"])
  expect(units[2]?.hasAttribute("inert")).toBe(true)
})

test("Kaydırmayı kapat: hep tetikli metin de kaymaz", async () => {
  const s = renderTest(() => <OverflowTextLab />)
  await s.click("Kaydırmayı kapat")
  expect(s.find("Kaydırmayı aç")).not.toBe(null)
  await s.wait(400)
  expect(s.get(".lab-off")?.getAttribute("class")).not.toContain("is-running")
})
