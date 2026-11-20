import { test, expect, renderTest } from "march/testing"
import { DisclosureLab } from "./DisclosureLab.tsx"

// DisclosureLab'in testleri: kaydedince Testler sekmesinde çalışır
test("open sinyali details'in açık durumunu sürer", async () => {
  const s = renderTest(() => <DisclosureLab />)
  const d = s.get(".lab-live") as HTMLDetailsElement
  expect(d.open).toBe(true)
  await s.click(".lab-flip")
  expect(d.open).toBe(false)
})

test("marker={false} oku kaldırır", () => {
  const s = renderTest(() => <DisclosureLab />)
  expect(s.get(".lab-plain")?.classList.contains("m-disclosure-no-marker")).toBe(true)
  expect(s.get(".lab-plain .m-disclosure-chev")).toBe(null)
})

test("kendi işaretin ok yerine çizilir", () => {
  const s = renderTest(() => <DisclosureLab />)
  expect(s.get(".lab-own .m-disclosure-marker")).not.toBe(null)
})
