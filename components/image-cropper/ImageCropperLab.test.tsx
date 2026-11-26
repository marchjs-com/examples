// Tests for ImageCropperLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ImageCropperLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(name) clicks like a user (the buttons are found by their accessible name, which comes from labels) and waits
//   until the view has updated, so those tests are async. s.sees(text) says whether text is on screen.
// - The tests check observable things (the state shown as text, disabled buttons, classes) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { ImageCropperLab } from "./ImageCropperLab.tsx"

// Rotate right turns by 90 degrees and mirror flips; both count as changes (onChange ran twice).
test("sağa çevir 90° döndürür, aynala aynalar", async () => {
  const s = renderTest(() => <ImageCropperLab />)
  await s.click("Sağa çevir")
  expect(s.sees("dönüş: 90°")).toBe(true)
  await s.click("Aynala")
  expect(s.sees("ayna: evet")).toBe(true)
  expect(s.sees("değişiklik: 2")).toBe(true)
})

// The api's reset() sets the crop back to the start: after rotating left, the rotation is zero again.
test("API ile sıfırla başlangıca döndürür", async () => {
  const s = renderTest(() => <ImageCropperLab />)
  await s.click("Sola çevir")
  expect(s.sees("dönüş: -90°")).toBe(true)
  await s.click("API ile sıfırla")
  expect(s.sees("dönüş: 0°")).toBe(true)
})

// Our own ratio choices are shown; a fixed aspect (the square switch) hides them.
test("kendi oranları görünür; Kare sabit oranı açınca seçenekler gizlenir", async () => {
  const s = renderTest(() => <ImageCropperLab />)
  expect(s.find("2:1")).not.toBe(null)
  await s.click("Kare")
  expect(s.find("2:1")).toBe(null)
})

// readonly (the lock): the buttons are disabled and the root gets the read-only class.
test("kilitliyken düğmeler devre dışı", async () => {
  const s = renderTest(() => <ImageCropperLab />)
  await s.click(s.find("Kilitle")!.closest("label")!.querySelector("[role=switch]")!)
  expect(s.find("Sağa çevir")?.hasAttribute("disabled")).toBe(true)
  expect(s.get(".lab-crop")?.className).toContain("is-readonly")
})
