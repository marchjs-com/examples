import { test, expect, renderTest } from "march/testing"
import { MadeWithMarchLab } from "./MadeWithMarchLab.tsx"

// MadeWithMarchLab'in testleri: kaydedince Testler sekmesinde çalışır
test("varsayılan: MarchJS bağlantısı yeni sekmede, 💗 adıyla; variant sınıf olur", () => {
  const s = renderTest(() => <MadeWithMarchLab />)
  const a = s.get(".lab-text a")
  expect(a?.textContent).toBe("MarchJS")
  expect(a?.getAttribute("href")).toBe("https://github.com/marchjs-com/march")
  expect(a?.getAttribute("target")).toBe("_blank")
  expect(s.get(".lab-text .m-madewith-heart")?.getAttribute("role")).toBe("img")
  expect(s.get(".lab-badge")?.className.includes("m-madewith-badge")).toBe(true)
})

test("kendi kalbin ve adı; heart={false} kalbi kaldırır", () => {
  const s = renderTest(() => <MadeWithMarchLab />)
  const coffee = s.get(".lab-coffee .m-madewith-heart")
  expect(coffee?.textContent).toBe("☕")
  expect(coffee?.getAttribute("aria-label")).toBe("Kahve")
  expect(s.get(".lab-noheart .m-madewith-heart")).toBe(null)
  expect(s.get(".lab-noheart a")).not.toBe(null)
})

test("link ve href bağlantıyı değiştirir; m:color satıra gider", () => {
  const s = renderTest(() => <MadeWithMarchLab />)
  const a = s.get(".lab-link a")
  expect(a?.textContent).toBe("March çatısı")
  expect(a?.getAttribute("href")).toBe("https://marchjs.com")
  expect(s.get(".lab-link")?.getAttribute("data-m-color")).toBe("brand-purple")
})

test("text kendi cümleni kurar: bağlantı ve kalp içine yerleşir", () => {
  const s = renderTest(() => <MadeWithMarchLab />)
  const own = s.get(".lab-own")
  expect(own?.textContent).toContain("üzerine kuruldu")
  expect(own?.querySelector("a")?.textContent).toBe("MarchJS")
  expect(own?.querySelector(".m-madewith-heart")?.textContent).toBe("🚀")
})
