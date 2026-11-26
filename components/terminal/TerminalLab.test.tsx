// Tests for TerminalLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TerminalLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - A terminal is used by typing a line and pressing Enter, so the `run` helper below does exactly that: s.type(name, text)
//   types into the input found by its accessible name (the Lab sets it through labels.command), then a keydown
//   event for Enter is sent to it and s.flush(4) lets the pending ticks run so the output has been written.
// - s.sees(text) says whether a text is on the page, s.find(name) finds an element by its accessible name (the output logs
//   are named by `label`), s.get(selector) finds by CSS selector, and s.click(text) clicks like a user (so a test that clicks
//   is async and awaits it).
// - The tests check what a user can observe (printed lines, the class of the colour scheme, the prompt) rather than internal
//   state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the command line or the expected text.
import { test, expect, renderTest } from "march/testing"
import { TerminalLab } from "./TerminalLab.tsx"

// Types a command line into the terminal's input and presses Enter, then lets the output settle.
const run = async (s: ReturnType<typeof renderTest>, line: string) => {
  const input = await s.type("Komut satırı", line)
  input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }))
  await s.flush(4)
}

// The `say` command with the --loud option prints in upper case, and its handler also writes the text to the second,
// read-only terminal (the event log) through its ref.
test("say komutu yazar ve alttaki kayda düşer", async () => {
  const s = renderTest(() => <TerminalLab />)
  await run(s, "say --loud merhaba")
  expect(s.sees("MERHABA")).toBe(true)
  expect(s.find("Olay kaydı")?.textContent).toContain("say merhaba")
})

// A sub-command with typed arguments: "math add 2 3" parses both as numbers and the handler prints their sum in the
// first terminal's output, which is found by its `label`.
test("alt komut: math add 2 3 = 5", async () => {
  const s = renderTest(() => <TerminalLab />)
  await run(s, "math add 2 3")
  expect(s.find("Laboratuvar çıktısı")?.textContent).toContain("5")
})

// A line that is not a command goes to `fallback`: an expression is calculated, and anything else gets our own message.
test("komut değilse fallback hesaplar, anlaşılmazsa söyler", async () => {
  const s = renderTest(() => <TerminalLab />)
  await run(s, "6*7")
  expect(s.sees("= 42")).toBe(true)
  await run(s, "selam")
  expect(s.sees("anlaşılmadı: selam")).toBe(true)
})

// `scheme` and `prompt` are functions of the Lab's state: the button cycles the colour scheme, which changes the
// terminal's scheme class, and the prompt text follows the scheme's name.
test("takım düğmesi renk takımını ve istemi değiştirir", async () => {
  const s = renderTest(() => <TerminalLab />)
  expect(s.get(".lab-term")?.className).toContain("m-term-auto")
  await s.click("Takım: auto")
  expect(s.get(".lab-term")?.className).toContain("m-term-surface")
  expect(s.sees("surface$")).toBe(true)
})
