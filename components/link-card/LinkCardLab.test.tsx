import { test, expect, renderTest } from "march/testing"
import { LinkCardLab } from "./LinkCardLab.tsx"

// LinkCardLab'in testleri: kaydedince Testler sekmesinde çalışır (kartlara basılmaz: bağlantılar sayfadan çıkar)
test("kartın tamamı bir bağlantı; class ve data-* bağlantıya gider", () => {
  const s = renderTest(() => <LinkCardLab />)
  const a = s.find("Tablo")?.closest("a")
  expect(a?.classList.contains("lab-table")).toBe(true)
  expect(a?.classList.contains("m-link-card")).toBe(true)
  expect(a?.getAttribute("href")).toContain("table")
  expect(a?.getAttribute("data-kind")).toBe("veri")
})

test("meta ve title canlı", async () => {
  const s = renderTest(() => <LinkCardLab />)
  expect(s.get(".lab-table .m-link-card-meta")?.textContent).toBe("★ 41")
  await s.click("Yıldız ver")
  expect(s.get(".lab-table .m-link-card-meta")?.textContent).toBe("★ 42")
  await s.click("Başlığı değiştir")
  expect(s.sees("Ağaç görünümü")).toBe(true)
})

test("arrow={false} oku çizmez; varsayılan ok süs olarak gizli", () => {
  const s = renderTest(() => <LinkCardLab />)
  expect(s.get(".lab-noarrow .m-link-card-arrow")).toBe(null)
  expect(s.get(".lab-table .m-link-card-arrow")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get("#agac")?.tagName).toBe("A")
})

test("lead ikon karosunun yerine geçer", () => {
  const s = renderTest(() => <LinkCardLab />)
  expect(s.get(".lab-lead .m-link-card-lead")).not.toBe(null)
  expect(s.get(".lab-lead .m-icon-tile")).toBe(null)
  expect(s.get(".lab-table .m-icon-tile")).not.toBe(null)
})
