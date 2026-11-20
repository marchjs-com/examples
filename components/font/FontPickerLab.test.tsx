import { test, expect, renderTest } from "march/testing"
import { FontPickerLab } from "./FontPickerLab.tsx"

// FontPickerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kendi listeleri ve metinleri: cihaz ve kitaplık grupları", async () => {
  const s = renderTest(() => <FontPickerLab />)
  await s.wait(() => s.sees("Kitaplık"))
  expect(s.sees("Cihaz")).toBe(true)
  expect(s.find("Inter")).not.toBe(null)
})

test("aramada yazılan aile süzülür, eşleşmeyince kendi boş metni görünür", async () => {
  const s = renderTest(() => <FontPickerLab />)
  await s.type("Yazı tipi ara", "fira")
  await s.wait(() => s.all(".lab-fp [role=option]").length === 1)
  expect(s.get(".lab-fp [role=option]")?.getAttribute("aria-label")).toBe("Fira Code")
  await s.type("Yazı tipi ara", "zzz")
  await s.wait(() => s.sees("Hiçbiri tutmadı"))
  expect(s.all(".lab-fp [role=option]").length).toBe(0)
})

test("bir satıra basınca onPick seçimi kalınlığıyla verir", async () => {
  const s = renderTest(() => <FontPickerLab />)
  await s.wait(() => s.find("Inter") != null)
  await s.click(s.get(".lab-fp [role=option][aria-label=Inter]")!)
  await s.wait(() => s.sees("Seçim: Inter 700"))
})

test("kendi düğmesi açılır paneli açar; onOpenChange durumu bildirir", async () => {
  const s = renderTest(() => <FontPickerLab />)
  await s.click("Başlık yazısı: Georgia")
  await s.wait(() => s.sees("panel: açık"))
})
