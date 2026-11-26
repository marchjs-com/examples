// Tests for PictureLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PictureLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds an element by CSS selector (the Lab gives each example its own class), and s.sees(text) says
//   whether text is visible. These tests are synchronous because nothing needs to be clicked or typed.
// - The tests check the DOM contract of the <img> that Picture draws (attributes and classes), not whether the image file
//   actually loads, so they do not depend on the network.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { PictureLab } from "./PictureLab.tsx"

// A picture object given as `source` becomes an <img> with the defaults: lazy loading, asynchronous decoding (off the main
// thread) and the width attribute, which reserves the space so the layout does not jump.
test("nesne bir img olur: tembel, eşzamansız çözülen, boyutlu", () => {
  const s = renderTest(() => <PictureLab />)
  const img = s.get(".lab-object")
  expect(img?.tagName).toBe("IMG")
  expect(img?.getAttribute("loading")).toBe("lazy")
  expect(img?.getAttribute("decoding")).toBe("async")
  expect(img?.getAttribute("width")).toBe("1200")
})

// loading="eager": no lazy attribute and fetchpriority="high". Other attributes (data-*) pass to the <img>, and fit="contain"
// adds its modifier class.
test("loading=eager: lazy yok, yüksek öncelik; ek öznitelikler img'ye geçer", () => {
  const s = renderTest(() => <PictureLab />)
  const img = s.get(".lab-eager")
  expect(img?.hasAttribute("loading")).toBe(false)
  expect(img?.getAttribute("fetchpriority")).toBe("high")
  expect(img?.getAttribute("data-kind")).toBe("hero")
  expect(img?.classList.contains("m-picture-contain")).toBe(true)
})

// srcset and sizes are written to the <img>; a ready node given as `source` is returned as it is (not wrapped in an <img>).
test("srcset ve sizes yazılır; hazır düğüm olduğu gibi çizilir", () => {
  const s = renderTest(() => <PictureLab />)
  expect(s.get(".lab-srcset")?.getAttribute("sizes")).toBe("(max-width: 600px) 100vw, 300px")
  expect(s.get(".lab-node")).not.toBe(null)
  expect(s.sees("Kendi düğümüm")).toBe(true)
})
