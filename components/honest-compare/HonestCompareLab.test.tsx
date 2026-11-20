import { test, expect, renderTest } from "march/testing"
import { HonestCompareLab } from "./HonestCompareLab.tsx"

// HonestCompareLab'in testleri: kaydedince Testler sekmesinde çalışır
test("özet kendi sayım metniyle; başlık ve bölge adı", () => {
  const s = renderTest(() => <HonestCompareLab />)
  expect(s.get(".lab-hc .m-hc-counts")?.textContent).toBe("2 önde · 0 eşit · 2 geride")
  expect(s.get(".lab-hc caption")?.textContent).toBe("İşe nasıl gidelim?")
  expect(s.find("Ulaşım tablosu")).not.toBe(null)
})

test("geride kalan satırlar etiketli; süzgeç yalnız onları bırakır", async () => {
  const s = renderTest(() => <HonestCompareLab />)
  expect(s.all(".lab-hc .m-hc-tag.is-behind").length).toBe(2)
  await s.click("Yalnız geride olduklarımız")
  expect(s.all(".lab-hc tr.m-hc-row.is-hidden").length).toBe(3)
  expect(s.find("Hepsini göster")).not.toBe(null)
})

test("etiketler kapanınca gider", async () => {
  const s = renderTest(() => <HonestCompareLab />)
  await s.click("Etiketler")
  expect(s.container.querySelector(".lab-hc .m-hc-tag")).toBe(null)
})

test("kendi hücre çizimi: Var / Yok, kendi sütunumuz işaretli", async () => {
  const s = renderTest(() => <HonestCompareLab />)
  await s.click("Yazıyla hücreler")
  expect(s.all(".lab-hc b.lab-mine").length).toBe(3)
  expect(s.get(".lab-hc b.lab-mine")?.textContent).toBe("Var")
})
