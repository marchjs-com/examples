// Tests for BottomNavLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <BottomNavLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(text) finds an element by its visible text or accessible name and clicks it like a user; it waits until
//   the view has updated, so every test that clicks is async and awaits it. s.sees(text) says whether text is on
//   screen. s.wait(condition) polls until a condition is true: used where something happens after an animation.
// - The tests check what a user can observe (visible text such as the active tab name, a badge, a menu title) rather
//   than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the text you click or expect.
import { test, expect, renderTest } from "march/testing"
import { BottomNavLab } from "./BottomNavLab.tsx"

// Pressing a tab calls onChange; the Lab shows the active id in a badge.
test("bir sekmeye basınca onChange değeri değiştirir ve sekme etkin olur", async () => {
  const s = renderTest(() => <BottomNavLab />)
  await s.click("Keşfet")
  expect(s.sees("Sekme: explore")).toBe(true)
})

// A badge count of 120 is written "99+"; opening the tab whose badge it is makes the Lab set the count to 0, and a
// count of 0 hides the badge.
test("120 bildirim 99+ yazılır; sekmesi açılınca sıfırlanır", async () => {
  const s = renderTest(() => <BottomNavLab />)
  expect(s.sees("99+")).toBe(true)
  await s.click("Bildirimler")
  expect(s.sees("99+")).toBe(false)
})

// The Create button is named by `createLabel` ("Yeni ekle"). The first two clicks cycle the Lab's menu look
// (fan, stack, sheet); with the "sheet" look the menu opens as a bottom sheet whose heading is `createTitle`.
test("Oluştur düğmesinin adı createLabel'dan gelir; alt sayfa menüsünde başlığı görünür", async () => {
  const s = renderTest(() => <BottomNavLab />)
  await s.click("Menü: fan")
  await s.click("Menü: stack")
  expect(s.sees("Menü: sheet")).toBe(true)
  await s.click("Yeni ekle")
  expect(s.sees("Ne paylaşalım?")).toBe(true)
})

// Choosing an action in the Create menu calls onAction with its id. The menu opens with an animation, so the test
// waits for the Lab's log text instead of reading it at once.
test("bir eylem seçilince onAction çalışır", async () => {
  const s = renderTest(() => <BottomNavLab />)
  await s.click("Yeni ekle")
  await s.click("Hikâye")
  await s.wait(() => s.sees("onAction: story"))
  expect(s.sees("onAction: story")).toBe(true)
})
