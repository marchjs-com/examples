import { test, expect, renderTest } from "march/testing"
import { TabsLab } from "./TabsLab.tsx"

// TabsLab'in testleri: kaydedince Testler sekmesinde çalışır. Sekmeler tabProps'un verdiği data-lab ile bulunur
test("Ekip'e basınca seçilir, onChange paneli değiştirir; rozet sekmede", async () => {
  const s = renderTest(() => <TabsLab />)
  const team = s.get("[data-lab='team']")!
  await s.click(team)
  expect(team.getAttribute("aria-selected")).toBe("true")
  expect(team.textContent).toContain("3")
  expect(s.sees("Seçili: team · 3 kişi")).toBe(true)
})

test("disabled sekme kilitli ve nedenini title'da söyler", () => {
  const s = renderTest(() => <TabsLab />)
  const billing = s.get("[data-lab='billing']")
  expect(billing?.hasAttribute("disabled")).toBe(true)
  expect(billing?.getAttribute("title")).toBe("Planınızda yok")
})

test("hidden sekme eylemle gelir; değişti noktası adını taşır; kapatma işareti onClose'u çağırır", async () => {
  const s = renderTest(() => <TabsLab />)
  expect(s.get("[data-lab='draft']")).toBe(null)
  await s.click("Taslağı göster")
  expect(s.get("[data-lab='draft']")).not.toBe(null)
  expect(s.find("kaydedilmedi")).not.toBe(null)
  await s.click(s.get("[data-lab='draft'] .m-tab-close")!)
  expect(s.get("[data-lab='draft']")).toBe(null)
})

test("panel={false} yalnız şerit çizer, bind:value seçimi yazar; <Tab> çocukları sekme olur", async () => {
  const s = renderTest(() => <TabsLab />)
  expect(s.get(".lab-tabs2 [role='tabpanel']")).toBe(null)
  await s.click("Küçük")
  expect(s.sees("Boyut: sm")).toBe(true)
  expect(s.all(".lab-tabs3 [role='tab']").length).toBe(3)
  expect(s.find("Son sekme")?.textContent).toBe("Üçüncü")
})
