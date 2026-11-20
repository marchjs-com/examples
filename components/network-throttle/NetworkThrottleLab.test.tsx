import { test, expect, renderTest } from "march/testing"
import { NetworkThrottleLab } from "./NetworkThrottleLab.tsx"

// NetworkThrottleLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kendi ağları listelenir; panel adını label'dan alır", () => {
  const s = renderTest(() => <NetworkThrottleLab />)
  expect(s.sees("Kafe Wi-Fi")).toBe(true)
  expect(s.sees("Metroda")).toBe(true)
  expect(s.get(".lab-net")?.getAttribute("aria-label")).toBe("Önizlemenin ağı")
})

test("bir ağ seçilince onChange onu bildirir", async () => {
  const s = renderTest(() => <NetworkThrottleLab />)
  await s.click("Metroda")
  expect(s.get(".lab-last")?.textContent).toContain("\"latency\":900")
  await s.click("Kısıtsız")
  expect(s.get(".lab-last")?.textContent).toContain("{}")
})

test("hız göstergesi ve istek şelalesi görünür", () => {
  const s = renderTest(() => <NetworkThrottleLab />)
  expect(s.get(".lab-net .m-nt-gauge")).toBeTruthy()
  expect(s.get(".lab-net .m-nt-log")).toBeTruthy()
})
