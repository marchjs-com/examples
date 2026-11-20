import { test, expect, renderTest } from "march/testing"
import { CornerMarkLab } from "./CornerMarkLab.tsx"

// CornerMarkLab'in testleri: kaydedince Testler sekmesinde çalışır
test("label verilince role=img ve adı; köşe ve boyut sınıfı", () => {
  const s = renderTest(() => <CornerMarkLab />)
  const m = s.find("Video (bottom-start)")
  expect(m?.getAttribute("role")).toBe("img")
  expect(m?.classList.contains("m-corner-mark-bottom-start")).toBe(true)
  expect(m?.classList.contains("m-corner-mark-lg")).toBe(true)
})

test("label yoksa süs: aria-hidden; ring ve overlap sınıfları", () => {
  const s = renderTest(() => <CornerMarkLab />)
  const b = s.get(".lab-badge")
  expect(b?.getAttribute("aria-hidden")).toBe("true")
  expect(b?.classList.contains("is-ringed")).toBe(true)
  expect(b?.classList.contains("is-overlap")).toBe(true)
})

test("show=hover ve children içerik", () => {
  const s = renderTest(() => <CornerMarkLab />)
  expect(s.get(".lab-hover")?.classList.contains("is-hover")).toBe(true)
  expect(s.sees("4K")).toBe(true)
})
