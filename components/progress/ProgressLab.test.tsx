import { test, expect, renderTest } from "march/testing"
import { ProgressLab } from "./ProgressLab.tsx"

// ProgressLab'in testleri: kaydedince Testler sekmesinde çalışır
test("progressbar adı label'dan gelir; değer düğmeyle artar", async () => {
  const s = renderTest(() => <ProgressLab />)
  const bar = s.get("[aria-label='Ton success']")
  expect(bar?.getAttribute("role")).toBe("progressbar")
  expect(bar?.getAttribute("aria-valuenow")).toBe("40")
  await s.click("+20")
  expect(bar?.getAttribute("aria-valuenow")).toBe("60")
})

test("showValue fonksiyonu kendi metnini, valueText aria-valuetext'i yazar", () => {
  const s = renderTest(() => <ProgressLab />)
  const video = s.get(".lab-video")
  expect(video?.querySelector(".m-progress2-value")?.textContent).toBe("192 / 480 MB (%40)")
  expect(video?.querySelector("[role=progressbar]")?.getAttribute("aria-valuetext")).toBe("192 MB / 480 MB")
})

test("değersiz çubuk belirsiz; decorative yardımcı teknolojiden gizli", () => {
  const s = renderTest(() => <ProgressLab />)
  expect(s.all(".is-indeterminate").length).toBe(1)
  expect(s.get(".lab-line .m-progress2-track")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-vertical")?.classList.contains("m-progress2-vertical")).toBe(true)
})

test("segments parçaları çizer", () => {
  const s = renderTest(() => <ProgressLab />)
  expect(s.get(".lab-story")?.querySelectorAll(".m-progress2-seg").length).toBe(4)
})
