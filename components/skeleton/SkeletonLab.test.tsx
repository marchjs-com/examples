// Tests for SkeletonLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SkeletonLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element (or null) by CSS selector and s.all(selector) all matches. These tests do not click
//   anything, so they are synchronous.
// - The tests check what a user or a screen reader can observe (aria-busy, the accessible name, how many shapes are drawn,
//   aria-hidden on decoration) and the state classes of the parts, rather than internal state, so they keep passing when
//   the internals change.
// To adapt them: copy one test, change the selector or the expected number. The part classes (.m-skel-line, .m-skel-block,
// .m-skel-circle, .m-skel-short) are the classes Skeleton puts on its own parts.
import { test, expect, renderTest } from "march/testing"
import { SkeletonLab } from "./SkeletonLab.tsx"

// A group of lines is aria-busy and carries the label as its accessible name; `lines` sets how many lines are drawn.
test("satırlar aria-busy ve adıyla; lines sayısı kadar satır", () => {
  const s = renderTest(() => <SkeletonLab />)
  const lines = s.get(".lab-lines")
  expect(lines?.getAttribute("aria-busy")).toBe("true")
  expect(lines?.getAttribute("aria-label")).toBe("Makale yükleniyor")
  expect(lines?.querySelectorAll(".m-skel-line").length).toBe(5)
})

// By default the last line is shorter (a "short" class); shortLast={false} on the first group removes it, while the other
// groups still have it.
test("shortLast={false} son satırı kısaltmaz; varsayılan kısaltır", () => {
  const s = renderTest(() => <SkeletonLab />)
  expect(s.get(".lab-lines .m-skel-short")).toBe(null)
  expect(s.all(".m-skel-short").length).toBeGreaterThan(0)
})

// Three block heights and three circle sizes are drawn, and the shapes are decoration, so they are aria-hidden.
test("blok ve daire boyutları, süs olarak gizli", () => {
  const s = renderTest(() => <SkeletonLab />)
  expect(s.all(".m-skel-block").length).toBe(3)
  expect(s.all(".m-skel-circle").length).toBe(3)
  expect(s.get(".m-skel-circle-lg")?.getAttribute("aria-hidden")).toBe("true")
})

// shimmer={false} adds a "still" state class, colors="single" a neutral colour class, and colors="brand" exactly one brand
// group exists.
test("shimmer={false} durgun, colors sınıfı", () => {
  const s = renderTest(() => <SkeletonLab />)
  const still = s.get(".lab-still")
  expect(still?.classList.contains("is-still")).toBe(true)
  expect(still?.classList.contains("m-skel-single")).toBe(true)
  expect(s.all(".m-skel-brand").length).toBe(1)
})
