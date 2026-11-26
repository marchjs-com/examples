// Tests for TimeInputLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TimeInputLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
//   s.container is the root element, so s.container.querySelector(…) finds things inside it.
// - s.type(input, "09:15") puts a value into the field and fires the events a user would, then waits until the view
//   has updated (that is why the test awaits it). s.click(textOrElement) does the same for a click. s.flush() just
//   waits for the view to update after you fired an event yourself (dispatchEvent). s.text() is all visible text,
//   s.sees(text) asks if a text is visible, s.get(selector) returns the first match, s.dispose() removes the root.
// - The tests check what a user or a screen reader can observe (the attributes on the field, the visible text)
//   rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { TimeInputLab } from "./TimeInputLab.tsx"

// bind:value both ways: typing a time updates the text beside the field, and the second field that is bound to the
// same signal (in the dark card) shows the new value too. `name` and `class` reach the input element.
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

// min / max / step / required are written to the input as attributes (what the browser and assistive technology
// read). A time outside working hours makes `invalid` true, which shows up as aria-invalid="true" on the field.
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

// The one-way form: step={1} makes the field accept seconds, and onChange hands the new "HH:MM:SS" value to the Lab,
// which writes it into the text beside the field.
test("value + onChange: saniyeli alarm değişince metin de değişir", async () => {
  const s = renderTest(() => <TimeInputLab />)
  const alarm = s.container.querySelector('[aria-label="Alarm"]') as HTMLInputElement
  expect(alarm.getAttribute("step")).toBe("1")
  await s.type(alarm, "07:00:15")
  expect(s.text()).toContain("Alarm: 07:00:15")
  s.dispose()
})

// States and wiring: disabled and readonly reach the element, describedby links the hint text, and onFocus / onBlur
// fire. Focus events are dispatched by hand here, then s.flush() waits for the text to update.
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

// The clock dial, driven only by the keyboard like a user without a mouse: the button (named by labels.choose) opens
// the dial; its face is a slider (role="slider"). ArrowUp steps the hour, Enter moves to the minutes, ArrowUp steps the
// minute. The dial may be drawn outside the test root, so the face is looked up in the whole document as a fallback.
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
