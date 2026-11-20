import { test, expect, renderTest } from "march/testing"
import { ScrollProgressLab } from "./ScrollProgressLab.tsx"

// ScrollProgressLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir ilerleme çubuğu: adı ve 0–100 aralığı var", () => {
  const s = renderTest(() => <ScrollProgressLab />)
  const bar = s.get('.lab-progress [role="progressbar"]')
  expect(bar?.getAttribute("aria-label")).toBe("Sayfanın okunan kısmı")
  expect(bar?.getAttribute("aria-valuemin")).toBe("0")
})

test("satır içinde ve gradyan boyayla başlar; vurguya geçer", async () => {
  const s = renderTest(() => <ScrollProgressLab />)
  expect(s.get(".m-scroll-progress-inline.m-scroll-progress-gradient")).not.toBe(null)
  await s.click("vurgu")
  expect(s.get(".m-scroll-progress-accent")).not.toBe(null)
})

test("sabitleme anahtarı çubuğu sayfanın üstüne taşır", async () => {
  const s = renderTest(() => <ScrollProgressLab />)
  await s.click(s.all('[role="switch"]')[0]!)
  expect(s.get(".m-scroll-progress-fixed")).not.toBe(null)
  expect(s.get(".m-scroll-progress-inline")).toBe(null)
})

test("kutuyu ölçerken adı değişir", async () => {
  const s = renderTest(() => <ScrollProgressLab />)
  await s.click(s.all('[role="switch"]')[2]!)
  expect(s.get('.lab-progress [role="progressbar"]')?.getAttribute("aria-label")).toBe("Kutunun okunan kısmı")
})
