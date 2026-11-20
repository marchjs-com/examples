import { test, expect, renderTest } from "march/testing"
import { LayoutLab } from "./LayoutLab.tsx"

// LayoutLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bütün bölgeler çizilir", () => {
  const s = renderTest(() => <LayoutLab />)
  for (const t of ["Duyuru", "Üst bilgi", "Gezinme", "Yan alan", "Alt bilgi", "Ana içerik"]) expect(s.sees(t)).toBe(true)
})

test("ana bölgenin kimliği mainId", () => {
  const s = renderTest(() => <LayoutLab />)
  expect(s.get("#lab-main")).not.toBe(null)
})

test("class köke eklenir", () => {
  const s = renderTest(() => <LayoutLab />)
  expect(s.get(".lab-layout")).not.toBe(null)
})

test("titleTemplate useLayout ile okunur, skipLink etiketiyle çizilir, köşe içeriği eklenir", () => {
  const s = renderTest(() => <LayoutLab />)
  expect(s.get(".lab-template")?.textContent).toBe("Başlık kalıbı: %s · Laboratuvar")
  expect(s.get(".lab-layout .m-skip")?.textContent).toBe("İçeriğe atla")
  expect(document.querySelector(".lab-corner")?.textContent).toBe("Taslak")
})
