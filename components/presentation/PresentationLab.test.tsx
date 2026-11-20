import { test, expect, renderTest } from "march/testing"
import { PresentationLab } from "./PresentationLab.tsx"

// PresentationLab'in testleri: kaydedince Testler sekmesinde çalışır
test("deste adı, rolü, kendi sayacı; ilk slayt geçerli", () => {
  const s = renderTest(() => <PresentationLab />)
  const deck = s.get(".lab-deck")
  expect(deck?.getAttribute("aria-label")).toBe("Deneme sunumu")
  expect(deck?.getAttribute("aria-roledescription")).toBe("slayt destesi")
  expect(s.find("1 / 4")).not.toBe(null)
  expect(s.get(".lab-first")?.classList.contains("is-current")).toBeTruthy()
})

test("Sonraki: ikinci slayt, dışarıdaki sıra da değişir; sonra ilk adım belirir", async () => {
  const s = renderTest(() => <PresentationLab />)
  await s.click("Sonraki")
  expect(s.find("2 / 4")).not.toBe(null)
  expect(s.find("Dışarıdaki sıra: 2")).not.toBe(null)
  await s.click("Sonraki")
  expect(s.all(".lab-steps li.is-shown").length).toBe(1)
})

test("End tuşu son slayda gider", async () => {
  const s = renderTest(() => <PresentationLab />)
  await s.press("End", s.get(".lab-deck") as HTMLElement)
  await s.wait(() => s.find("4 / 4"), { timeout: 2000 })
  expect(s.find("4 / 4")).not.toBe(null)
})

test("denetimler kapanır; konuşmacı görünümü notu gösterir", async () => {
  const s = renderTest(() => <PresentationLab />)
  await s.click("Denetimler")
  expect(s.get(".m-deck-controls")).toBe(null)
  await s.click("Konuşmacı görünümü")
  expect(s.get(".m-deck-speaker")?.textContent).toContain("Merhaba de")
})
