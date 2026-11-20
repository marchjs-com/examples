import { test, expect, renderTest } from "march/testing"
import { VerifiedMarkLab } from "./VerifiedMarkLab.tsx"

// VerifiedMarkLab'in testleri: kaydedince Testler sekmesinde çalışır
test("rozet bir resim, adı label", () => {
  const s = renderTest(() => <VerifiedMarkLab />)
  expect(s.get(".lab-own")?.getAttribute("role")).toBe("img")
  expect(s.get(".lab-own")?.getAttribute("aria-label")).toBe("Onaylı işletme")
})

test("label={false} süs: ekran okuyucudan gizli", () => {
  const s = renderTest(() => <VerifiedMarkLab />)
  expect(s.get(".lab-deco")?.getAttribute("aria-hidden")).toBe("true")
})

test("metin ikon yazılır", () => {
  const s = renderTest(() => <VerifiedMarkLab />)
  expect(s.get(".lab-text")?.textContent).toContain("✔")
})
