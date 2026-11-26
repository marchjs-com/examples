// Tests for ButtonGroupLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ButtonGroupLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds an element by its visible text or accessible name (null when absent), s.get(selector) returns
//   one element, and s.click(text) clicks like a user, waits until the view has updated and returns the clicked
//   element (so those tests are async and await it).
// - The tests check what a user or a screen reader can observe (role, accessible name, aria-pressed, visible text)
//   rather than internal state. Group classes (.m-btn-group, .m-btn-group-attached) are in the ButtonGroup docs.
// To adapt them: copy one test, change the name you look for or the expected value.
import { test, expect, renderTest } from "march/testing"
import { ButtonGroupLab } from "./ButtonGroupLab.tsx"

// The group is role="group" and its `label` is the accessible name; the default (spaced) group has no "attached" class.
test("grup role=group ve label'ı erişilebilir ad olarak taşır", () => {
  const s = renderTest(() => <ButtonGroupLab />)
  const g = s.find("Geçmiş")
  expect(g?.getAttribute("role")).toBe("group")
  expect(g?.className.includes("m-btn-group")).toBe(true)
  expect(g?.className.includes("m-btn-group-attached")).toBe(false)
})

// `attached` joins the buttons into one strip (a class on the group), and `class` adds your own class to it.
test("attached bitişik şerit yapar, class gruba eklenir", () => {
  const s = renderTest(() => <ButtonGroupLab />)
  const g = s.get(".lab-marks")
  expect(g?.className.includes("m-btn-group-attached")).toBe(true)
  expect(g?.querySelectorAll("button").length).toBe(3)
})

// `label` given as a function is live: its text lists the pressed marks, so pressing a button changes the group's
// accessible name, and the pressed button reports aria-pressed="true".
test("canlı label: bir biçim seçilince grubun adı değişir", async () => {
  const s = renderTest(() => <ButtonGroupLab />)
  expect(s.get(".lab-marks")?.getAttribute("aria-label")).toBe("Biçim: Kalın")
  const italic = await s.click("Eğik")
  expect(italic.getAttribute("aria-pressed")).toBe("true")
  expect(s.get(".lab-marks")?.getAttribute("aria-label")).toBe("Biçim: Kalın, Eğik")
})

// m:color on the group gives every button inside the colour scope, and the counter button still works.
test("m:color gruba renk kapsamı verir; düğme sayacı artar", async () => {
  const s = renderTest(() => <ButtonGroupLab />)
  expect(s.find("Kaydet")?.getAttribute("data-m-color")).toBe("brand-purple")
  await s.click("Kaydet (0)")
  expect(s.find("Kaydet (1)")).not.toBe(null)
})
