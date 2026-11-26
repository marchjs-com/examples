// Tests for LedBoardLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <LedBoardLab />) mounts the Lab in a fresh root and returns a handle `s`.
// - The LEDs are drawn on a canvas, which a test cannot read, so the tests check what LedBoard promises around it:
//   the focusable region and its name, the live text a screen reader hears, and the keyboard.
// - s.get(selector) finds an element; the Lab gives each board its own class.
// To adapt them: copy one test and change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { LedBoardLab } from "./LedBoardLab.tsx"

// The board is a focusable region with its label; inside, the LED screen is an image and a live region holds the text
// of the scene that is showing.
test("pano odaklanabilir bir bölge; ekran bir resim; sahnenin metni canlı bölgede", () => {
  const s = renderTest(() => <LedBoardLab />)
  const board = s.get(".lab-main")
  expect(board?.getAttribute("role")).toBe("region")
  expect(board?.getAttribute("aria-label")).toBe("Laboratuvar panosu")
  expect(board?.getAttribute("tabindex")).toBe("0")
  expect(board?.querySelector(".m-led")?.getAttribute("role")).toBe("img")
  expect(board?.querySelector("[aria-live]")?.textContent).toBe("Merhaba March sparkle")
})

// The arrow keys step through the scenes: → shows the rocket, ← goes back to the text.
test("oklar sahneler arasında gezer", () => {
  const s = renderTest(() => <LedBoardLab />)
  const board = s.get(".lab-main")!
  const live = () => board.querySelector("[aria-live]")?.textContent
  board.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }))
  expect(live()).toBe("rocket")
  board.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }))
  expect(live()).toBe("Merhaba March sparkle")
})

// Space pauses the board (it shows a pause mark through data-paused) and resumes it.
test("Boşluk durdurur ve sürdürür", () => {
  const s = renderTest(() => <LedBoardLab />)
  const board = s.get(".lab-main")!
  board.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }))
  expect(board.hasAttribute("data-paused")).toBe(true)
  board.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }))
  expect(board.hasAttribute("data-paused")).toBe(false)
})

// live="off" silences the live region; text= is one text scene, emoji read by their names.
test("live=off sessiz; text tek sahne", () => {
  const s = renderTest(() => <LedBoardLab />)
  expect(s.get(".lab-once [aria-live]")?.getAttribute("aria-live")).toBe("off")
  expect(s.get(".lab-text [aria-live]")?.textContent).toBe("8x8 star")
})
