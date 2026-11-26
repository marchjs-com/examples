// Tests for MediaGridLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <MediaGridLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector; s.click("text") clicks a button found by its accessible name (here
//   the name written by tileLabel) and waits until the view has updated, which is why the test that clicks is async and
//   awaits it. s.flush(3) waits a few more updates.
// - The tests check what a user or a screen reader can observe (the group's name, the text of the "more" tile, the text the
//   Lab writes when a tile opens) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the name or the expected text. MediaGrid's part classes (m-mgrid-tile,
// m-mgrid-more...) are listed in the MediaGrid docs.
import { test, expect, renderTest } from "march/testing"
import { MediaGridLab } from "./MediaGridLab.tsx"

// The group is named by `label`, and with five photos and max={3} the last tile shows our own "more" text instead of the
// default.
test("ızgara adını label'dan alır, fazlası kendi metniyle", () => {
  const s = renderTest(() => <MediaGridLab />)
  expect(s.get(".lab-grid")?.getAttribute("aria-label")).toBe("Gezi")
  expect(s.get(".lab-grid")?.textContent).toContain("daha")
})

// A tile is a button named by tileLabel ("Photo 1 / 5"). Clicking it calls onOpen with the tile's index (0), which the Lab
// writes into its log. Because onDoubleTap is set, a single tap is held back for a short double-tap window, so the test
// waits a few extra updates with s.flush(3) before reading the log.
test("tileLabel kutuların adını verir, basınca onOpen", async () => {
  const s = renderTest(() => <MediaGridLab />)
  await s.click("Fotoğraf 1 / 5")
  await s.flush(3)
  expect(s.get(".lab-log")?.textContent).toContain("0")
})
