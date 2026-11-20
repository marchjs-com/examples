import { test, expect, renderTest } from "march/testing"
import { AvatarLab } from "./AvatarLab.tsx"

// AvatarLab'in testleri: kaydedince Testler sekmesinde çalışır
test("resim yoksa baş harfler görünür, ad erişilebilir ad olur", () => {
  const s = renderTest(() => <AvatarLab />)
  const a = s.get(".lab-initials")!
  expect(a.textContent).toContain("EA")
  expect(a.getAttribute("aria-label")).toBe("Elif Arslan")
})

test("label adı geçersiz kılar, decorative ekran okuyucudan gizler", () => {
  const s = renderTest(() => <AvatarLab />)
  expect(s.get(".lab-icon")?.getAttribute("aria-label")).toBe("Bilinmeyen kişi")
  expect(s.get(".lab-deco")?.getAttribute("aria-hidden")).toBe("true")
})

test("hazır metin baş harflerin yerine geçer", () => {
  const s = renderTest(() => <AvatarLab />)
  expect(s.get(".lab-text")?.textContent).toContain("?")
})
