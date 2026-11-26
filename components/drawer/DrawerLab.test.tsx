// Tests for DrawerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <DrawerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it; s.click(target) clicks like a user (a visible text or an element) and waits for the view
//   to update, so tests that click are async.
// - s.flush(2) lets the drawer's entrance settle; the drawer is drawn in a layer on the page, which s.sees also searches.
// - The tests check what a user or a screen reader can see (roles, aria attributes, visible text), not internal state,
//   so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { DrawerLab } from "./DrawerLab.tsx"

// Opening the drawer shows its `title` and its content. The Lab takes `startOpen` so the tests start with it closed.
test("açılınca başlık ve içerik görünür", async () => {
  const s = renderTest(() => <DrawerLab startOpen={false} />)
  await s.click("Çekmeceyi aç")
  await s.flush(2)
  expect(s.sees("Duyurular")).toBe(true)
  expect(s.sees("Bugün iki yeni özellik yayında.")).toBe(true)
})

// With snap points the grab handle is a button whose accessible name comes from `handleLabel`.
test("tutamaç handleLabel adını alır", async () => {
  const s = renderTest(() => <DrawerLab startOpen={false} />)
  await s.click("Çekmeceyi aç")
  await s.flush(2)
  expect(s.find("Çekmeceyi sürükle")).not.toBe(null)
})

// `snap` is controlled: the Lab's button changes it from 0 to 1, the drawer moves to its second stop, and the badge
// that shows the Lab's value reads 1.
test("snap ile ikinci durma noktasına geçer", async () => {
  const s = renderTest(() => <DrawerLab startOpen={false} />)
  await s.click("Çekmeceyi aç")
  await s.flush(2)
  await s.click("Boyutu değiştir")
  await s.flush(2)
  expect(s.get(".lab-snap")?.textContent).toBe("Durma noktası 1")
})

// Choosing a side makes the drawer open from that edge; a top drawer gets the m-sheet-top class.
test("kenar seçilince çekmece o kenardan açılır", async () => {
  const s = renderTest(() => <DrawerLab startOpen={false} />)
  await s.click("Üst")
  await s.click("Çekmeceyi aç")
  await s.flush(2)
  expect(s.get(".lab-drawer")?.classList.contains("m-sheet-top")).toBe(true)
})
