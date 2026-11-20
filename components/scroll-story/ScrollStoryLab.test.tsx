import { test, expect, renderTest } from "march/testing"
import { ScrollStoryLab } from "./ScrollStoryLab.tsx"

// ScrollStoryLab'in testleri: kaydedince Testler sekmesinde çalışır
test("üç adım, başlıkları h3; numaralar kendi metniyle", () => {
  const s = renderTest(() => <ScrollStoryLab />)
  expect(s.all(".lab-story .m-story-step h3").map((h: Element) => h.textContent)).toEqual(["Planla", "Davet et", "Buluş"])
  expect(s.get(".lab-story .m-story-num")?.textContent).toBe("Adım 1")
})

test("numara seçimi: 01 ya da hiç", async () => {
  const s = renderTest(() => <ScrollStoryLab />)
  await s.click("01")
  expect(s.get(".lab-story .m-story-num")?.textContent).toBe("01")
  await s.click("numarasız")
  expect(s.get(".lab-story .m-story-num")).toBe(null)
})

test("noktalar ve adıma göre renk anahtarlarla kapanır", async () => {
  const s = renderTest(() => <ScrollStoryLab />)
  expect(s.get(".lab-story .m-story-dots")).not.toBe(null)
  expect(s.get(".lab-story")?.classList.contains("is-themed")).toBe(true)
  await s.click("Noktalar")
  await s.click("Adıma göre renk")
  expect(s.get(".lab-story .m-story-dots")).toBe(null)
  expect(s.get(".lab-story")?.classList.contains("is-themed")).toBe(false)
})

test("görsel başa alınır; her adımın görseli var", async () => {
  const s = renderTest(() => <ScrollStoryLab />)
  await s.click("başta")
  expect(s.get(".lab-story")?.classList.contains("m-story-media-start")).toBe(true)
  expect(s.all(".lab-story .m-story-media").length).toBe(3)
})
