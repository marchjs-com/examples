// Tests for PasswordInputLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PasswordInputLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(name) looks up an element by its accessible name (null when missing), s.get(selector) uses a CSS selector,
//   s.text() is all visible text, s.type(nameOrSelector, text) types into a field and returns the input element, and
//   s.click(name) clicks like a user and returns the clicked element. Both wait until the view has updated, which is why
//   the tests that use them are async.
// - The tests check what a user or a screen reader can observe (accessible names, aria-pressed, aria-invalid, the input
//   type, visible text) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { PasswordInputLab } from "./PasswordInputLab.tsx"

// The text toggle: the button's accessible name comes from labels.showPassword, and after the click it is labels.hidePassword,
// it is pressed (aria-pressed), shows the labels.hide word, the input type becomes "text" and onToggle reports it.
test("metin düğmesi parolayı gösterir: adı, basılı durumu ve onToggle değişir", async () => {
  const s = renderTest(() => <PasswordInputLab />)
  const input = s.find("Wi-Fi şifresi") as HTMLInputElement
  expect(input.getAttribute("type")).toBe("password")
  const btn = await s.click("Wi-Fi şifresini göster")
  expect(btn.getAttribute("aria-label")).toBe("Wi-Fi şifresini gizle")
  expect(btn.getAttribute("aria-pressed")).toBe("true")
  expect(btn.textContent).toContain("Gizle")
  expect(input.getAttribute("type")).toBe("text")
  expect(s.text().includes("Wi-Fi şifresi görünüyor")).toBe(true)
})

// Typing updates the bound value (the length shown) and onChange runs once. A second field bound to the same value shows
// the same text, which proves the binding works in both directions.
test("yazınca bağlı değer ve onChange sayacı güncellenir", async () => {
  const s = renderTest(() => <PasswordInputLab />)
  await s.type("Parola", "abc")
  expect(s.text().includes("Uzunluk: 3 · değişiklik: 1")).toBe(true)
  // the second field, bound to the same $pw, shows the new value too
  expect((s.find("Parola (maymun)") as HTMLInputElement).value).toBe("abc")
})

// The form field: a too-short new password is invalid (aria-invalid), and the attributes of the props reach the input
// (required, minlength, maxlength, name, autocomplete, aria-describedby). A long enough password clears the invalid mark.
test("kısa yeni parola geçersiz; zorunlu, uzunluk ve kimlik öznitelikleri yerinde", async () => {
  const s = renderTest(() => <PasswordInputLab />)
  const el = await s.type("#lab-new-password", "kisa")
  expect(el.getAttribute("aria-invalid")).toBe("true")
  expect(el.hasAttribute("required")).toBe(true)
  expect(el.getAttribute("minlength")).toBe("8")
  expect(el.getAttribute("maxlength")).toBe("32")
  expect(el.getAttribute("name")).toBe("new-password")
  expect(el.getAttribute("autocomplete")).toBe("new-password")
  expect(el.getAttribute("aria-describedby")).toBe("lab-password-hint")
  expect(s.text().includes("4 / 32")).toBe(true)
  await s.type("#lab-new-password", "yeterince-uzun")
  expect(el.getAttribute("aria-invalid")).toBe(null)
})

// `disabled` turns off the input AND its show / hide button; `readonly` reaches the input; toggle={false} leaves no button.
test("devre dışı alanın düğmesi de kapalı; salt okunur ve düğmesiz alanlar", () => {
  const s = renderTest(() => <PasswordInputLab />)
  const locked = s.find("Kilitli parola") as HTMLInputElement
  expect(locked.hasAttribute("disabled")).toBe(true)
  expect(locked.closest(".m-password")?.querySelector("button")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Salt okunur parola")?.hasAttribute("readonly")).toBe(true)
  expect(s.find("Düğmesiz parola")?.closest(".m-password")?.querySelector("button")).toBe(null)
})
