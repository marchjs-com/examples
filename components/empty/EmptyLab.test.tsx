import { test, expect, renderTest } from "march/testing"
import { EmptyLab } from "./EmptyLab.tsx"

// EmptyLab'in testleri: kaydedince Testler sekmesinde çalışır
test("title verilmezse varsayılan başlık, title={false} başlığı kaldırır", () => {
  const s = renderTest(() => <EmptyLab />)
  const titles = s.all(".m-empty-title").map((e: Element) => e.textContent)
  expect(titles.length).toBe(4)
  expect(s.find("Başlıksız; ikon kendi düğümüm.")?.closest(".m-empty")?.querySelector(".m-empty-title")).toBe(null)
})

test("action() nesnesi düğme olur; basınca başlık erişimcisi güncellenir", async () => {
  const s = renderTest(() => <EmptyLab />)
  await s.click("Davet et")
  await s.flush()
  expect(s.sees("Davet edilen: 1")).toBe(true)
})

test("size=sm ve class köke eklenir; kendi düğüm olduğu gibi çizilir", () => {
  const s = renderTest(() => <EmptyLab />)
  const e = s.get(".lab-empty")
  expect(e?.classList.contains("m-empty-sm")).toBe(true)
  expect(s.get(".lab-art")?.textContent).toBe("🌵")
})
