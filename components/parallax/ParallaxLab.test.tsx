// Tests for ParallaxLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ParallaxLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements by CSS selector (the Lab gives layers their own classes), s.find(name)
//   by accessible name or text, and s.click(name) clicks the control with that name like a user and waits until the
//   view has updated, which is why the test that clicks is async and awaits it.
// - The tests check the DOM contract (layers, attributes, a CSS variable). They never measure movement, because the effect
//   depends on scrolling and on the pointer, and under reduced motion every layer stays still.
// To adapt them: copy one test, change the selector or the expected value. The part class names (.m-plx-layer,
// .m-plx-content) are listed in the Parallax docs.
import { test, expect, renderTest } from "march/testing"
import { ParallaxLab } from "./ParallaxLab.tsx"

// Three layers are drawn (an image, a node, a second node), each with the class we gave it, and the children of Parallax
// (the heading) are in front of them.
test("üç katman, sınıfları ve önde başlık var", () => {
  const s = renderTest(() => <ParallaxLab />)
  expect(s.all(".lab-plx .m-plx-layer").length).toBe(3)
  expect(s.get(".lab-glow")).not.toBe(null)
  expect(s.find("Katman katman derinlik")).not.toBe(null)
})

// A layer with `src` and `alt` becomes an image: the address and the description reach the <img>. The alt text also makes
// it meaningful for screen readers (layers without it are decoration).
test("görsel katmanın adresi ve açıklaması", () => {
  const s = renderTest(() => <ParallaxLab />)
  const img = s.get(".lab-far img")
  expect(img?.getAttribute("src")).toContain("hadi-waves.jpg")
  expect(img?.getAttribute("alt")).toBe("Dalgalar")
})

// `speed` is written to the layer as a depth number: the far layer gets a negative value, the near one a positive value.
test("katmanın hızı derinlik olarak yazılır (uzak katman: eksi)", () => {
  const s = renderTest(() => <ParallaxLab />)
  expect(s.get(".lab-far")?.getAttribute("data-depth")).toBe("-0.45")
  expect(s.get(".lab-near")?.getAttribute("data-depth")).toBe("0.2")
})

// The switches change the options: turning the near layer off leaves two layers, and the tall scene sets the minimum
// height as a CSS variable on the root (the component sets it through CSSOM, so it is allowed by a strict CSP).
test("anahtarlar: yakın katman gider, sahne yükselir", async () => {
  const s = renderTest(() => <ParallaxLab />)
  await s.click("Yakın katman")
  expect(s.all(".lab-plx .m-plx-layer").length).toBe(2)
  await s.click("Yüksek sahne")
  expect((s.get(".lab-plx") as HTMLElement).style.getPropertyValue("--m-plx-h")).toBe("30rem")
})
