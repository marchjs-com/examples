import { test, expect, renderTest } from "march/testing"
import { SliderLab } from "./SliderLab.tsx"

// SliderLab'ın testleri: kaydedince Testler sekmesinde çalışır
test("kaydırınca değer ve format'lı gösterim değişir; bırakınca onCommit", async () => {
  const s = renderTest(() => <SliderLab />)
  const volume = await s.type("Ses", 40)
  expect((volume as HTMLInputElement).value).toBe("40")
  expect(s.text().includes("Ses: 40 · 1 bırakış")).toBe(true)
  expect(volume.parentElement?.querySelector("output")?.textContent).toBe("%40")
})

test("min, max, step ve valueText input'ta; onChange sayar", async () => {
  const s = renderTest(() => <SliderLab />)
  const temp = s.get('[aria-label="Sıcaklık"]') as HTMLInputElement
  expect([temp.min, temp.max, temp.step]).toEqual(["16", "30", "0.5"])
  expect(temp.getAttribute("aria-valuetext")).toBe("21.5 derece")
  await s.type("Sıcaklık", 24)
  expect(s.text().includes("Termostat: 24 °C · 1 hareket")).toBe(true)
  expect(temp.getAttribute("aria-valuetext")).toBe("24 derece")
})

test("showValue={false} değeri kaldırır; track kendi izini çizer", () => {
  const s = renderTest(() => <SliderLab />)
  expect(s.get('[aria-label="Parlaklık"]')?.parentElement?.querySelector("output")).toBe(null)
  const battery = s.get('[aria-label="Pil"]')
  expect(battery?.classList.contains("m-slider-own")).toBe(true)
  expect(battery?.closest(".m-slider-wrap")?.querySelector("output")?.textContent).toBe("yüksek")
})

test("disabled ve readonly kilitler; invalid, describedby, id, name input'ta", () => {
  const s = renderTest(() => <SliderLab />)
  expect((s.get('[aria-label="Kilitli"]') as HTMLInputElement).disabled).toBe(true)
  expect((s.get('[aria-label="Salt okunur"]') as HTMLInputElement).disabled).toBe(true)
  const budget = s.get('[aria-label="Bütçe"]')
  expect(budget?.getAttribute("aria-invalid")).toBe("true")
  expect(budget?.getAttribute("aria-describedby")).toBe("lab-budget-error")
  expect(s.get("#lab-volume")?.getAttribute("name")).toBe("volume")
})
