import { test, expect, renderTest } from "march/testing"
import { MenuLab } from "./MenuLab.tsx"

// MenuLab'in testleri: kaydedince Testler sekmesinde çalışır
// açılan panel tetiğin aria-controls'ündeki kimlikle bulunur (yüzen katmanda durur)
const panelOf = (trigger: Element) => document.getElementById(trigger.getAttribute("aria-controls") ?? "")

test("tetik menü ARIA'sını taşır ve basınca panel açılır", async () => {
  const s = renderTest(() => <MenuLab />)
  const trigger = s.get(".lab-file")!
  expect(trigger.getAttribute("aria-haspopup")).toBe("menu")
  expect(trigger.getAttribute("aria-expanded")).toBe("false")
  await s.click(trigger)
  expect(trigger.getAttribute("aria-expanded")).toBe("true")
  const panel = panelOf(trigger)!
  expect(panel.getAttribute("role")).toBe("menu")
  // gizli öğe çizilmez: Yeniden adlandır, Kopyala, Arşivle (kapalı), Sil
  expect(panel.querySelectorAll("[role=menuitem]").length).toBe(4)
  expect(panel.querySelector("[role=separator]")).not.toBe(null)
})

test("bir öğe seçilince onSelect çalışır ve menü kapanır", async () => {
  const s = renderTest(() => <MenuLab />)
  const trigger = s.get(".lab-file")!
  await s.click(trigger)
  const rename = Array.from(panelOf(trigger)!.querySelectorAll("[role=menuitem]")).find((x) => x.textContent?.includes("Yeniden adlandır"))!
  await s.click(rename)
  expect(s.sees("Seçilen: Yeniden adlandır")).toBe(true)
  expect(trigger.getAttribute("aria-expanded")).toBe("false")
})

test("radyo öğeleri aria-checked taşır; seçim değişir", async () => {
  const s = renderTest(() => <MenuLab />)
  const trigger = await s.click("Sırala")
  const radios = Array.from(panelOf(trigger)!.querySelectorAll("[role=menuitemradio]"))
  expect(radios.length).toBe(3)
  expect(radios[0].getAttribute("aria-checked")).toBe("true")
  await s.click(radios[1])
  expect(s.sees("Sıra: Tarih")).toBe(true)
})

test("Dropdown bir diyalog paneli açar; disabled tetiğe basılamaz", async () => {
  const s = renderTest(() => <MenuLab />)
  const tags = await s.click("Etiketler")
  expect(tags.getAttribute("aria-haspopup")).toBe("dialog")
  expect(tags.getAttribute("aria-expanded")).toBe("true")
  // içerik (close) => … işleviyle çizilir: Tamam ona basınca paneli kapatır
  await s.click("Tamam")
  expect(tags.getAttribute("aria-expanded")).toBe("false")
  await s.click("Kilitle")
  expect((s.all("button").find((b: Element) => b.getAttribute("aria-label") === "Kilitli") as HTMLButtonElement).disabled).toBe(true)
})
