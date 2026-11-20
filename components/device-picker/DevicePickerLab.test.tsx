import { test, expect, renderTest } from "march/testing"
import { DevicePickerLab } from "./DevicePickerLab.tsx"

// DevicePickerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kendi listesi: beş cihaz ve üst satırda kendi metniyle sığdır", () => {
  const s = renderTest(() => <DevicePickerLab />)
  const rows = s.all(".lab-picker .m-dpick-item")
  expect(rows.length).toBe(5)
  expect(s.get(".lab-picker .m-dpick-fit-btn")?.textContent).toContain("Tam ekran")
  expect(s.sees("Lobi kiosku")).toBe(true)
})

test("bir cihaza basınca seçilir", () => {
  const s = renderTest(() => <DevicePickerLab />)
  const ipad = s.all(".lab-picker .m-dpick-item").find((r: Element) => r.textContent?.startsWith("iPad")) as HTMLElement | undefined
  ipad?.click()
  expect(s.get(".lab-picked")?.textContent).toContain("ipad")
})

test("Yatay seçilince boyutlar yer değiştirir", () => {
  const s = renderTest(() => <DevicePickerLab />)
  expect(s.sees("820 × 1180")).toBe(true)
  // önizlemenin diline göre "Yatay" ya da "Landscape"
  const land = s.all("button").find((b: Element) => /^(Yatay|Landscape)$/.test(b.textContent?.trim() ?? "")) as HTMLElement | undefined
  land?.click()
  expect(s.sees("1180 × 820")).toBe(true)
  expect(s.get(".lab-picked")?.textContent).toContain("yatay")
})
