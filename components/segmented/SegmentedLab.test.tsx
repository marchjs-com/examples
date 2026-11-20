import { test, expect, renderTest } from "march/testing"
import { SegmentedLab } from "./SegmentedLab.tsx"

// SegmentedLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bir parçaya basınca seçilir (aria-checked) ve değer yazıya çıkar", async () => {
  const s = renderTest(() => <SegmentedLab />)
  const day = await s.click("Gün")
  expect(day.getAttribute("aria-checked")).toBe("true")
  expect(s.find("Hafta")?.getAttribute("aria-checked")).toBe("false")
  expect(s.text().includes("Seçili: Gün")).toBe(true)
})

test("yalnız ikonlu parçanın adı title'dan gelir; onChange sayar", async () => {
  const s = renderTest(() => <SegmentedLab />)
  const system = await s.click("Sisteme uy")
  expect(system.getAttribute("aria-label")).toBe("Sisteme uy")
  expect(s.text().includes("Tema: system · 1 değişiklik")).toBe(true)
})

test("kapalı seçenek ipucuyla devre dışı; tıklamak değeri değiştirmez", async () => {
  const s = renderTest(() => <SegmentedLab />)
  const life = s.find("Ömür boyu") as HTMLButtonElement
  expect(life.disabled).toBe(true)
  expect(life.getAttribute("title")).toBe("Yakında")
  await s.click(life)
  expect(s.find("Aylık")?.getAttribute("aria-checked")).toBe("true")
})

test("role=radiogroup, id ilk parçada; invalid, labelledby, disabled, readonly", () => {
  const s = renderTest(() => <SegmentedLab />)
  expect(s.get('[aria-label="Dönem"]')?.getAttribute("role")).toBe("radiogroup")
  expect(s.get("#lab-period")?.textContent).toBe("Gün")
  const size = s.get(".lab-size")
  expect(size?.getAttribute("aria-invalid")).toBe("true")
  expect(size?.getAttribute("aria-labelledby")).toBe("lab-size-title")
  for (const name of ["Devre dışı", "Salt okunur"])
    expect(s.all(`[aria-label="${name}"] button`).every((b: Element) => (b as HTMLButtonElement).disabled)).toBe(true)
})
