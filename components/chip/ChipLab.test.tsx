import { test, expect, renderTest } from "march/testing"
import { ChipLab } from "./ChipLab.tsx"

// ChipLab'in testleri: kaydedince Testler sekmesinde çalışır
test("tone ve size sınıf olur; class çipe eklenir", () => {
  const s = renderTest(() => <ChipLab />)
  expect(s.find("danger")?.closest(".m-chip2")?.className.includes("m-chip2-danger")).toBe(true)
  expect(s.find("Küçük")?.closest(".m-chip2")?.className.includes("m-chip2-sm")).toBe(true)
  expect(s.get(".lab-new")?.className.includes("m-chip2")).toBe(true)
})

test("selected + onClick bir aç / kapa düğmesidir (aria-pressed)", async () => {
  const s = renderTest(() => <ChipLab />)
  const liked = await s.click("Beğenilen")
  expect(liked.getAttribute("aria-pressed")).toBe("true")
  expect(liked.closest(".m-chip2")?.className.includes("is-selected")).toBe(true)
  const starred = await s.click("Yıldızlı")
  expect(starred.getAttribute("aria-pressed")).toBe("false")
})

test("onRemove kaldırma düğmesini ekler; removeLabel onun adıdır", async () => {
  const s = renderTest(() => <ChipLab />)
  expect(s.sees("Ürün")).toBe(true)
  await s.click("Ürün etiketini sil")
  expect(s.sees("Ürün")).toBe(false)
  expect(s.find("Tasarım etiketini sil")?.tagName).toBe("BUTTON")
})

test("selected olmadan onClick de düğme yapar ve çağrılır", async () => {
  const s = renderTest(() => <ChipLab />)
  await s.click("Tıklandı: 0")
  expect(s.sees("Tıklandı: 1")).toBe(true)
})
