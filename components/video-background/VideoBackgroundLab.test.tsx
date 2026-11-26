// Tests for VideoBackgroundLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <VideoBackgroundLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns the first match, s.find(text) the element that shows a text, and s.click(text) clicks like
//   a user and waits until the view has updated (that is why the tests that click are async and await it).
// - The tests check observable things (classes on the root, the poster image, the content, the pause button) rather
//   than whether the video really plays, which a test environment cannot do. The tint classes (m-vbg-tint-dark...)
//   and the parts (.m-vbg-tint, .m-vbg-toggle) are listed in the VideoBackground docs.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { VideoBackgroundLab } from "./VideoBackgroundLab.tsx"

// The `class` prop is on the root, the dark tint gives the root its tint class and draws the layer element, and the
// content from children is on top.
test("kök sınıfı, koyu katman ve üstteki içerik", () => {
  const s = renderTest(() => <VideoBackgroundLab />)
  const root = s.get(".lab-vbg")
  expect(root?.classList.contains("m-vbg-tint-dark")).toBeTruthy()
  expect(s.get(".lab-vbg .m-vbg-tint")).not.toBe(null)
  expect(s.find("Dalgaların üstünde")).not.toBe(null)
})

// The poster is an image drawn at once, before (and instead of) the video; its src is the poster file.
test("afiş hemen görünür", () => {
  const s = renderTest(() => <VideoBackgroundLab />)
  expect(s.get(".lab-vbg img")?.getAttribute("src")).toContain("hadi-waves.jpg")
})

// Choosing the "none" tint (the segmented option whose label is "yok") removes the layer element and switches the
// root to the m-vbg-tint-none class.
test("katman yok: renk katmanı kalkar", async () => {
  const s = renderTest(() => <VideoBackgroundLab />)
  await s.click("yok")
  expect(s.get(".lab-vbg")?.classList.contains("m-vbg-tint-none")).toBeTruthy()
  expect(s.get(".lab-vbg .m-vbg-tint")).toBe(null)
})

// The content stays interactive on top of the video (the like button counts), and controls={false} (the second toggle
// of the panel) removes the pause button from the page.
test("içerik videonun üstünde tıklanır; durdur düğmesi kapanınca gider", async () => {
  const s = renderTest(() => <VideoBackgroundLab />)
  await s.click("Beğen (0)")
  expect(s.find("Beğen (1)")).not.toBe(null)
  await s.click("Durdur düğmesi")
  expect(s.get(".m-vbg-toggle")).toBe(null)
})
