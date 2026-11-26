// Tests for IconButtonLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <IconButtonLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(name) finds an element by its accessible name or text; s.click(name) clicks like a user, waits until the view has
//   updated and returns the element (so those tests are async).
// - The tests check what a user or a screen reader can observe (names, aria-pressed, title, tag name, href) rather than
//   internal state.
import { test, expect, renderTest } from "march/testing"
import { IconButtonLab } from "./IconButtonLab.tsx"

// The toggle: after a press its name changes and aria-pressed is true (the same element is returned by the click).
test("Beğen'e basınca adı Beğenildi olur ve basılı durur", async () => {
  const s = renderTest(() => <IconButtonLab />)
  const like = await s.click("Beğen")
  expect(like.getAttribute("aria-label")).toBe("Beğenildi")
  expect(like.getAttribute("aria-pressed")).toBe("true")
})

// label is both the accessible name and the tooltip; a custom title wins, title={false} removes it.
test("label hem erişilebilir ad hem ipucu; title={false} ipucunu kaldırır", () => {
  const s = renderTest(() => <IconButtonLab />)
  expect(s.find("Bilgi")?.getAttribute("title")).toBe("Kendi ipucum: sürüm 0.2.0")
  expect(s.find("Ayarlar")?.hasAttribute("title")).toBe(false)
  expect(s.find("Ekle (sm)")?.getAttribute("title")).toBe("Ekle (sm)")
})

// The badge child: pressing the button resets the count to zero, and the +1 button raises it again; the name follows the count.
test("Bildirimlere basınca rozet sıfırlanır, +1 yeniden artırır", async () => {
  const s = renderTest(() => <IconButtonLab />)
  await s.click("Bildirimler (3)")
  expect(s.find("Bildirimler (0)")).not.toBe(null)
  await s.click("Yeni bildirim")
  expect(s.find("Bildirimler (1)")?.textContent).toContain("1")
})

// href turns the button into a link: an <a> with the given address.
test("href verilince düğme bir bağlantı olur", () => {
  const s = renderTest(() => <IconButtonLab />)
  const site = s.find("March sitesi")
  expect(site?.tagName).toBe("A")
  expect(site?.getAttribute("href")).toBe("https://marchjs.com")
})
