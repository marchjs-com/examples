import { test, expect, renderTest } from "march/testing"
import { EasingCurveEditorLab } from "./EasingCurveEditorLab.tsx"

// EasingCurveEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("kendi adları: grup, tutamaklar ve hazır eğri grubu", () => {
  const s = renderTest(() => <EasingCurveEditorLab />)
  expect(s.get(".lab-main")?.getAttribute("aria-label")).toBe("Laboratuvar eğrisi")
  expect(s.find("Baş tutamak")?.getAttribute("role")).toBe("slider")
  expect(s.find("Son tutamak")).not.toBe(null)
  expect(s.find("Benim eğrilerim")).not.toBe(null)
})

test("hazır eğriye basınca değer değişir, onChange sayar", async () => {
  const s = renderTest(() => <EasingCurveEditorLab />)
  await s.click("Fırla")
  expect(s.sees("cubic-bezier(.2, 1.4, .4, 1)")).toBe(true)
  expect(s.sees("değişiklik: 1")).toBe(true)
})

test("name ile kayıt notu kendi metniyle", () => {
  const s = renderTest(() => <EasingCurveEditorLab />)
  expect(s.sees('"lab-egri" adıyla kaydedildi')).toBe(true)
})

test("yalın editör: hazır eğri, sayı alanı ve CSS satırı yok; salt okunur", () => {
  const s = renderTest(() => <EasingCurveEditorLab />)
  const bare = s.get(".lab-bare")
  expect(bare?.querySelector(".m-ec-presets")).toBe(null)
  expect(bare?.querySelector(".m-ec-inputs")).toBe(null)
  expect(bare?.querySelector(".m-ec-css")).toBe(null)
  expect(bare?.classList.contains("is-readonly")).toBe(true)
})
