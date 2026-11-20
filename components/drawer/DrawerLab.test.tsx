import { test, expect, renderTest } from "march/testing"
import { DrawerLab } from "./DrawerLab.tsx"

// DrawerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("açılınca başlık ve içerik görünür", async () => {
  const s = renderTest(() => <DrawerLab startOpen={false} />)
  await s.click("Çekmeceyi aç")
  await s.flush(2)
  expect(s.sees("Duyurular")).toBe(true)
  expect(s.sees("Bugün iki yeni özellik yayında.")).toBe(true)
})

test("tutamaç handleLabel adını alır", async () => {
  const s = renderTest(() => <DrawerLab startOpen={false} />)
  await s.click("Çekmeceyi aç")
  await s.flush(2)
  expect(s.find("Çekmeceyi sürükle")).not.toBe(null)
})

test("snap ile ikinci durma noktasına geçer", async () => {
  const s = renderTest(() => <DrawerLab startOpen={false} />)
  await s.click("Çekmeceyi aç")
  await s.flush(2)
  await s.click("Boyutu değiştir")
  await s.flush(2)
  expect(s.get(".lab-snap")?.textContent).toBe("Durma noktası 1")
})

test("kenar seçilince çekmece o kenardan açılır", async () => {
  const s = renderTest(() => <DrawerLab startOpen={false} />)
  await s.click("Üst")
  await s.click("Çekmeceyi aç")
  await s.flush(2)
  expect(s.get(".lab-drawer")?.classList.contains("m-sheet-top")).toBe(true)
})
