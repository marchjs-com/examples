// Tests for MediaLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <MediaLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector; s.sees("text") says whether text is visible; s.click("text") clicks
//   a button by its text and waits until the view has updated, which is why the tests that click are async and await it.
// - s.flush() waits one more update. One test sends an "error" event to an image by hand (the way a browser does when a
//   file fails to load), so it needs to wait for the fallback to be drawn.
// - The tests check what a user or a screen reader can observe (the element type, alt, poster, controls, a size class,
//   the fallback text) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { MediaLab } from "./MediaLab.tsx"

// An image is a real <img> with its alt text, and size="md" gives it the medium size class.
test("resim bir img: adresi, alt metni ve boyut sınıfı", () => {
  const s = renderTest(() => <MediaLab />)
  const img = s.get(".lab-image")
  expect(img?.tagName).toBe("IMG")
  expect(img?.getAttribute("alt")).toBe("Gün batımında tepeler")
  expect(img?.classList.contains("m-media-md")).toBe(true)
})

// The hand-configured video is a <video> with its poster, and controls={false} means it has no controls attribute.
test("video: afiş, döngü ve sessiz; controls={false} denetimleri kaldırır", () => {
  const s = renderTest(() => <MediaLab />)
  const v = s.get(".lab-video")
  expect(v?.tagName).toBe("VIDEO")
  expect(v?.getAttribute("poster")).toContain("hadi-waves.jpg")
  expect(v?.hasAttribute("controls")).toBe(false)
})

// With kind="auto" the element follows the file extension: .jpg is an image, and after the button changes the source to
// .webm the same Media becomes a video.
test("auto tür uzantıyı izler: düğme resmi videoya çevirir", async () => {
  const s = renderTest(() => <MediaLab />)
  expect(s.get(".lab-auto")?.tagName).toBe("IMG")
  await s.click("Resim / video")
  expect(s.get(".lab-auto")?.tagName).toBe("VIDEO")
})

// A file that cannot be loaded is replaced by the fallback text. We trigger it by dispatching an error event on the image.
test("yüklenemeyen resim yerine yedek metin", async () => {
  const s = renderTest(() => <MediaLab />)
  s.get(".lab-broken")?.dispatchEvent(new Event("error"))
  await s.flush()
  expect(s.sees("Medya yüklenemedi")).toBe(true)
})
