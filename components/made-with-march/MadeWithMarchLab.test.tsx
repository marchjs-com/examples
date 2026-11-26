// Tests for MadeWithMarchLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <MadeWithMarchLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector. These tests need no clicks or typing, so none of them is async.
// - The tests check what a user or a screen reader can observe (the link text and address, that it opens in a new tab,
//   the heart's role and accessible name, the sentence) rather than internal state, so they keep passing when the
//   component's internals change.
// To adapt them: copy one test, change the selector or the expected value. MadeWithMarch's part classes
// (m-madewith-heart, m-madewith-badge) are what the tests look up.
import { test, expect, renderTest } from "march/testing"
import { MadeWithMarchLab } from "./MadeWithMarchLab.tsx"

// The default credit: "MarchJS" is a link to the repository that opens in a new tab, the heart is an image with a name,
// and `variant="badge"` shows up as a class on the root.
test("varsayılan: MarchJS bağlantısı yeni sekmede, 💗 adıyla; variant sınıf olur", () => {
  const s = renderTest(() => <MadeWithMarchLab />)
  const a = s.get(".lab-text a")
  expect(a?.textContent).toBe("MarchJS")
  expect(a?.getAttribute("href")).toBe("https://github.com/marchjs-com/march")
  expect(a?.getAttribute("target")).toBe("_blank")
  expect(s.get(".lab-text .m-madewith-heart")?.getAttribute("role")).toBe("img")
  expect(s.get(".lab-badge")?.className.includes("m-madewith-badge")).toBe(true)
})

// Your own heart replaces the default and gets the name from heartLabel (as aria-label); heart={false} leaves the heart
// out entirely, while the link stays.
test("kendi kalbin ve adı; heart={false} kalbi kaldırır", () => {
  const s = renderTest(() => <MadeWithMarchLab />)
  const coffee = s.get(".lab-coffee .m-madewith-heart")
  expect(coffee?.textContent).toBe("☕")
  expect(coffee?.getAttribute("aria-label")).toBe("Kahve")
  expect(s.get(".lab-noheart .m-madewith-heart")).toBe(null)
  expect(s.get(".lab-noheart a")).not.toBe(null)
})

// `link` changes the link text, `href` its address, and the common m:color prop shows up as a data attribute on the root.
test("link ve href bağlantıyı değiştirir; m:color satıra gider", () => {
  const s = renderTest(() => <MadeWithMarchLab />)
  const a = s.get(".lab-link a")
  expect(a?.textContent).toBe("March çatısı")
  expect(a?.getAttribute("href")).toBe("https://marchjs.com")
  expect(s.get(".lab-link")?.getAttribute("data-m-color")).toBe("brand-purple")
})

// `text` builds your own sentence: the real link and the heart are placed inside it, so the link is still a link and the
// heart is still the heart we gave.
test("text kendi cümleni kurar: bağlantı ve kalp içine yerleşir", () => {
  const s = renderTest(() => <MadeWithMarchLab />)
  const own = s.get(".lab-own")
  expect(own?.textContent).toContain("üzerine kuruldu")
  expect(own?.querySelector("a")?.textContent).toBe("MarchJS")
  expect(own?.querySelector(".m-madewith-heart")?.textContent).toBe("🚀")
})
