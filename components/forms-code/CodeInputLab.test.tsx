import { test, expect, renderTest } from "march/testing"
import { CodeInputLab } from "./CodeInputLab.tsx"

// CodeInputLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ilk kutuya yapıştırılan kod bütün kutuları doldurur ve onComplete bir kez çağrılır", async () => {
  const s = renderTest(() => <CodeInputLab />)
  await s.type("Kod 1/6", "482915")
  expect(s.text().includes("Değer: 482915 · tamamlanan: 482915")).toBe(true)
  expect((s.find("Kod 6/6") as HTMLInputElement).value).toBe("5")
})

test("pattern: harf alanı rakamları atar ve büyük harfe çevirir", async () => {
  const s = renderTest(() => <CodeInputLab />)
  await s.type("Harf 1", "m4rch")
  expect(s.text().includes("Harfler: MRCH")).toBe(true)
})

test("gruplar ve ayraç: sayı grup başına kutu; metin ayraç; separator={false} yalnız boşluk", () => {
  const s = renderTest(() => <CodeInputLab />)
  const inside = (root: string, sel: string) => s.get(root)!.querySelectorAll(sel)
  expect(inside(".lab-otp", ".m-otp-sep").length).toBe(1)
  // sekiz kutuda groups={4}: iki grup, bir çizgi
  expect(inside(".lab-alnum", ".m-otp-sep").length).toBe(1)
  expect(inside(".lab-dot", ".m-otp-sep-own")[0]?.textContent).toBe("•")
  expect(inside(".lab-nosep", ".m-otp-sep").length + inside(".lab-nosep", ".m-otp-sep-own").length).toBe(0)
})

test("erişilebilirlik ve durumlar: grup adı, gizli kutular, salt okunur, devre dışı, geçersiz", () => {
  const s = renderTest(() => <CodeInputLab />)
  const group = s.get(".lab-otp") as HTMLElement
  expect(group.getAttribute("role")).toBe("group")
  expect(group.getAttribute("aria-labelledby")).toBe("lab-otp-title")
  expect(group.getAttribute("aria-describedby")).toBe("lab-otp-hint")
  expect(s.find("PIN 1")?.getAttribute("type")).toBe("password")
  expect(s.find("Salt okunur 1")?.hasAttribute("readonly")).toBe(true)
  expect(s.find("Kilitli 4")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Hatalı 1")?.getAttribute("aria-invalid")).toBe("true")
})

test("eski adlar: numeric={false} harf kabul eder, masked işlevi düğmeyle açılır", async () => {
  const s = renderTest(() => <CodeInputLab />)
  expect((s.find("Eski 1") as HTMLInputElement).value).toBe("A")
  expect(s.find("Gizli 1")?.getAttribute("type")).toBe("password")
  await s.click("Göster")
  expect(s.find("Gizli 1")?.getAttribute("type")).toBe("text")
})
