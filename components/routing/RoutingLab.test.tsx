import { test, expect, renderTest } from "march/testing"
import { RoutingLab } from "./RoutingLab.tsx"

// RoutingLab'in testleri: kaydedince Testler sekmesinde çalışır
test("şehre gidince adres ve sayfa değişir, not yerinde kalır", async () => {
  const s = renderTest(() => <RoutingLab />)
  await s.flush(3)
  await s.type(".lab-note", "unutma")
  await s.click("Aç")
  await s.flush(3)
  expect(s.get(".lab-path")?.textContent).toContain("/sehir/")
  expect(s.get(".lab-city")).not.toBe(null)
  expect((s.get(".lab-note") as HTMLInputElement | null)?.value).toBe("unutma")
})

test("yanda açınca liste kalır, yan panel dolar", async () => {
  const s = renderTest(() => <RoutingLab />)
  await s.flush(3)
  await s.click("Yanda")
  await s.flush(3)
  expect(s.get(".lab-aside-empty")).toBe(null)
  expect(s.sees("Z → A sırala")).toBe(true)
})

test("guard: yönetici değilken yönetim şehirlere döner", async () => {
  const s = renderTest(() => <RoutingLab />)
  await s.flush(3)
  await s.click("Yönetim")
  await s.flush(3)
  expect(s.get(".lab-admin")).toBe(null)
  await s.click("Yönetici girişi (guard)")
  await s.click("Yönetim")
  await s.flush(3)
  expect(s.get(".lab-admin")).not.toBe(null)
})

test("eski adres yönlendirilir, bilinmeyen adres notFound gösterir", async () => {
  const s = renderTest(() => <RoutingLab />)
  await s.flush(3)
  await s.click("Eski adres")
  await s.flush(3)
  expect(s.get(".lab-about")).not.toBe(null)
  await s.click("Kayıp sayfa")
  await s.flush(3)
  expect(s.get(".lab-404")).not.toBe(null)
})
