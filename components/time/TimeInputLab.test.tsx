import { test, expect, renderTest } from "march/testing"
import { TimeInputLab } from "./TimeInputLab.tsx"

// TimeInputLab'in testleri: kaydedince Testler sekmesinde çalışır
test("bind:value: yazılan saat metne ve koyu zemindeki alana geçer", async () => {
  const s = renderTest(() => <TimeInputLab />)
  const meet = s.container.querySelector('[name="meeting"]') as HTMLInputElement
  expect(meet.getAttribute("name")).toBe("meeting")
  expect(meet.classList.contains("lab-time")).toBe(true)
  await s.type(meet, "09:15")
  expect(s.text()).toContain("Toplantı: 09:15")
  expect((s.container.querySelector("#lab-night-meeting") as HTMLInputElement).value).toBe("09:15")
  s.dispose()
})

test("min / max / step / required özniteliklere yazılır; mesai dışı saat geçersiz olur", async () => {
  const s = renderTest(() => <TimeInputLab />)
  const slot = s.container.querySelector('[aria-label="Randevu"]') as HTMLInputElement
  expect(slot.getAttribute("min")).toBe("09:00")
  expect(slot.getAttribute("max")).toBe("17:00")
  expect(slot.getAttribute("step")).toBe("900")
  expect(slot.required).toBe(true)
  expect(slot.hasAttribute("aria-invalid")).toBe(false)
  await s.type(slot, "18:30")
  expect(slot.getAttribute("aria-invalid")).toBe("true")
  expect(s.text()).toContain("Randevu: 18:30 (mesai dışı)")
  s.dispose()
})

test("value + onChange: saniyeli alarm değişince metin de değişir", async () => {
  const s = renderTest(() => <TimeInputLab />)
  const alarm = s.container.querySelector('[aria-label="Alarm"]') as HTMLInputElement
  expect(alarm.getAttribute("step")).toBe("1")
  await s.type(alarm, "07:00:15")
  expect(s.text()).toContain("Alarm: 07:00:15")
  s.dispose()
})

test("disabled, readonly, describedby ve odak olayları", async () => {
  const s = renderTest(() => <TimeInputLab />)
  expect((s.container.querySelector('[aria-label="Kapalı saat"]') as HTMLInputElement).disabled).toBe(true)
  expect((s.container.querySelector('[aria-label="Öğle arası"]') as HTMLInputElement).readOnly).toBe(true)
  const deadline = s.container.querySelector('[aria-label="Son teslim"]') as HTMLInputElement
  expect(deadline.getAttribute("aria-describedby")).toBe("lab-deadline-hint")
  deadline.dispatchEvent(new FocusEvent("focus"))
  await s.flush()
  expect(s.text()).toContain("Odak: Son teslim")
  deadline.dispatchEvent(new FocusEvent("blur"))
  await s.flush()
  expect(s.text()).toContain("Odak: yok")
  s.dispose()
})

test("saat kadranı: düğme kadranı açar, klavye saati sonra dakikayı seçer", async () => {
  const s = renderTest(() => <TimeInputLab />)
  await s.click("Kadranı aç")
  const face = s.get(".m-clock-face") ?? document.querySelector(".m-clock-face")!
  expect(face.getAttribute("role")).toBe("slider")
  face.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }))
  await s.flush()
  expect(s.sees("Kadran: 08:15")).toBe(true)
  face.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }))
  face.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }))
  await s.flush()
  expect(s.sees("Kadran: 08:16")).toBe(true)
})
