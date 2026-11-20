import { test, expect, renderTest } from "march/testing"
import { CodeViewLab } from "./CodeViewLab.tsx"

// CodeViewLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Satırları kaydır'a basınca kod kayar ve düğme basılı durur", async () => {
  const s = renderTest(() => <CodeViewLab />)
  const wrap = await s.click("Satırları kaydır")
  expect(wrap.getAttribute("aria-pressed")).toBe("true")
  expect(s.get(".lab-main")?.classList.contains("is-wrapped")).toBe(true)
})

test("code bir erişimci: başlangıç değişince kod da değişir; tools içindeki Çalıştır sayar", async () => {
  const s = renderTest(() => <CodeViewLab />)
  expect(s.find("Sayaç kodu")?.textContent).toContain("let $n = 0")
  await s.click("Başlangıcı artır")
  expect(s.find("Sayaç kodu")?.textContent).toContain("let $n = 1")
  await s.click("Çalıştır")
  await s.click("Çalıştır")
  expect(s.sees("2 kez çalıştı")).toBe(true)
})

test("simge düğmeler: wrap ile kayık başlar, adları ipucu olur", () => {
  const s = renderTest(() => <CodeViewLab />)
  expect(s.find("Kaydır")?.getAttribute("aria-pressed")).toBe("true")
  expect(s.get(".lab-icons")?.classList.contains("is-wrapped")).toBe(true)
  expect(s.find("Kopyala")).not.toBe(null)
})

test("düz blok: renk, satır numarası, dil etiketi ve düğme yok; toolbar={false} çubuğu kaldırır", () => {
  const s = renderTest(() => <CodeViewLab />)
  expect(s.get(".lab-plain [class^='m-tok-']")).toBe(null)
  expect(s.get(".lab-plain .m-code-ln")).toBe(null)
  expect(s.get(".lab-plain .m-code-lang")).toBe(null)
  expect(s.all(".lab-plain button").length).toBe(0)
  expect(s.get(".lab-bare .m-code-bar")).toBe(null)
  expect(s.get(".lab-main .m-tok-kw")).not.toBe(null)
})
