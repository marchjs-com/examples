// Tests for PageDotsLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PageDotsLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(name) looks up an element by its accessible name (null when missing), s.get(selector) uses a CSS selector,
//   s.sees(text) says whether text is visible, and s.click(name) clicks like a user, waits until the view has updated and
//   returns the clicked element. Whatever awaits is why those tests are async.
// - The tests look dots up by the accessible names the Lab sets through `labels`, so they also prove that a screen reader
//   hears those names. They check roles and aria attributes rather than internal state.
// To adapt them: copy one test, change the name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { PageDotsLab } from "./PageDotsLab.tsx"

// Clicking the third dot makes it current (aria-current) and updates the bound value, which the Lab prints. The read-only
// dots below it are one image whose name comes from labels.status and shows the same position.
test("Bir noktaya basınca o sayfa geçerli olur; salt okunur noktalar konumu duyurur", async () => {
  const s = renderTest(() => <PageDotsLab />)
  const third = await s.click("Fotoğraf 3")
  expect(third.getAttribute("aria-current")).toBe("true")
  expect(s.sees("Seçili: 3 / 5")).toBe(true)
  expect(s.find("Konum: 3 / 5")?.getAttribute("role")).toBe("img")
})

// labels.group names the group of dot buttons; size and class end up on the root (the size as a modifier class).
test("labels.group grubun adı; size ve class kökte", () => {
  const s = renderTest(() => <PageDotsLab />)
  const group = s.find("Galeri sayfaları")
  expect(group?.getAttribute("role")).toBe("group")
  expect(group?.classList.contains("lab-gallery")).toBe(true)
  expect(group?.classList.contains("m-page-dots-lg")).toBe(true)
})

// The `dot` function draws its own content and receives whether the dot is active: before the click it shows the number,
// after the click it shows the star. The vertical orientation is a modifier class on the parent.
test("dot kendi içeriği çizer ve etkin olanı bilir; dikey dizilim", async () => {
  const s = renderTest(() => <PageDotsLab />)
  expect(s.find("Bölüm 2")?.textContent).toBe("2")
  const second = await s.click("Bölüm 2")
  expect(second.textContent).toBe("★")
  expect(second.parentElement?.classList.contains("m-page-dots-vertical")).toBe(true)
})

// `decorative` hides read-only dots from screen readers; `disabled` turns the dot buttons off.
test("decorative ekran okuyucudan gizler; disabled düğmeleri kapatır", () => {
  const s = renderTest(() => <PageDotsLab />)
  expect(s.get(".lab-decor")?.getAttribute("aria-hidden")).toBe("true")
  expect(s.find("Kilitli 1")?.hasAttribute("disabled")).toBe(true)
})
