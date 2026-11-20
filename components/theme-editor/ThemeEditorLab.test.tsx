import { test, expect, renderTest } from "march/testing"
import { ThemeEditorLab } from "./ThemeEditorLab.tsx"

// ThemeEditorLab'in testleri: düzenleyici bir parça olarak yüklenir; önce görünmesi beklenir
const ready = async () => {
  const s = renderTest(() => <ThemeEditorLab />)
  await s.wait(() => s.get(".lab-te .m-te-name"), { timeout: 5000 })
  return s
}

test("kendi metinler: sekme adları ve düzenleyicinin adı", async () => {
  const s = await ready()
  expect(s.get(".lab-te")?.getAttribute("aria-label")).toBe("Lab teması")
  expect(s.find("Palet")).toBeTruthy()
  expect(s.find("Çıktı")).toBeTruthy()
  expect(s.find("Tipografi")).toBe(null)
})

test("ad değişince onChange sayar, Kaydet onSave'e adı verir", async () => {
  const s = await ready()
  await s.type("Tema adı", "Lab neonu")
  expect(s.sees("Değişiklik: 0")).toBe(false)
  await s.click(".m-te-save")
  expect(s.sees("Kaydedilen: Lab neonu")).toBe(true)
})

test("kapalı parçalar: hazır temalar satırı, uygula düğmesi ve önizleme yok", async () => {
  const s = await ready()
  expect(s.get(".lab-te .m-te-bases")).toBe(null)
  expect(s.get(".lab-te .m-te-apply")).toBe(null)
  expect(s.get(".lab-te .m-te-stage")).toBe(null)
})

test("salt okunur açılınca ad alanı kilitlenir", async () => {
  const s = await ready()
  const locked = () => !!s.get(".lab-te .m-te-title input")?.hasAttribute("readonly")
  expect(locked()).toBe(false)
  await s.click("Salt okunur")
  await s.wait(locked, { timeout: 5000 })
  expect(locked()).toBe(true)
})
