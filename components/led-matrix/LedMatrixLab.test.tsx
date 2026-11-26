// Tests for LedMatrixLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LedMatrixLab />) mounts the Lab; s.get(selector) finds one screen by the class the Lab gave it.
// - The LEDs are on a canvas (not readable in a test), so the tests check the screen's contract: the image role and
//   name, its size in LEDs (CSS variables), and the look classes and attributes.
import { test, expect, renderTest } from "march/testing"
import { LedMatrixLab } from "./LedMatrixLab.tsx"

// The screen is an image with its label, sized to the picture (8 × 8) and pitch × cols wide.
test("ekran adı olan bir resim; boyutu resimden gelir", () => {
  const s = renderTest(() => <LedMatrixLab />)
  const el = s.get(".lab-round") as HTMLElement
  expect(el.getAttribute("role")).toBe("img")
  expect(el.getAttribute("aria-label")).toBe("Gülen yüz")
  expect(el.style.getPropertyValue("--m-led-cols")).toBe("8")
  expect(el.style.getPropertyValue("--m-led-w")).toBe("112px")
})

// shape and scanlines become classes; bloom={false} removes the halo canvas.
test("biçim sınıfları ve ışıma", () => {
  const s = renderTest(() => <LedMatrixLab />)
  expect(s.get(".lab-tube")?.classList.contains("m-led-tube")).toBe(true)
  expect(s.get(".lab-tube")?.classList.contains("is-scanlined")).toBe(true)
  expect(s.get(".lab-square .m-led-halo")).toBe(null)
  expect(s.get(".lab-round .m-led-halo")).not.toBe(null)
})

// A single LED color is an attribute (data-m-led), a theme token a data-m-color; cols / rows give a bigger screen.
test("renk kipleri ve büyük ekran", () => {
  const s = renderTest(() => <LedMatrixLab />)
  expect(s.get(".lab-amber")?.getAttribute("data-m-led")).toBe("amber")
  expect(s.get(".lab-token")?.getAttribute("data-m-color")).toBe("brand-purple")
  expect((s.get(".lab-size") as HTMLElement).style.getPropertyValue("--m-led-cols")).toBe("14")
})
