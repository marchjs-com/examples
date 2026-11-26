// Tests for TextInputLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TextInputLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(name or element, text) types into an input found by its accessible name (the `aria-label`) and returns it; s.find
//   finds an element by that name; s.get finds by CSS selector; s.text() is all the visible text; s.flush() lets pending
//   ticks run. Events that s.type does not send (an Enter key, a paste) are dispatched by hand on the input.
// - The tests check what a user or a screen reader can observe (the written text, aria-invalid, aria-describedby, disabled,
//   readonly) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the field's name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { TextInputLab } from "./TextInputLab.tsx"

// `transform` upper-cases what is typed, `onChange` counts the change (once), and maxLength reaches the input as the
// maxlength attribute.
test("transform yazılanı büyük harfe çevirir, onChange sayar", async () => {
  const s = renderTest(() => <TextInputLab />)
  await s.type("Kupon kodu", "hadi10")
  expect(s.text().includes("Kod: HADI10 · değişiklik: 1")).toBe(true)
  expect(s.find("Kupon kodu")?.getAttribute("maxlength")).toBe("10")
})

// An input with its own `error` text (no Field) is invalid and linked to the message (aria-invalid, aria-describedby ending
// in the error's id). Once the value is valid the message and the invalid state go away.
test("error metni varken alan geçersiz ve açıklamalı; düzelince temizlenir", async () => {
  const s = renderTest(() => <TextInputLab />)
  const mail = s.find("E-posta adresi")!
  expect(s.text().includes("Geçerli bir e-posta yazın")).toBe(true)
  expect(mail.getAttribute("aria-invalid")).toBe("true")
  expect(mail.getAttribute("aria-describedby")).toContain("-err")
  await s.type(mail, "ayse@hadisosyal.com")
  expect(s.text().includes("Geçerli bir e-posta yazın")).toBe(false)
  expect(mail.getAttribute("aria-invalid")).toBe(null)
})

// onKeyDown receives Enter and sends the note; onPaste calls preventDefault, so the pasted text is reported but never
// enters the input (its value stays empty); `ref` gave the Lab the real <input> element.
test("Enter notu gönderir, yapıştırma girdiye yazılmaz, ref girdiyi verir", async () => {
  const s = renderTest(() => <TextInputLab />)
  const note = await s.type("Not", "süt al")
  note.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }))
  await s.flush()
  expect(s.text().includes("Gönderilen: süt al")).toBe(true)
  const data = new DataTransfer()
  data.setData("text/plain", "kopyalanan metin")
  note.dispatchEvent(new ClipboardEvent("paste", { clipboardData: data, bubbles: true, cancelable: true }))
  await s.flush()
  expect(s.text().includes("yapıştırılan: kopyalanan metin")).toBe(true)
  expect((note as HTMLInputElement).value).toBe("")
  expect(s.text().includes("ref: INPUT")).toBe(true)
})

// The states reach the native input as real attributes: disabled, readonly and aria-invalid with aria-describedby pointing
// at our own hint; a suffix is drawn as text next to the input.
test("durumlar: devre dışı, salt okunur, geçersiz + describedby, son ek", () => {
  const s = renderTest(() => <TextInputLab />)
  expect(s.find("Devre dışı alan")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("IBAN")?.hasAttribute("readonly")).toBe(true)
  expect(s.get("#lab-invalid")?.getAttribute("aria-invalid")).toBe("true")
  expect(s.get("#lab-invalid")?.getAttribute("aria-describedby")).toBe("lab-invalid-hint")
  expect(s.get(".lab-subdomain")?.textContent).toContain(".hadisosyal.com")
})
