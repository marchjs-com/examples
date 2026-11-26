import { test, expect, renderTest } from "march/testing"
import { ProgressRingLab } from "./ProgressRingLab.tsx"

// Tests for ProgressRingLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click / s.sees query and drive it like a user would.
// They check the accessible name, the threshold levels, the color modes and the motion, so a change to ProgressRing
// that breaks any of them shows up here first.

// Proves accessibility and format: the ring's aria-label is "<label>: <formatted value> of <max>", and the number in
// the middle passes through `format`. A screen reader user must hear the score even though they cannot see the ring.
test("ekran okuyucu adı değeri ve tam puanı söyler; biçim ortada", () => {
  const s = renderTest(() => <ProgressRingLab />)
  const ring = s.get(".lab-score svg")!
  expect(ring.getAttribute("aria-label")).toBe("Puan: 4/10 of 10")
  expect(ring.querySelector(".m-ring-text")!.textContent).toBe("4/10")
})

// Proves `thresholds` and reactivity: with limits at 40 % and 70 %, 4/10 is the mid level, and after the raise
// button (8/10) the class switches to high. If thresholds were ignored, the default 50 / 80 limits would give
// other levels.
test("eşikler düzeyi belirler: 40'ta orta, artınca yüksek", async () => {
  const s = renderTest(() => <ProgressRingLab />)
  expect(s.get(".lab-score svg")!.getAttribute("class")).toContain("m-ring-mid")
  await s.click(".lab-up")
  expect(s.get(".lab-score svg")!.getAttribute("class")).toContain("m-ring-high")
})

// Proves the two color modes: `color` sets one theme token on the ring, while `colors="brand"` adds the paint layer
// that carries several colors.
test("renk tek renge boyar; HADİ renkleri boya katmanı ekler", () => {
  const s = renderTest(() => <ProgressRingLab />)
  expect(s.get(".lab-color svg")!.getAttribute("data-m-color")).toBe("brand-blue")
  expect(s.get(".lab-brand .m-ring-paint")).toBeTruthy()
})

// Proves the motion contract: the animate={false} ring shows 80 right after the click (no tween); the animated ring's
// accessible name already says the target (8/10) while it is still sweeping; and after the 500 ms glide its middle
// number has settled on the formatted target.
test("animate: halka yeni değere dolar, sayı birlikte sayar; animate={false} anında", async () => {
  const s = renderTest(() => <ProgressRingLab />)
  const q = (sel: string) => s.container.querySelector<HTMLElement>(sel)
  expect(q(".lab-color .m-ring-text")!.textContent).toBe("40")
  await s.click(q(".lab-up")!)
  expect(q(".lab-color .m-ring-text")!.textContent).toBe("80")
  expect(q(".lab-score svg")!.getAttribute("aria-label")).toBe("Puan: 8/10 of 10")
  // Wait longer than the 500 ms animation so the count has finished.
  await new Promise((r) => setTimeout(r, 700))
  expect(q(".lab-score .m-ring-text")!.textContent).toBe("8/10")
})
