import { test, expect, renderTest } from "march/testing"
import { WaveformLab } from "./WaveformLab.tsx"

// WaveformLab'in testleri: kaydedince Testler sekmesinde çalışır
test("konum seçilebilir: kaydırıcı, kendi okunan metni ve bölüm adı", () => {
  const s = renderTest(() => <WaveformLab />)
  const w = s.get(".lab-seek .m-wave")!
  expect(w.getAttribute("role")).toBe("slider")
  expect(w.getAttribute("aria-label")).toBe("Şarkı konumu")
  expect(w.getAttribute("aria-valuetext")).toContain("Giriş")
})

test("İleri düğmesi oynatma çizgisini ilerletir ve bölüm değişir", async () => {
  const s = renderTest(() => <WaveformLab />)
  await s.click(".lab-fwd")
  expect((s.get(".lab-seek .m-wave-playhead") as HTMLElement).style.getPropertyValue("--m-wave-p")).toBe("0.5")
  expect(s.get(".lab-seek .m-wave")!.getAttribute("aria-valuetext")).toContain("Şarkı")
})

test("parçalar kapatılabilir; renk ve boyut belirteçleri köke yazılır", () => {
  const s = renderTest(() => <WaveformLab />)
  const w = s.get(".lab-own") as HTMLElement
  expect(w.getAttribute("role")).toBe("img")
  expect(w.getAttribute("data-m-color")).toBe("brand-orange")
  expect(w.style.getPropertyValue("--m-wave-bar")).toBe("var(--m-cat-3)")
  expect(w.querySelector(".m-wave-playhead")).toBeFalsy()
  expect(w.querySelector(".m-wave-marks")).toBeFalsy()
})

test("canlı: kaynaklı dalga bir resimdir, süs çubukları ekran okuyucudan gizlidir", () => {
  const s = renderTest(() => <WaveformLab />)
  expect(s.get(".lab-live")!.getAttribute("aria-label")).toBe("Demo ses")
  expect(s.get(".lab-deco")!.getAttribute("aria-hidden")).toBe("true")
  expect(s.all(".lab-deco i").length).toBe(20)
})
