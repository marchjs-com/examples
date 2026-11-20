import { test, expect, renderTest } from "march/testing"
import { TextInputLab } from "./TextInputLab.tsx"

// TextInputLab'in testleri: kaydedince Testler sekmesinde çalışır
test("transform yazılanı büyük harfe çevirir, onChange sayar", async () => {
  const s = renderTest(() => <TextInputLab />)
  await s.type("Kupon kodu", "hadi10")
  expect(s.text().includes("Kod: HADI10 · değişiklik: 1")).toBe(true)
  expect(s.find("Kupon kodu")?.getAttribute("maxlength")).toBe("10")
})

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

test("durumlar: devre dışı, salt okunur, geçersiz + describedby, son ek", () => {
  const s = renderTest(() => <TextInputLab />)
  expect(s.find("Devre dışı alan")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("IBAN")?.hasAttribute("readonly")).toBe(true)
  expect(s.get("#lab-invalid")?.getAttribute("aria-invalid")).toBe("true")
  expect(s.get("#lab-invalid")?.getAttribute("aria-describedby")).toBe("lab-invalid-hint")
  expect(s.get(".lab-subdomain")?.textContent).toContain(".hadisosyal.com")
})
