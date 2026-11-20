import { test, expect, renderTest } from "march/testing"
import { TextareaLab } from "./TextareaLab.tsx"

// TextareaLab'in testleri: kaydedince Testler sekmesinde çalışır
const key = async (el: Element, k: string, ctrlKey = false) => {
  const e = new KeyboardEvent("keydown", { key: k, ctrlKey, bubbles: true, cancelable: true })
  el.dispatchEvent(e)
  await new Promise((r) => setTimeout(r, 0))
  return e
}

test("yazınca uzunluk ve onChange güncellenir; rows ve maxLength öğede", async () => {
  const s = renderTest(() => <TextareaLab />)
  const bio = await s.type("Biyografi", "Merhaba")
  expect(s.text().includes("Uzunluk: 7/120 · değişiklik: 1")).toBe(true)
  expect(bio.getAttribute("rows")).toBe("3")
  expect(bio.getAttribute("maxlength")).toBe("120")
})

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

test("Ctrl + Enter mesajı gönderir ve alanı boşaltır; ref öğeyi verir", async () => {
  const s = renderTest(() => <TextareaLab />)
  const msg = await s.type("Mesaj", "Toplantı 15:00'te") as HTMLTextAreaElement
  await key(msg, "Enter", true)
  expect(s.text().includes("Gönderilen: Toplantı 15:00'te")).toBe(true)
  expect(msg.value).toBe("")
  expect(s.text().includes("ref: TEXTAREA")).toBe(true)
})

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
