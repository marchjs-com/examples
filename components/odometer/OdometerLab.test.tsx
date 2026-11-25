import { test, expect, renderTest } from "march/testing"
import { OdometerLab } from "./OdometerLab.tsx"

// OdometerLab'in testleri: kaydedince Testler sekmesinde çalışır
const drums = (el: Element | null) => [...(el?.querySelectorAll(".m-roll-d, .m-roll-s") ?? [])].map((c) => c.textContent).join("").replace(",", ".") // the decimal mark follows the language

test("hane sayısı sıfırla doldurur, kesir çarkı ayrılır, ad birimle okunur", () => {
  const s = renderTest(() => <OdometerLab />)
  expect(drums(s.get(".lab-mech .m-roll-vis"))).toBe("001234.5")
  expect(s.get(".lab-mech .m-odo-roll")!.getAttribute("class")).toContain("has-frac")
  expect(s.get(".lab-mech .m-odo")!.getAttribute("role")).toBe("img")
  expect(s.get(".lab-mech .m-odo")!.getAttribute("aria-label")).toContain("km")
})

test("artınca yalnız değişen çarklar döner; hane sayısı canlı değişir", async () => {
  const s = renderTest(() => <OdometerLab />)
  await s.click(".lab-up")
  expect(drums(s.get(".lab-mech .m-roll-vis"))).toBe("001245.6")
  expect(s.all(".lab-mech .m-roll-slot").length).toBeGreaterThan(0)
  await s.click(".lab-digits")
  expect(drums(s.get(".lab-mech .m-roll-vis"))).toBe("1245.6")
})

test("görünüm, kendi okunuş metni, çerçevesiz ve hareketsiz sayaç", async () => {
  const s = renderTest(() => <OdometerLab />)
  expect(s.get(".lab-digital .m-odo")!.getAttribute("class")).toContain("m-odo-digital")
  expect(s.get(".lab-flip .m-odo")!.getAttribute("aria-label")).toBe("Adımlar: 1234 adım")
  expect(s.get(".lab-still .m-odo")!.getAttribute("class")).toContain("m-odo-bare")
  expect(s.get(".lab-still .m-odo-unit")).toBeFalsy()
  await s.click(".lab-up")
  expect(s.get(".lab-still .m-roll-slot")).toBeFalsy()
})
