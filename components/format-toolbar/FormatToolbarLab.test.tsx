// Tests for FormatToolbarLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <FormatToolbarLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(text) finds an element by its accessible name or text; s.get(selector) / s.all(selector) use CSS selectors;
//   s.click(...) clicks like a user, waits until the view has updated and returns the element (so those tests are async).
// - The tests check observable things (aria-pressed, aria-label, role, which buttons are disabled) rather than internal
//   state, so they keep passing when the component's internals change.
import { test, expect, renderTest } from "march/testing"
import { FormatToolbarLab } from "./FormatToolbarLab.tsx"

// Pressing a toggle tool: aria-pressed turns true, its live name changes, the bar's live name changes, and onTool ran.
test("Kalın'a basınca basılı olur, adı ve çubuğun adı canlı değişir", async () => {
  const s = renderTest(() => <FormatToolbarLab />)
  const b = await s.click("Kalın: kapalı")
  expect(b.getAttribute("aria-pressed")).toBe("true")
  expect(b.getAttribute("aria-label")).toBe("Kalın: açık")
  expect(s.find("Biçim (1)")?.getAttribute("role")).toBe("toolbar")
  expect(s.sees("Son araç: bold")).toBe(true)
})

// Own names, keys, attrs and prefix reach the DOM: name() renames the link tool, keys set aria-keyshortcuts, attrs add the popup hint and class, prefix adds the host class.
test("name işlevi, keys, attrs ve prefix bağlantı düğmesine yazılır", () => {
  const s = renderTest(() => <FormatToolbarLab />)
  const link = s.find("Bağlantı ekle")
  expect(link?.getAttribute("aria-keyshortcuts")).toBe("Control+L")
  expect(link?.getAttribute("aria-haspopup")).toBe("dialog")
  expect(link?.className).toContain("lab-tool")
  expect(link?.className).toContain("lab-link")
  expect(s.get(".lab-bar")?.className).toContain("lab-toolbar")
})

// disabled as a function disables only redo; disabled as true disables every button of the second bar.
test("redo tek başına, ikinci çubuk tümüyle devre dışı", () => {
  const s = renderTest(() => <FormatToolbarLab />)
  expect(s.get(".lab-bar")?.querySelectorAll("button[disabled]").length).toBe(1)
  const off = s.find("Kapalı çubuk")?.querySelectorAll("button") ?? []
  expect([...off].every((b) => b.hasAttribute("disabled"))).toBe(true)
})

// With hints on, a tool's tooltip includes its shortcut; switching hints off leaves just the name.
test("Büyük çubuğun ipucunda kısayol var; Küçült onu kaldırır", async () => {
  const s = renderTest(() => <FormatToolbarLab />)
  expect(s.find("Eğik")?.getAttribute("title")).not.toBe("Eğik")
  await s.click("Küçült")
  expect(s.find("Eğik")?.getAttribute("title")).toBe("Eğik")
})
