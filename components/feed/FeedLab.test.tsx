// Tests for FeedLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <FeedLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(textOrElement) clicks like a user and waits until the view has updated (so those tests are async);
//   s.sees(text) says whether the text is on screen; s.find(text) returns the element; s.wait(fn) polls until fn is true.
// - The tests check what a user can observe (visible text) rather than internal state, so they keep passing when the
//   component's internals change.
import { test, expect, renderTest } from "march/testing"
import { FeedLab } from "./FeedLab.tsx"

// Feed is a virtual list: it only draws posts near the screen. A test that looks for posts therefore needs a container that is
// "on screen". This helper adds an invisible (opacity 0, no pointer events) fixed-position box and returns it as the
// render target; renderTest accepts { container, root } as its second argument.
const onScreen = () => {
  const box = document.body.appendChild(document.createElement("div"))
  box.style.cssText = "position:fixed;inset:0 auto auto 0;inline-size:600px;opacity:0;pointer-events:none"
  return { container: box, root: box }
}
// The waiting-posts pill shows the text we gave in newPill; pressing it runs onShowNew, which merges the posts and logs it.
test("bekleyen gönderi hapı kendi içeriğiyle görünür; basınca gönderiler akışa katılır", async () => {
  const s = renderTest(() => <FeedLab />)
  await s.click("Yeni gelsin")
  expect(s.sees("⬆ 1 taze gönderi")).toBe(true)
  await s.click("⬆ 1 taze gönderi")
  await s.wait(() => s.sees("yeniler eklendi"))
  expect(s.sees("yeniler eklendi")).toBe(true)
})

// With no posts, Feed shows the `empty` content we passed instead of a list.
test("akış boşalınca empty içeriği görünür", async () => {
  const s = renderTest(() => <FeedLab />)
  await s.click("Boşalt")
  expect(s.sees("Burada henüz kimse yazmadı")).toBe(true)
})

// postProps are passed to every PostCard: the custom like label appears, and pressing it runs onLike, which writes to the log.
test("postProps her gönderiye gider: Beğen düğmesi onLike'ı çalıştırır", async () => {
  const s = renderTest(() => <FeedLab />, onScreen())
  await s.wait(() => s.find("Beğen"), { timeout: 5000 })   // posts are drawn frame by frame, so wait for them
  await s.click("Beğen")
  await s.wait(() => s.sees("beğeni: Üye"))
  expect(s.sees("beğeni: Üye")).toBe(true)
})

// A Feed with renderPost draws your own markup for each post, not a PostCard.
test("renderPost ile çizilen gönderi PostCard değil, kendi içeriği", async () => {
  const s = renderTest(() => <FeedLab />, onScreen())
  await s.wait(() => s.sees("Kendi çizimin"), { timeout: 5000 })
  expect(s.sees("Kendi çizimin: renderPost")).toBe(true)
})
