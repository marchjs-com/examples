import { test, expect, renderTest } from "march/testing"
import { CheckMarkLab } from "./CheckMarkLab.tsx"

// CheckMarkLab'in testleri: kaydedince Testler sekmesinde çalışır
test("text ile metin görünür; varsayılanlar Yes / No / Partly ya da labels", () => {
  const s = renderTest(() => <CheckMarkLab />)
  expect(s.sees("Dahil")).toBe(true)
  expect(s.get(".lab-paid .m-checkmark-text")?.textContent).toBe("Ödendi")
  expect(s.get(".lab-paid")?.getAttribute("data-row")).toBe("7")
})

test("label={false} işareti süs yapar (aria-hidden)", () => {
  const s = renderTest(() => <CheckMarkLab />)
  expect(s.get(".lab-decor")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-decor")?.classList.contains("is-no")).toBe(true)
})

test("variant ve size sınıfları", () => {
  const s = renderTest(() => <CheckMarkLab />)
  expect(s.all(".m-checkmark-solid").length).toBeGreaterThan(0)
  expect(s.all(".m-checkmark-lg").length).toBe(1)
})

test("düğmeye basınca değerler hayır'dan evet'e döner", async () => {
  const s = renderTest(() => <CheckMarkLab />)
  expect(s.all(".m-checkmark-moves.is-no").length).toBeGreaterThan(0)
  await s.click("Hepsini aç")
  expect(s.all(".m-checkmark-moves.is-no").length).toBe(0)
  expect(s.sees("Hepsini kapat")).toBe(true)
})
