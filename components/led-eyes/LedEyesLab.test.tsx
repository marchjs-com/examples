// Tests for LedEyesLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LedEyesLab />) mounts the Lab and returns a handle `s`; s.click(text) presses a button by its text.
// - The eyes are drawn on a canvas, which a test cannot read, so the tests check the accessible name: it describes
//   the expression in words, which is what a screen reader hears.
import { test, expect, renderTest } from "march/testing"
import { LedEyesLab } from "./LedEyesLab.tsx"

// The face is an image named by its expression.
test("yüz, ifadesini anlatan bir resim", () => {
  const s = renderTest(() => <LedEyesLab />)
  const face = s.get(".lab-main")
  expect(face?.getAttribute("role")).toBe("img")
  expect(face?.getAttribute("aria-label")).toBe("Gözler")
})

// Pressing the button moves to the next expression; the name follows it.
test("ifade değişince adı da değişir", () => {
  const s = renderTest(() => <LedEyesLab />)
  s.click("İfade: open")
  expect(s.get(".lab-main")?.getAttribute("aria-label")).toBe("Sola bakan gözler")
})

// Every expression has its own face in the grid (12 of them), each a 20 × 9 LED screen.
test("her ifadenin kendi yüzü var", () => {
  const s = renderTest(() => <LedEyesLab />)
  const faces = s.get(".lab-grid")!.querySelectorAll(".m-led")
  expect(faces.length).toBe(12)
  expect((faces[0] as HTMLElement).style.getPropertyValue("--m-led-cols")).toBe("20")
})
