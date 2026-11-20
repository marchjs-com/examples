import { test, expect, renderTest } from "march/testing"
import { SecretLab } from "./SecretLab.tsx"

test("varsayılan: ilk ve son 4 görünür, gizli kısım sayfada yok", async () => {
  const s = renderTest(() => <SecretLab />)
  const key = s.get(".lab-key")!
  expect(key.textContent).toContain("sk_l")
  expect(key.textContent).toContain("d05a")
  expect(key.textContent).not.toContain("live_7f3a")
  expect(key.textContent).toContain("16 karakter gizli")
})

test("göz düğmesi açar, bind:revealed ve onRevealChange izler", async () => {
  const s = renderTest(() => <SecretLab />)
  await s.click("Anahtarı göster")
  expect(s.get(".lab-key .m-secret-text")?.textContent).toBe("sk_live_7f3a9c21e4b8d05a")
  expect(s.get(".lab-stats")?.textContent).toBe("göz: 1 · kopya: 0 · açık: evet")
  await s.click("Anahtarı gizle")
  expect(s.get(".lab-stats")?.textContent).toContain("açık: hayır")
})

test("aralık seçimi: son 4 görünür", async () => {
  const s = renderTest(() => <SecretLab />)
  await s.click("son 4")
  expect(s.all(".lab-key .m-secret-shown").map((e: Element) => e.textContent)).toEqual(["d05a"])
})

test("PIN: sabit maske uzunluğu, göz yok", () => {
  const s = renderTest(() => <SecretLab />)
  expect(s.get(".lab-pin [aria-hidden]")?.textContent).toBe("✱✱✱✱✱✱")
  expect(s.get(".lab-pin .m-secret-eye")).toBe(null)
})
