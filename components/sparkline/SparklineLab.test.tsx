import { test, expect, renderTest } from "march/testing"
import { SparklineLab } from "./SparklineLab.tsx"

// Tests for SparklineLab. They run in the IDE's Tests tab when the file is saved.
// renderTest mounts the Lab in a sandbox; s.get / s.click query and drive it like a user would.
// A sparkline has nothing to focus, so its accessible name (aria-label: title + summary) is what screen readers get;
// most tests check that summary, so a change that silently breaks it shows up here first.

// Proves `area` draws the fill, and that the spoken summary starts with the title and uses `format` ("adet").
test("çizgi ve alan çizilir; ekran okuyucu özeti biçimli", () => {
  const s = renderTest(() => <SparklineLab />)
  const svg = s.get(".lab-nums svg")!
  expect(svg.querySelector(".m-chart-area")).toBeTruthy()
  expect(svg.getAttribute("aria-label")!).toContain("Satış")
  expect(svg.getAttribute("aria-label")!).toContain("adet")
})

// Proves the data is reactive: appending a value changes the summary, so screen readers hear the new numbers too.
test("değer eklenince özet güncellenir", async () => {
  const s = renderTest(() => <SparklineLab />)
  const before = s.get(".lab-nums svg")!.getAttribute("aria-label")
  await s.click(".lab-add")
  expect(s.get(".lab-nums svg")!.getAttribute("aria-label")).not.toBe(before)
})

// Proves `empty`: with no data the summary is exactly the title and the empty text.
test("veri boşalınca boş metni söylenir", async () => {
  const s = renderTest(() => <SparklineLab />)
  await s.click(".lab-empty")
  expect(s.get(".lab-nums svg")!.getAttribute("aria-label")).toBe("Satış: Satış yok")
})

// Proves dot={false} hides the last-point marker, and that `width` reaches the SVG.
test("dot={false}: son nokta gizli; boyut yazılır", () => {
  const s = renderTest(() => <SparklineLab />)
  const obj = s.get(".lab-obj svg")!
  expect(obj.querySelector(".m-chart-marker")!.getAttribute("visibility")).toBe("hidden")
  expect(obj.getAttribute("width")).toBe("120")
})

// Proves the two block variants: the bar variant draws one block per value (and its summary counts them), the win /
// loss strip draws 4 up and 2 down blocks and says so in words; appending a value adds exactly one bar.
test("variant: sütunlar her değer için bir blok; artı / eksi şeridi galibiyet ve yenilgileri söyler", async () => {
  const s = renderTest(() => <SparklineLab />)
  const q = (sel: string) => s.container.querySelector<HTMLElement>(sel)
  const bars = () => q(".lab-bars svg")!.querySelectorAll(".m-sparkline-block").length
  const n = bars()
  expect(q(".lab-bars svg")!.getAttribute("aria-label")).toContain(`Günlük satış: ${n} values`)
  const form = q(".lab-form svg")!
  expect(form.querySelectorAll(".m-sparkline-block.is-pos").length).toBe(4)
  expect(form.querySelectorAll(".m-sparkline-block.is-neg").length).toBe(2)
  expect(form.getAttribute("aria-label")).toBe("Son maçlar: 4 wins, 2 losses, 1 ties")
  await s.click(q(".lab-add")!)
  expect(bars()).toBe(n + 1)
})
