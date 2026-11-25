import { test, expect, renderTest } from "march/testing"
import { AudioReactiveLab } from "./AudioReactiveLab.tsx"

// AudioReactiveLab'in testleri: kaydedince Testler sekmesinde çalışır
test("halka efekti, renk ve erişilebilir ad sarmalayıcının üstünde; içerik içinde", () => {
  const s = renderTest(() => <AudioReactiveLab />)
  const ring = s.get(".lab-ring")!
  expect(ring.getAttribute("class")).toContain("m-ar-ring")
  expect(ring.getAttribute("data-m-color")).toBe("brand-pink")
  expect(ring.getAttribute("aria-label")).toBe("Konuşan: Ada")
  expect(ring.querySelector(".m-avatar")).toBeTruthy()
})

test("değişkenler ilk okumadan önce 0 ile yazılır; vars adları değiştirir ya da dışarıda bırakır", () => {
  const s = renderTest(() => <AudioReactiveLab />)
  const vars = s.get(".lab-vars") as HTMLElement
  expect(vars.style.getPropertyValue("--ses")).toBe("0.000")
  expect(vars.style.getPropertyValue("--m-level")).toBe("")
  expect(vars.style.getPropertyValue("--m-peak")).toBe("")
  const list = s.get(".lab-list") as HTMLElement
  expect(list.style.getPropertyValue("--m-bass")).toBe("0.000")
  expect(list.style.getPropertyValue("--m-treble")).toBe("")
})

test("as etiketi seçer; birden çok efekt sınıf olur", () => {
  const s = renderTest(() => <AudioReactiveLab />)
  const span = s.get(".lab-span")!
  expect(span.tagName).toBe("SPAN")
  expect(span.getAttribute("class")).toContain("m-ar-pulse")
  expect(span.getAttribute("class")).toContain("m-ar-glow")
  expect(s.get(".lab-ring")!.tagName).toBe("DIV")
})
