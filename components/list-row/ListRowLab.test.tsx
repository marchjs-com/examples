import { test, expect, renderTest } from "march/testing"
import { ListRowLab } from "./ListRowLab.tsx"

// ListRowLab'in testleri: kaydedince Testler sekmesinde çalışır
test("href bağlantı yapar; active aria-current verir; tooltip title olur", async () => {
  const s = renderTest(() => <ListRowLab />)
  await s.flush()
  const a = s.get(".lab-link")!
  expect(a.tagName).toBe("A")
  expect(a.getAttribute("aria-current")).toBe("page")
  expect(a.getAttribute("title")).toBe("Ana sayfaya git")
})

test("onClick düğme yapar; basınca başlık ve selected (aria-pressed) değişir", async () => {
  const s = renderTest(() => <ListRowLab />)
  const b = s.get(".lab-btn")!
  expect(b.tagName).toBe("BUTTON")
  await s.click(b)
  expect(b.textContent).toContain("Düğme satırı (1)")
  expect(b.getAttribute("aria-pressed")).toBe("true")
})

test("disabled satır basılamaz", async () => {
  const s = renderTest(() => <ListRowLab />)
  const off = s.all("button").find((x: Element) => x.textContent!.includes("Kullanılamaz")) as HTMLButtonElement
  expect(off.disabled).toBe(true)
})

test("as=li seçenekler; tıklayınca aria-selected değişir; titleAs=h3", async () => {
  const s = renderTest(() => <ListRowLab />)
  const opts = s.all("[role=option]")
  expect(opts[0].tagName).toBe("LI")
  await s.click(opts[1])
  expect(opts[1].getAttribute("aria-selected")).toBe("true")
  expect(s.get("article h3")!.textContent).toBe("Karo")
})
