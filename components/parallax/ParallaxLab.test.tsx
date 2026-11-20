import { test, expect, renderTest } from "march/testing"
import { ParallaxLab } from "./ParallaxLab.tsx"

// ParallaxLab'in testleri: kaydedince Testler sekmesinde çalışır
test("üç katman, sınıfları ve önde başlık var", () => {
  const s = renderTest(() => <ParallaxLab />)
  expect(s.all(".lab-plx .m-plx-layer").length).toBe(3)
  expect(s.get(".lab-glow")).not.toBe(null)
  expect(s.find("Katman katman derinlik")).not.toBe(null)
})

test("görsel katmanın adresi ve açıklaması", () => {
  const s = renderTest(() => <ParallaxLab />)
  const img = s.get(".lab-far img")
  expect(img?.getAttribute("src")).toContain("hadi-waves.jpg")
  expect(img?.getAttribute("alt")).toBe("Dalgalar")
})

test("katmanın hızı derinlik olarak yazılır (uzak katman: eksi)", () => {
  const s = renderTest(() => <ParallaxLab />)
  expect(s.get(".lab-far")?.getAttribute("data-depth")).toBe("-0.45")
  expect(s.get(".lab-near")?.getAttribute("data-depth")).toBe("0.2")
})

test("anahtarlar: yakın katman gider, sahne yükselir", async () => {
  const s = renderTest(() => <ParallaxLab />)
  await s.click("Yakın katman")
  expect(s.all(".lab-plx .m-plx-layer").length).toBe(2)
  await s.click("Yüksek sahne")
  expect((s.get(".lab-plx") as HTMLElement).style.getPropertyValue("--m-plx-h")).toBe("30rem")
})
