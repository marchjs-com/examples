// Tests for OverlayLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <OverlayLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element by CSS selector (the Lab gives some layers their own class), s.all(selector) finds
//   all of them, and s.click(name) clicks the button with that accessible name like a user and waits until the view has
//   updated, which is why the test that clicks is async.
// - The tests check the DOM contract of the layers: aria-hidden, inert, alt text and class names. The class names
//   (m-ov-behind, m-ov-front, m-ov-fx-*, m-ov-video, m-ov-canvas, is-interactive) are listed in the Overlay docs.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { OverlayLab } from "./OverlayLab.tsx"

// Layers are decoration by default: aria-hidden and inert. The photo is the exception because we gave it an `alt`, which
// makes it meaningful: it is exposed to screen readers with that alt text.
test("katmanlar süs: aria-hidden ve inert, anlamlı alt'lı resim hariç", () => {
  const s = renderTest(() => <OverlayLab />)
  const photo = s.get(".lab-photo")
  expect(photo?.hasAttribute("aria-hidden")).toBe(false)
  expect(photo?.querySelector("img")?.getAttribute("alt")).toBe("Gün batımında tepeler")
  expect(s.get(".lab-svg")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-svg")?.hasAttribute("inert")).toBe(true)
})

// The `front` prop is bound to state: at first the glass layer is behind the content, and after the button press it is in
// front (the class changes).
test("front düğmeyle değişir: cam içeriğin önüne geçer", async () => {
  const s = renderTest(() => <OverlayLab />)
  expect(s.get(".lab-glass")?.classList.contains("m-ov-behind")).toBe(true)
  await s.click("Camı öne al")
  expect(s.get(".lab-glass")?.classList.contains("m-ov-front")).toBe(true)
})

// Each kind of layer gets its own class: a CSS effect (mesh), a video and a canvas. The test counts them, so a layer that
// silently renders as the wrong kind would fail.
test("efekt ve tür sınıfları: mesh, glass, video, canvas", () => {
  const s = renderTest(() => <OverlayLab />)
  expect(s.all(".m-ov-fx-mesh").length).toBe(1)
  expect(s.all(".m-ov-video").length).toBe(1)
  expect(s.all(".m-ov-canvas").length).toBe(1)
})

// `interactive` is the opt-in to pointer input: the layer is not inert and carries the is-interactive class.
test("interactive katman inert değildir", () => {
  const s = renderTest(() => <OverlayLab />)
  const live = s.get(".lab-live")
  expect(live?.hasAttribute("inert")).toBe(false)
  expect(live?.classList.contains("is-interactive")).toBe(true)
})
