// Tests for ProgressRingLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ProgressRingLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - Each ring in the Lab sits in a wrapper with a class (.lab-score, .lab-color, .lab-brand) so a test can pick it.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { ProgressRingLab } from "./ProgressRingLab.tsx"

// The ring is an image named "<label>: <value> of <max>" and the middle text uses our `format` function.
test("ekran okuyucu adı değeri ve tam puanı söyler; biçim ortada", () => {
  const s = renderTest(() => <ProgressRingLab />)
  const ring = s.get(".lab-score svg")!
  expect(ring.getAttribute("aria-label")).toBe("Puan: 4/10 of 10")
  expect(ring.querySelector(".m-ring-text")!.textContent).toBe("4/10")
})

// `thresholds={[40, 70]}` decide the level class: 40 percent is the middle level, and after the button raises the
// value it becomes the high level. The level is told by a class here and by the number, not only by colour.
test("eşikler düzeyi belirler: 40'ta orta, artınca yüksek", async () => {
  const s = renderTest(() => <ProgressRingLab />)
  expect(s.get(".lab-score svg")!.getAttribute("class")).toContain("m-ring-mid")
  await s.click(".lab-up")
  expect(s.get(".lab-score svg")!.getAttribute("class")).toContain("m-ring-high")
})

// `color` paints the ring with one colour token (exposed as data-m-color); colors="brand" with paint="segments"
// adds the paint layer.
test("renk tek renge boyar; HADİ renkleri boya katmanı ekler", () => {
  const s = renderTest(() => <ProgressRingLab />)
  expect(s.get(".lab-color svg")!.getAttribute("data-m-color")).toBe("brand-blue")
  expect(s.get(".lab-brand .m-ring-paint")).toBeTruthy()
})
