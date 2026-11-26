// Tests for MenuLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <MenuLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get("selector") finds one element by CSS selector and s.all("selector") every match; s.sees("text") says whether text
//   is visible. s.click(element or "text") clicks like a user and waits until the view has updated, and it returns the
//   element it clicked, which is why the tests that click are async and await it.
// - A menu panel is drawn in a floating layer, outside the root the test mounted into. That is why the tests do not search
//   s.get for panel items: panelOf() finds the panel through the id in the trigger's aria-controls, the same link a
//   screen reader follows.
// - The tests check what a user or a screen reader can observe (ARIA roles and states, which entries exist, the text the Lab
//   writes after a choice) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { MenuLab } from "./MenuLab.tsx"

// The open panel is found through the id in the trigger's aria-controls (it lives in the floating layer).
const panelOf = (trigger: Element) => document.getElementById(trigger.getAttribute("aria-controls") ?? "")

// The trigger carries the menu ARIA (aria-haspopup="menu", aria-expanded false then true); the panel has role="menu"
// with four entries (the hidden entry is not drawn, the disabled one is) and a separator.
test("tetik menü ARIA'sını taşır ve basınca panel açılır", async () => {
  const s = renderTest(() => <MenuLab />)
  const trigger = s.get(".lab-file")!
  expect(trigger.getAttribute("aria-haspopup")).toBe("menu")
  expect(trigger.getAttribute("aria-expanded")).toBe("false")
  await s.click(trigger)
  expect(trigger.getAttribute("aria-expanded")).toBe("true")
  const panel = panelOf(trigger)!
  expect(panel.getAttribute("role")).toBe("menu")
  // The hidden entry is not drawn: rename, copy, archive (disabled) and delete remain.
  expect(panel.querySelectorAll("[role=menuitem]").length).toBe(4)
  expect(panel.querySelector("[role=separator]")).not.toBe(null)
})

// Choosing an entry runs its onSelect (the Lab writes "Selected: ..." into its text line) and closes the menu again.
test("bir öğe seçilince onSelect çalışır ve menü kapanır", async () => {
  const s = renderTest(() => <MenuLab />)
  const trigger = s.get(".lab-file")!
  await s.click(trigger)
  const rename = Array.from(panelOf(trigger)!.querySelectorAll("[role=menuitem]")).find((x) => x.textContent?.includes("Yeniden adlandır"))!
  await s.click(rename)
  expect(s.sees("Seçilen: Yeniden adlandır")).toBe(true)
  expect(trigger.getAttribute("aria-expanded")).toBe("false")
})

// Radio entries are role="menuitemradio" with aria-checked; the first sort order is checked at the start, and choosing
// another one updates the state the Lab prints.
test("radyo öğeleri aria-checked taşır; seçim değişir", async () => {
  const s = renderTest(() => <MenuLab />)
  const trigger = await s.click("Sırala")
  const radios = Array.from(panelOf(trigger)!.querySelectorAll("[role=menuitemradio]"))
  expect(radios.length).toBe(3)
  expect(radios[0].getAttribute("aria-checked")).toBe("true")
  await s.click(radios[1])
  expect(s.sees("Sıra: Tarih")).toBe(true)
})

// A Dropdown opens a dialog-like panel (aria-haspopup="dialog"). Its content is a function of `close`, so the "done" button
// can close the panel. Then the lock button disables the last Menu's trigger, which is found by its aria-label.
test("Dropdown bir diyalog paneli açar; disabled tetiğe basılamaz", async () => {
  const s = renderTest(() => <MenuLab />)
  const tags = await s.click("Etiketler")
  expect(tags.getAttribute("aria-haspopup")).toBe("dialog")
  expect(tags.getAttribute("aria-expanded")).toBe("true")
  // The content is drawn by a function (close) => ...: pressing the button inside it closes the panel.
  await s.click("Tamam")
  expect(tags.getAttribute("aria-expanded")).toBe("false")
  await s.click("Kilitle")
  expect((s.all("button").find((b: Element) => b.getAttribute("aria-label") === "Kilitli") as HTMLButtonElement).disabled).toBe(true)
})
