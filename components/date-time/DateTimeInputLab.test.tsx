import { test, expect, renderTest } from "march/testing"
import { DateTimeInputLab } from "./DateTimeInputLab.tsx"

// DateTimeInputLab'in testleri: kaydedince Testler sekmesinde çalışır
// değer UTC, düzenleme yerel saatte: beklenen değer testin saat dilimiyle hesaplanır
const FLIGHT = new Date("2026-03-14T09:30:00.000Z")
const local = (y: number, m: number, d: number, h: number, min: number) => new Date(y, m - 1, d, h, min).toISOString()

test("saat alanına yazınca UTC değer aynı günün yeni saatine geçer", async () => {
  const s = renderTest(() => <DateTimeInputLab />)
  const time = s.container.querySelector('[aria-label="Uçuş saati"]') as HTMLInputElement
  expect(time.value).toBe(`${String(FLIGHT.getHours()).padStart(2, "0")}:${String(FLIGHT.getMinutes()).padStart(2, "0")}`)
  await s.type(time, "10:45")
  expect(s.text()).toContain(`Uçuş (UTC): ${local(FLIGHT.getFullYear(), FLIGHT.getMonth() + 1, FLIGHT.getDate(), 10, 45)}`)
  s.dispose()
})

test("tarih yazılınca saat korunur; min / max dışı tarih geçersiz sayılır; onBlur sayar", async () => {
  const s = renderTest(() => <DateTimeInputLab />)
  const date = s.container.querySelector(".lab-flight input.m-date-input") as HTMLInputElement
  expect(date.getAttribute("placeholder")).toBe("gg.aa.yyyy")
  await s.type(date, "2026-03-20")
  expect(s.text()).toContain(`Uçuş (UTC): ${local(2026, 3, 20, FLIGHT.getHours(), FLIGHT.getMinutes())}`)
  await s.type(date, "2027-04-05")
  expect(date.getAttribute("aria-invalid")).toBe("true")
  expect(s.text()).toContain(`Uçuş (UTC): ${local(2026, 3, 20, FLIGHT.getHours(), FLIGHT.getMinutes())}`)
  date.dispatchEvent(new FocusEvent("blur"))
  await s.flush()
  expect(s.text()).toContain("odaktan çıkış: 1")
  s.dispose()
})

test("boş alana yalnız gün yazılınca defaultTime (09:00) kullanılır; ikon yok", async () => {
  const s = renderTest(() => <DateTimeInputLab />)
  expect(s.text()).toContain("Görüşme (UTC): —")
  const day = s.container.querySelector("#lab-call") as HTMLInputElement
  expect(day.getAttribute("placeholder")).toBe("Görüşme günü")
  expect(day.closest(".m-datetime")?.querySelector(".m-date-btn")).toBe(null)
  await s.type(day, "2026-04-05")
  expect(s.text()).toContain(`Görüşme (UTC): ${local(2026, 4, 5, 9, 0)}`)
  expect((s.container.querySelector('[aria-label="Görüşme saati"]') as HTMLInputElement).value).toBe("09:00")
  s.dispose()
})

test("Temizle değeri boşaltır; devre dışı ve yalnız okunur alanlar", async () => {
  const s = renderTest(() => <DateTimeInputLab />)
  const clear = [...s.container.querySelectorAll("button")].find((b) => b.textContent?.includes("Temizle"))!
  await s.click(clear)
  expect(s.text()).toContain("Uçuş (UTC): —")
  expect((s.container.querySelector('[aria-label="Uçuş saati"]') as HTMLInputElement).value).toBe("")
  expect((s.container.querySelector('[aria-label="Kapalı saat"]') as HTMLInputElement).disabled).toBe(true)
  expect((s.container.querySelector('[aria-label="Kilitli saat"]') as HTMLInputElement).readOnly).toBe(true)
  s.dispose()
})
