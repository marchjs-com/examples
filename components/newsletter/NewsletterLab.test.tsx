// Tests for NewsletterLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <NewsletterLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(name) looks up an element by its accessible name or text (null when missing), s.get(selector) uses a CSS
//   selector, s.type(name, text) types into a field, s.click(name) clicks like a user, and s.wait(fn) waits until fn()
//   is true. Whatever awaits is why those tests are async; sending is asynchronous, hence the waits.
// - The tests check what a user or a screen reader can observe (texts, the status region) rather than internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected text.
import { test, expect, renderTest } from "march/testing"
import { NewsletterLab } from "./NewsletterLab.tsx"

// The static props reach the screen: title, lead-adjacent note, the placeholder of the email field and the button text.
test("başlık, açıklama, not, yer tutucu ve düğme metni", () => {
  const s = renderTest(() => <NewsletterLab />)
  expect(s.find("Haberdar ol")).not.toBe(null)
  expect(s.find("İstediğin an ayrılabilirsin.")).not.toBe(null)
  expect(s.get('.lab-nl input[type="email"]')?.getAttribute("placeholder")).toBe("adın@ornek.com")
  expect(s.find("Kaydol")).not.toBe(null)
})

// An invalid address shows the message from labels.invalid (not the generic error text). The test types by the
// field's accessible name (labels.email) and waits for the message, because it is shown after the submit finishes.
test("geçersiz adres: kendi hata metni okunur", async () => {
  const s = renderTest(() => <NewsletterLab />)
  await s.type("E-posta adresin", "abc")
  await s.click("Kaydol")
  await s.wait(() => s.sees("Geçerli bir adres yaz."))
  expect(s.sees("Geçerli bir adres yaz.")).toBeTruthy()
})

// A valid address: onSubmit ran (the counter shows one subscriber) and the thank-you line is a status region, which is
// how screen readers hear the success.
test("geçerli adres: teşekkür satırı ve sayaç", async () => {
  const s = renderTest(() => <NewsletterLab />)
  await s.type("E-posta adresin", "ali@ornek.com")
  await s.click("Kaydol")
  await s.wait(() => s.sees("Görüşmek üzere!"))
  expect(s.get('.lab-nl [role="status"]')?.textContent).toContain("Görüşmek üzere!")
  expect(s.find("1 abone")).not.toBe(null)
})

// onSubmit throws an Error with an empty message, so the component shows labels.error (the fallback text) and keeps
// the form on screen, so the user can try again.
test("sunucu hatası: genel hata metni, form yerinde kalır", async () => {
  const s = renderTest(() => <NewsletterLab />)
  await s.click("Sunucu hatası")
  await s.type("E-posta adresin", "ali@ornek.com")
  await s.click("Kaydol")
  await s.wait(() => s.sees("Bir sorun çıktı."))
  expect(s.get(".lab-nl form")).not.toBe(null)
})
