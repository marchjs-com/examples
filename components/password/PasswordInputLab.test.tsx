import { test, expect, renderTest } from "march/testing"
import { PasswordInputLab } from "./PasswordInputLab.tsx"

// PasswordInputLab'in testleri: kaydedince Testler sekmesinde çalışır
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

test("yazınca bağlı değer ve onChange sayacı güncellenir", async () => {
  const s = renderTest(() => <PasswordInputLab />)
  await s.type("Parola", "abc")
  expect(s.text().includes("Uzunluk: 3 · değişiklik: 1")).toBe(true)
  // aynı $pw'ye bağlı ikinci alan da yeni değeri gösterir
  expect((s.find("Parola (maymun)") as HTMLInputElement).value).toBe("abc")
})

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

test("devre dışı alanın düğmesi de kapalı; salt okunur ve düğmesiz alanlar", () => {
  const s = renderTest(() => <PasswordInputLab />)
  const locked = s.find("Kilitli parola") as HTMLInputElement
  expect(locked.hasAttribute("disabled")).toBe(true)
  expect(locked.closest(".m-password")?.querySelector("button")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Salt okunur parola")?.hasAttribute("readonly")).toBe(true)
  expect(s.find("Düğmesiz parola")?.closest(".m-password")?.querySelector("button")).toBe(null)
})
