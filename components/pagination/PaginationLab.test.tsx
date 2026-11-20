import { test, expect, renderTest } from "march/testing"
import { PaginationLab } from "./PaginationLab.tsx"

// PaginationLab'in testleri: kaydedince Testler sekmesinde çalışır
test("labels.page ile adlanan sayfaya basınca geçerli sayfa olur, onPage çağrılır", async () => {
  const s = renderTest(() => <PaginationLab />)
  await s.click("Sayfa 4")
  expect(s.get('.lab-numbers [aria-current="page"]')?.textContent).toBe("4")
  expect(s.find("Son seçilen: 4")).not.toBe(null)
  expect(s.get(".lab-numbers")?.getAttribute("aria-label")).toBe("Sonuç sayfaları")
})

test("Önceki / Sonraki: kendi adı ve metni, başta Önceki kapalı", async () => {
  const s = renderTest(() => <PaginationLab />)
  const prev = s.find("Önceki sayfa") as HTMLButtonElement | null
  expect(prev?.textContent).toBe("‹ Geri")
  expect(prev?.disabled).toBe(true)
  await s.click("Sonraki sayfa")
  expect(s.get('.lab-numbers [aria-current="page"]')?.textContent).toBe("2")
  expect(s.get(".lab-numbers .m-page-gap")?.textContent).toBe("·")
})

test("controls / gap kapalı; total + size sayfa sayısını verir", () => {
  const s = renderTest(() => <PaginationLab />)
  expect(s.all(".lab-bare .m-page-nav").length).toBe(0)
  expect(s.get(".lab-bare .m-page-gap")).toBe(null)
  expect(s.all(".lab-total .m-page-btn").map((b: Element) => b.textContent)).toEqual(["1", "2", "3", "4", "5"])
})

test("yalın görünüm kendi metinlerini yazar; imleç kipi hasNext / onNext ile ilerler", async () => {
  const s = renderTest(() => <PaginationLab />)
  expect(s.get(".lab-simple .m-page-info")?.textContent).toBe("21–40 / 134 satır")
  expect(s.get(".lab-simple .m-page-status")?.textContent).toBe("Sayfa 2 / 7")
  expect(s.get('.lab-simple select')?.getAttribute("aria-label")).toBe("Satır sayısı")
  expect((s.find("Daha yeni") as HTMLButtonElement | null)?.disabled).toBe(true)
  await s.click("Daha eski")
  expect(s.find("Yığın 2")).not.toBe(null)
})
