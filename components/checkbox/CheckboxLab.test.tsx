import { test, expect, renderTest } from "march/testing"
import { CheckboxLab } from "./CheckboxLab.tsx"

// CheckboxLab'in testleri: kaydedince Testler sekmesinde çalışır
// bir etiketin kutusu: etiketin metninden <input>'a
const boxOf = (el: Element | null) => el?.closest("label")?.querySelector("input") as HTMLInputElement

test("Koşullara basınca değer ve onChange birlikte değişir", async () => {
  const s = renderTest(() => <CheckboxLab />)
  expect(s.text().includes("Onay: hayır")).toBe(true)
  await s.click("Koşulları kabul ediyorum")
  expect(s.text().includes("Onay: evet · son: işaretlendi")).toBe(true)
  await s.click("Koşulları kabul ediyorum")
  expect(s.text().includes("Onay: hayır · son: kaldırıldı")).toBe(true)
})

test("devre dışı ve salt okunur kutular tıklanamaz; zorunlu ve geçersiz aria ile söylenir", () => {
  const s = renderTest(() => <CheckboxLab />)
  expect(boxOf(s.find("Devre dışı")).disabled).toBe(true)
  expect(boxOf(s.find("Salt okunur")).disabled).toBe(true)
  expect(boxOf(s.find("Koşulları kabul ediyorum")).required).toBe(true)
  const kvkk = boxOf(s.find("KVKK metnini okudum"))
  expect(kvkk.getAttribute("aria-invalid")).toBe("true")
  expect(kvkk.getAttribute("aria-describedby")).toBe("kvkk-error")
})

test("kısmi durum kutuya indeterminate olarak geçer", () => {
  const s = renderTest(() => <CheckboxLab />)
  expect(boxOf(s.find("Bazı dosyalar seçili")).indeterminate).toBe(true)
  expect(boxOf(s.find("Animasyonsuz")).checked).toBe(false)
})

test("etiketsiz kutu aria-label ile bulunur; id, name, class ve onClick ona gider", async () => {
  const s = renderTest(() => <CheckboxLab />)
  const row = s.find("Satırı seç") as HTMLInputElement
  expect(row.tagName).toBe("INPUT")
  expect(row.id).toBe("row-1")
  expect(row.name).toBe("rows")
  expect(row.closest(".lab-row") !== null).toBe(true)
  await s.click(row)
  expect(row.checked).toBe(true)
  expect(s.text().includes("Tıklama: 1")).toBe(true)
})
