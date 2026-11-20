import { test, expect, renderTest } from "march/testing"
import { ChevronLab } from "./ChevronLab.tsx"

// ChevronLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Hepsini aç'a basınca oklar kapalıdan açığa geçer", async () => {
  const s = renderTest(() => <ChevronLab />)
  expect(s.get(".lab-dir-end")?.classList.contains("is-closed")).toBe(true)
  await s.click("Hepsini aç")
  expect(s.get(".lab-dir-end")?.classList.contains("is-open")).toBe(true)
  expect(s.find("Hepsini kapat")).not.toBe(null)
})

test("open verilmeyen ok kendiliğinden (is-auto) ve süs olarak gizli", () => {
  const s = renderTest(() => <ChevronLab />)
  const auto = s.get(".lab-auto")
  expect(auto?.classList.contains("is-auto")).toBe(true)
  expect(auto?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-dir-up")?.classList.contains("m-chevron-up")).toBe(true)
})

test("motion={false} sıçrar; kendi ikonu ve metin işareti çizilir", () => {
  const s = renderTest(() => <ChevronLab />)
  expect(s.get(".lab-still")?.classList.contains("is-still")).toBe(true)
  expect(s.get(".lab-text")?.textContent).toBe("›")
  expect(s.get(".lab-own svg")).not.toBe(null)
  expect(s.get(".lab-own")?.getAttribute("data-m-color")).toBe("primary")
})

test("Yaprak yap: kutu kalır, ok çizilmez; data-* öznitelik oktadır", async () => {
  const s = renderTest(() => <ChevronLab />)
  expect(s.get(".lab-leaf")?.getAttribute("data-node")).toBe("kok")
  await s.click("Yaprak yap")
  expect(s.get(".lab-leaf")?.classList.contains("is-leaf")).toBe(true)
  expect(s.get(".lab-leaf svg")).toBe(null)
})
