import { test, expect, renderTest } from "march/testing"
import { SkeletonLab } from "./SkeletonLab.tsx"

// SkeletonLab'in testleri: kaydedince Testler sekmesinde çalışır
test("satırlar aria-busy ve adıyla; lines sayısı kadar satır", () => {
  const s = renderTest(() => <SkeletonLab />)
  const lines = s.get(".lab-lines")
  expect(lines?.getAttribute("aria-busy")).toBe("true")
  expect(lines?.getAttribute("aria-label")).toBe("Makale yükleniyor")
  expect(lines?.querySelectorAll(".m-skel-line").length).toBe(5)
})

test("shortLast={false} son satırı kısaltmaz; varsayılan kısaltır", () => {
  const s = renderTest(() => <SkeletonLab />)
  expect(s.get(".lab-lines .m-skel-short")).toBe(null)
  expect(s.all(".m-skel-short").length).toBeGreaterThan(0)
})

test("blok ve daire boyutları, süs olarak gizli", () => {
  const s = renderTest(() => <SkeletonLab />)
  expect(s.all(".m-skel-block").length).toBe(3)
  expect(s.all(".m-skel-circle").length).toBe(3)
  expect(s.get(".m-skel-circle-lg")?.getAttribute("aria-hidden")).toBe("true")
})

test("shimmer={false} durgun, colors sınıfı", () => {
  const s = renderTest(() => <SkeletonLab />)
  const still = s.get(".lab-still")
  expect(still?.classList.contains("is-still")).toBe(true)
  expect(still?.classList.contains("m-skel-single")).toBe(true)
  expect(s.all(".m-skel-brand").length).toBe(1)
})
