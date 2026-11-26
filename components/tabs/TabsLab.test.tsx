// Tests for TabsLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TabsLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - Tabs are found with the data-lab attribute that the Lab adds through `tabProps` (tabProps gives each tab button extra
//   attributes), which is a stable handle that does not depend on the visible text.
// - s.get / s.all find elements by CSS selector, s.find(text) by visible text, s.sees(text) says whether a text is on the
//   page; s.click(el or text) clicks like a user and waits until the view has updated (so a test that clicks is async and
//   awaits it).
// - The tests check what a user or a screen reader can observe (aria-selected, disabled, title, the panel text) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value. .m-tab-close is the close mark of a closable
// tab; .lab-tabs2 and .lab-tabs3 come from TabsLab.
import { test, expect, renderTest } from "march/testing"
import { TabsLab } from "./TabsLab.tsx"

// The first Tabs uses activation="manual", but a click still selects. The selected tab gets aria-selected, the badge (the
// team size) is shown inside the tab, and onChange updated the state that the panel prints.
test("Ekip'e basınca seçilir, onChange paneli değiştirir; rozet sekmede", async () => {
  const s = renderTest(() => <TabsLab />)
  const team = s.get("[data-lab='team']")!
  await s.click(team)
  expect(team.getAttribute("aria-selected")).toBe("true")
  expect(team.textContent).toContain("3")
  expect(s.sees("Seçili: team · 3 kişi")).toBe(true)
})

// `disabled: true` renders a disabled tab button, and its `title` tells the user why.
test("disabled sekme kilitli ve nedenini title'da söyler", () => {
  const s = renderTest(() => <TabsLab />)
  const billing = s.get("[data-lab='billing']")
  expect(billing?.hasAttribute("disabled")).toBe(true)
  expect(billing?.getAttribute("title")).toBe("Planınızda yok")
})

// A `hidden` tab is not drawn until its condition changes (the eye button in `actions` toggles it). The "changed" dot has
// an accessible name (labels.dirty), and pressing the close mark calls onClose, which hides the tab again.
test("hidden sekme eylemle gelir; değişti noktası adını taşır; kapatma işareti onClose'u çağırır", async () => {
  const s = renderTest(() => <TabsLab />)
  expect(s.get("[data-lab='draft']")).toBe(null)
  await s.click("Taslağı göster")
  expect(s.get("[data-lab='draft']")).not.toBe(null)
  expect(s.find("kaydedilmedi")).not.toBe(null)
  await s.click(s.get("[data-lab='draft'] .m-tab-close")!)
  expect(s.get("[data-lab='draft']")).toBe(null)
})

// `panel={false}` draws only the tab strip (no tabpanel), and bind:value writes the choice into the Lab's state. The last
// Tabs is built from <Tab> children instead of a `tabs` array, and `title` on a <Tab> goes to its button.
test("panel={false} yalnız şerit çizer, bind:value seçimi yazar; <Tab> çocukları sekme olur", async () => {
  const s = renderTest(() => <TabsLab />)
  expect(s.get(".lab-tabs2 [role='tabpanel']")).toBe(null)
  await s.click("Küçük")
  expect(s.sees("Boyut: sm")).toBe(true)
  expect(s.all(".lab-tabs3 [role='tab']").length).toBe(3)
  expect(s.find("Son sekme")?.textContent).toBe("Üçüncü")
})
