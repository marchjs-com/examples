import { test, expect, renderTest } from "march/testing"
import { OverlayLab } from "./OverlayLab.tsx"

// OverlayLab'in testleri: kaydedince Testler sekmesinde çalışır
test("katmanlar süs: aria-hidden ve inert, anlamlı alt'lı resim hariç", () => {
  const s = renderTest(() => <OverlayLab />)
  const photo = s.get(".lab-photo")
  expect(photo?.hasAttribute("aria-hidden")).toBe(false)
  expect(photo?.querySelector("img")?.getAttribute("alt")).toBe("Gün batımında tepeler")
  expect(s.get(".lab-svg")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.get(".lab-svg")?.hasAttribute("inert")).toBe(true)
})

test("front düğmeyle değişir: cam içeriğin önüne geçer", async () => {
  const s = renderTest(() => <OverlayLab />)
  expect(s.get(".lab-glass")?.classList.contains("m-ov-behind")).toBe(true)
  await s.click("Camı öne al")
  expect(s.get(".lab-glass")?.classList.contains("m-ov-front")).toBe(true)
})

test("efekt ve tür sınıfları: mesh, glass, video, canvas", () => {
  const s = renderTest(() => <OverlayLab />)
  expect(s.all(".m-ov-fx-mesh").length).toBe(1)
  expect(s.all(".m-ov-video").length).toBe(1)
  expect(s.all(".m-ov-canvas").length).toBe(1)
})

test("interactive katman inert değildir", () => {
  const s = renderTest(() => <OverlayLab />)
  const live = s.get(".lab-live")
  expect(live?.hasAttribute("inert")).toBe(false)
  expect(live?.classList.contains("is-interactive")).toBe(true)
})
