import { test, expect, renderTest } from "march/testing"
import { PictureLab } from "./PictureLab.tsx"

// PictureLab'in testleri: kaydedince Testler sekmesinde çalışır
test("nesne bir img olur: tembel, eşzamansız çözülen, boyutlu", () => {
  const s = renderTest(() => <PictureLab />)
  const img = s.get(".lab-object")
  expect(img?.tagName).toBe("IMG")
  expect(img?.getAttribute("loading")).toBe("lazy")
  expect(img?.getAttribute("decoding")).toBe("async")
  expect(img?.getAttribute("width")).toBe("1200")
})

test("loading=eager: lazy yok, yüksek öncelik; ek öznitelikler img'ye geçer", () => {
  const s = renderTest(() => <PictureLab />)
  const img = s.get(".lab-eager")
  expect(img?.hasAttribute("loading")).toBe(false)
  expect(img?.getAttribute("fetchpriority")).toBe("high")
  expect(img?.getAttribute("data-kind")).toBe("hero")
  expect(img?.classList.contains("m-picture-contain")).toBe(true)
})

test("srcset ve sizes yazılır; hazır düğüm olduğu gibi çizilir", () => {
  const s = renderTest(() => <PictureLab />)
  expect(s.get(".lab-srcset")?.getAttribute("sizes")).toBe("(max-width: 600px) 100vw, 300px")
  expect(s.get(".lab-node")).not.toBe(null)
  expect(s.sees("Kendi düğümüm")).toBe(true)
})
