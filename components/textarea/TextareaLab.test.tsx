// Tests for TextareaLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TextareaLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(name, text) types into the field found by its accessible name (the `aria-label`) and returns it; s.find finds
//   an element by that name; s.get finds by CSS selector; s.text() is all the visible text.
// - Keys that s.type does not send (Tab, Escape, Ctrl + Enter) are sent by the small `key` helper below: it dispatches a
//   keydown event on the field and waits one tick. It returns the event, so a test can ask whether the component called
//   preventDefault() (`defaultPrevented`), which is how we tell "the Tab key was used by the field" from "Tab left it".
// - The tests check what a user or a screen reader can observe (the written text, attributes, classes) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the field's name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { TextareaLab } from "./TextareaLab.tsx"

// Sends a keydown for `k` (optionally with Ctrl) to `el`, waits a tick and returns the event.
const key = async (el: Element, k: string, ctrlKey = false) => {
  const e = new KeyboardEvent("keydown", { key: k, ctrlKey, bubbles: true, cancelable: true })
  el.dispatchEvent(e)
  await new Promise((r) => setTimeout(r, 0))
  return e
}

// Typing updates the bound value (the length is shown in the Lab) and calls onChange once; `rows` and `maxLength` reach the
// native element as attributes.
test("yazınca uzunluk ve onChange güncellenir; rows ve maxLength öğede", async () => {
  const s = renderTest(() => <TextareaLab />)
  const bio = await s.type("Biyografi", "Merhaba")
  expect(s.text().includes("Uzunluk: 7/120 · değişiklik: 1")).toBe(true)
  expect(bio.getAttribute("rows")).toBe("3")
  expect(bio.getAttribute("maxlength")).toBe("120")
})

// With tabIndent={4} the Tab key inserts four spaces at the caret and its default (leaving the field) is prevented. After
// Escape, Tab is no longer used by the field, so it is not prevented and focus can move on (the way out for keyboard users).
test("tabIndent: Tab 4 boşluk girer; Esc'den sonra Tab alandan çıkar", async () => {
  const s = renderTest(() => <TextareaLab />)
  const code = await s.type("JSON", "{") as HTMLTextAreaElement
  code.selectionStart = code.selectionEnd = 1
  const tab = await key(code, "Tab")
  expect(tab.defaultPrevented).toBe(true)
  expect(code.value).toBe("{    ")
  expect(s.text().includes("Kod: 5 karakter")).toBe(true)
  await key(code, "Escape")
  expect((await key(code, "Tab")).defaultPrevented).toBe(false)
})

// onKeyDown receives Ctrl + Enter and sends the message: the Lab shows it as sent and clears the field. `ref` gave the Lab
// the real <textarea> element.
test("Ctrl + Enter mesajı gönderir ve alanı boşaltır; ref öğeyi verir", async () => {
  const s = renderTest(() => <TextareaLab />)
  const msg = await s.type("Mesaj", "Toplantı 15:00'te") as HTMLTextAreaElement
  await key(msg, "Enter", true)
  expect(s.text().includes("Gönderilen: Toplantı 15:00'te")).toBe(true)
  expect(msg.value).toBe("")
  expect(s.text().includes("ref: TEXTAREA")).toBe(true)
})

// The states reach the native element: disabled, readonly, and an invalid + required field whose aria-describedby points at
// our own hint. `mono` adds the monospace class, and autosize={false} leaves out the class that makes the field grow.
test("durumlar ve görünüm: devre dışı, salt okunur, geçersiz, mono, büyümeyen alan", () => {
  const s = renderTest(() => <TextareaLab />)
  expect(s.find("Kilitli not")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Sözleşme")?.hasAttribute("readonly")).toBe(true)
  const reason = s.get("#lab-reason")!
  expect(reason.getAttribute("aria-invalid")).toBe("true")
  expect(reason.getAttribute("aria-describedby")).toBe("lab-reason-hint")
  expect(reason.hasAttribute("required")).toBe(true)
  const code = s.get(".lab-code")!
  expect(code.classList.contains("m-mono")).toBe(true)
  expect(code.classList.contains("m-textarea-grow")).toBe(false)
})
