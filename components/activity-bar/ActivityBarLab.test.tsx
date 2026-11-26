// Tests for ActivityBarLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ActivityBarLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click("Ara") finds an element by its visible text or accessible name, clicks it like a user and waits until the
//   view has updated, which is why every test that clicks is async and awaits it. It returns the clicked element.
// - s.get(selector) returns one element, s.sees(text) says whether the text is on screen.
// - The tests check what a user or a screen reader can observe (aria-selected, aria-current, aria-orientation,
//   visible text) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the label you click or the attribute you expect.
import { test, expect, renderTest } from "march/testing"
import { ActivityBarLab } from "./ActivityBarLab.tsx"

// Clicking a view selects it: the tab gets aria-selected="true" and points at the panel through aria-controls (the
// `controls` prop). Clicking the already selected view collapses the side view (default `collapsible`), and the
// Lab's panel then shows its "closed" text.
test("bir görünüme basınca seçilir; etkin olana yeniden basınca yan görünüm kapanır", async () => {
  const s = renderTest(() => <ActivityBarLab />)
  const ara = await s.click("Ara")
  expect(ara.getAttribute("aria-selected")).toBe("true")
  expect(ara.getAttribute("aria-controls")).toBe("lab-side")
  expect(s.sees("search görünümü")).toBe(true)
  await s.click("Ara")
  expect(s.sees("Yan görünüm kapalı")).toBe(true)
})

// The second bar uses collapsible={false}, so the selection stays when you click the active item again. It also
// checks that `orientation` given as a function is live: pressing the Lab's button flips the bar from horizontal to
// vertical without remounting it, and aria-orientation follows.
test("collapsible={false}: etkin olana yeniden basmak seçimi bırakmaz; çubuk canlı döner", async () => {
  const s = renderTest(() => <ActivityBarLab />)
  const gelen = await s.click("Gelen")
  expect(gelen.getAttribute("aria-selected")).toBe("true")
  expect(s.get(".lab-ab2")?.getAttribute("aria-orientation")).toBe("horizontal")
  await s.click("Çubuğu döndür")
  expect(s.get(".lab-ab2")?.getAttribute("aria-orientation")).toBe("vertical")
})

// With `subItems`, the selected view's children are shown; the one given by `subValue` is marked aria-current="page".
// The Lab prints the current sub page, which proves the onSubSelect / subValue wiring end to end.
test("subItems: seçilenin alt öğeleri görünür; birine basınca onSubSelect çalışır", async () => {
  const s = renderTest(() => <ActivityBarLab />)
  const recent = await s.click("Son kullanılanlar")
  expect(recent.getAttribute("aria-current")).toBe("page")
  expect(s.sees("Alt sayfa: recent")).toBe(true)
})

// An item with position: "end" and an onSelect is an action, not a view: clicking runs onSelect but never selects it.
// The same test confirms the plumbing props on the root: class, label (aria-label), m:color (data-m-color) and an
// item's `shortcut` (exposed as aria-keyshortcuts).
test("sondaki eylem öğesi seçilmez, onSelect'i çalışır; kök sınıf, renk, ad ve kısayol taşır", async () => {
  const s = renderTest(() => <ActivityBarLab />)
  await s.click("Ayarlar")
  expect(s.sees("Ayarlar 1 kez açıldı")).toBe(true)
  expect(s.get("[data-view='settings']")?.getAttribute("aria-selected")).toBe("false")
  const bar = s.get(".lab-ab")
  expect(bar?.getAttribute("role")).toBe("tablist")
  expect(bar?.getAttribute("aria-label")).toBe("Lab görünümleri")
  expect(bar?.getAttribute("data-m-color")).toBe("brand-green")
  expect(s.get("[data-view='git']")?.getAttribute("aria-keyshortcuts")).toBe("mod+shift+g")
})
