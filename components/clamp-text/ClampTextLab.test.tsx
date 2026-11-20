import { test, expect, renderTest } from "march/testing"
import { ClampTextLab } from "./ClampTextLab.tsx"

// ClampTextLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kendi metin: tamamını oku açar, kısalt katlar", async () => {
  const s = renderTest(() => <ClampTextLab />)
  await s.click("tamamını oku")
  // düğme yeniden çizilir: açıkken adı "kısalt", aria-expanded="true"
  expect(s.find("kısalt")?.closest("button")?.getAttribute("aria-expanded")).toBe("true")
  expect(s.get(".lab-labels .m-clamp-text")?.classList.contains("is-clamped")).toBe(false)
  await s.click("kısalt")
  expect(s.get(".lab-labels .m-clamp-text")?.classList.contains("is-clamped")).toBe(true)
})

test("denetimli: düğme onOpenChange'i çağırır, dışarıdan aç metni açar", async () => {
  const s = renderTest(() => <ClampTextLab />)
  await s.click("aç (denetimli)")
  expect(s.get(".lab-state")?.textContent).toBe("durum: açık · değişim: 1")
  await s.click("Dışarıdan katla")
  expect(s.get(".lab-controlled .m-clamp-text")?.classList.contains("is-clamped")).toBe(true)
  expect(s.find("aç (denetimli)")).not.toBe(null)
})

test("defaultOpen + collapsible={false}: açık başlar, düğme yok", () => {
  const s = renderTest(() => <ClampTextLab />)
  expect(s.get(".lab-default div.m-clamp-text")?.classList.contains("is-clamped")).toBe(false)
  expect(s.get(".lab-default button")).toBe(null)
})

test("expandable={false}: katlı kalır, düğme çıkmaz; as=\"span\"", () => {
  const s = renderTest(() => <ClampTextLab />)
  expect(s.get(".lab-fold span.m-clamp-text")?.classList.contains("is-clamped")).toBe(true)
  expect(s.get(".lab-fold button")).toBe(null)
})
