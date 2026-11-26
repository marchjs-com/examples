import { test, expect, renderTest } from "march/testing"
import { WaveformLab } from "./WaveformLab.tsx"

// Tests for WaveformLab. They run in the MarchIDE "Tests" tab each time you save.
// What they cover: the seekable waveform as an accessible slider with your own spoken text and the region's label,
// moving the playhead from outside, the parts you can switch off and the color tokens, and the live and decorative
// modes' roles.
//
// How the MarchIDE test API works:
// - test(name, fn): one test; fn may be async when it clicks or waits.
// - renderTest(() => <WaveformLab />): renders the component off screen and returns a screen driver `s`.
// - s.get(selector) / s.all(selector): querySelector / querySelectorAll inside the rendered component.
// - s.click(target): clicks an element by its text or a selector, then lets the reactive updates settle (await it).
// - s.find(text) returns the element that shows a text; s.sees(text) is true when that text is on screen.
// - s.wait(ms or predicate) waits for time to pass or for a condition (useful for animations and timers).
// - expect(x).toBe(y), toContain, toBeFalsy…: the assertions, as in Jest or Vitest.

// Proves the seekable waveform is a role="slider" named by label, and that the spoken value includes the current
// region's label (the playhead starts at 0.3, inside the first region).
test("konum seçilebilir: kaydırıcı, kendi okunan metni ve bölüm adı", () => {
  const s = renderTest(() => <WaveformLab />)
  const w = s.get(".lab-seek .m-wave")!
  expect(w.getAttribute("role")).toBe("slider")
  expect(w.getAttribute("aria-label")).toBe("Şarkı konumu")
  expect(w.getAttribute("aria-valuetext")).toContain("Giriş")
})

// Proves the playhead follows the state: the forward button sets progress to 0.5, written as the --m-wave-p CSS
// variable, and the spoken value now names the second region.
test("İleri düğmesi oynatma çizgisini ilerletir ve bölüm değişir", async () => {
  const s = renderTest(() => <WaveformLab />)
  await s.click(".lab-fwd")
  expect((s.get(".lab-seek .m-wave-playhead") as HTMLElement).style.getPropertyValue("--m-wave-p")).toBe("0.5")
  expect(s.get(".lab-seek .m-wave")!.getAttribute("aria-valuetext")).toContain("Şarkı")
})

// Proves the options on the second waveform: not seekable means role="img"; progressColor lands as data-m-color;
// color="cat-3" becomes the --m-wave-bar variable; playhead={false} and regionLabels={false} remove those parts.
test("parçalar kapatılabilir; renk ve boyut belirteçleri köke yazılır", () => {
  const s = renderTest(() => <WaveformLab />)
  const w = s.get(".lab-own") as HTMLElement
  expect(w.getAttribute("role")).toBe("img")
  expect(w.getAttribute("data-m-color")).toBe("brand-orange")
  expect(w.style.getPropertyValue("--m-wave-bar")).toBe("var(--m-cat-3)")
  expect(w.querySelector(".m-wave-playhead")).toBeFalsy()
  expect(w.querySelector(".m-wave-marks")).toBeFalsy()
})

// Proves the live modes: a waveform with a source is named by its label, and decorative live bars are hidden from
// screen readers (aria-hidden) and drawn as exactly `bars` elements.
test("canlı: kaynaklı dalga bir resimdir, süs çubukları ekran okuyucudan gizlidir", () => {
  const s = renderTest(() => <WaveformLab />)
  expect(s.get(".lab-live")!.getAttribute("aria-label")).toBe("Demo ses")
  expect(s.get(".lab-deco")!.getAttribute("aria-hidden")).toBe("true")
  expect(s.all(".lab-deco i").length).toBe(20)
})
