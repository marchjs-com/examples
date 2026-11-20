import { test, expect, renderTest } from "march/testing"
import { IconTileLab } from "./IconTileLab.tsx"

// IconTileLab'in testleri: kaydedince Testler sekmesinde çalışır
test("label verilen karo bir resimdir ve adını taşır", () => {
  const s = renderTest(() => <IconTileLab />)
  const t = s.get(".lab-named")!
  expect(t.getAttribute("role")).toBe("img")
  expect(t.getAttribute("aria-label")).toBe("Tamamlandı")
})

test("label yoksa karo süstür (aria-hidden)", () => {
  const s = renderTest(() => <IconTileLab />)
  const tiles = s.all(".m-icon-tile")
  expect(tiles[0].getAttribute("aria-hidden")).toBe("true")
})

test("children ikonun yerine çizilir", () => {
  const s = renderTest(() => <IconTileLab />)
  expect(s.get(".lab-own")!.textContent).toBe("AB")
})
