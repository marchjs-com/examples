import { test, expect, renderTest } from "march/testing"
import { AccordionLab } from "./AccordionLab.tsx"

// AccordionLab'in testleri: kaydedince Testler sekmesinde çalışır
test("open ile verilen iki bölüm baştan açık (multiple)", () => {
  const s = renderTest(() => <AccordionLab />)
  const heads = s.all(".lab-acc .m-acc-btn")
  expect(heads[0]?.getAttribute("aria-expanded")).toBe("true")
  expect(heads[1]?.getAttribute("aria-expanded")).toBe("true")
})

test("başlığa basınca bölüm kapanır ve onToggle olayı yazar", async () => {
  const s = renderTest(() => <AccordionLab />)
  await s.click(s.all(".lab-acc .m-acc-btn")[0]!)
  expect(s.all(".lab-acc .m-acc-btn")[0]?.getAttribute("aria-expanded")).toBe("false")
  expect(s.text()).toContain("profil kapandı")
})

test("disabled bölümün başlığı devre dışı", () => {
  const s = renderTest(() => <AccordionLab />)
  expect((s.all(".lab-acc .m-acc-btn")[2] as HTMLButtonElement).disabled).toBe(true)
})

test("chevron={false} ok çizmez", () => {
  const s = renderTest(() => <AccordionLab />)
  const plain = s.all(".m-accordion")[1]!
  expect(plain.querySelector(".m-acc-chev")).toBe(null)
})
