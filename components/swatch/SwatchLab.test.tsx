// Tests for SwatchLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <SwatchLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds an element by its accessible name or visible text (a Swatch's `label`), s.get / s.all by CSS
//   selector, s.text() is all the text; s.click(el or text) clicks like a user, waits until the view has updated and
//   returns the element (so a test that clicks is async and awaits it).
// - The tests check what a screen reader or a user can observe (aria-pressed, aria-checked, role, disabled, visible
//   text) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the label or the expected value. The labels used here are the ones in SwatchLab.
import { test, expect, renderTest } from "march/testing"
import { SwatchLab } from "./SwatchLab.tsx"

// A clickable swatch is a button whose selected state is aria-pressed. The first colour starts selected; clicking another
// moves the state to it, and the visible "selected" text follows.
test("tıklanan renk seçilir: aria-pressed ve Seçili metni değişir", async () => {
  const s = renderTest(() => <SwatchLab />)
  expect(s.find("Turuncu")?.getAttribute("aria-pressed")).toBe("true")
  const blue = await s.click("Mavi")
  expect(blue.getAttribute("aria-pressed")).toBe("true")
  expect(s.find("Turuncu")?.getAttribute("aria-pressed")).toBe("false")
  expect(s.text().includes("Seçili: Mavi")).toBe(true)
})

// `disabled` makes a real disabled button, so clicking it does nothing: the selection stays on the first colour.
test("devre dışı renk kutusu tıklanamaz", async () => {
  const s = renderTest(() => <SwatchLab />)
  const out = s.find("Tükendi") as HTMLButtonElement
  expect(out.disabled).toBe(true)
  await s.click(out)
  expect(s.text().includes("Seçili: Turuncu")).toBe(true)
})

// With role="radio" the selected state is announced as aria-checked instead of aria-pressed, as a radio group expects.
test("role=radio ile seçili durum aria-checked olarak söylenir", async () => {
  const s = renderTest(() => <SwatchLab />)
  expect(s.find("Beden M")?.getAttribute("aria-checked")).toBe("true")
  await s.click("Beden L")
  expect(s.find("Beden L")?.getAttribute("aria-checked")).toBe("true")
  expect(s.find("Beden M")?.getAttribute("aria-checked")).toBe("false")
  expect(s.text().includes("Beden: L")).toBe(true)
})

// A static swatch with a label is an image (role="img"); a colour token goes through data-m-color; our own id, class,
// title and data-* attributes land on the swatch; and a static swatch without a label is decoration (aria-hidden).
test("resim, süs ve öznitelikler: label → role img, belirteç → data-m-color", () => {
  const s = renderTest(() => <SwatchLab />)
  expect(s.find("Gradyan")?.getAttribute("role")).toBe("img")
  expect(s.find("Tema belirteci")?.getAttribute("data-m-color")).toBe("brand-green")
  const own = s.get("#lab-swatch")
  expect(own?.classList.contains("lab-swatch")).toBe(true)
  expect(own?.getAttribute("title")).toBe("Kendi ipucum")
  expect(own?.getAttribute("data-code")).toBe("F2801F")
  expect(s.all("span.m-sample[aria-hidden=true]").length).toBe(1)
})
