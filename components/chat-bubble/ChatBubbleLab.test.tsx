// Tests for ChatBubbleLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ChatBubbleLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns one element, s.sees(text) says whether text is on screen, and s.click(el or text) clicks
//   like a user and waits until the view has updated (so the tests that click are async and await it).
// - The tests check what a user can observe (visible text, the log line the Lab writes from each callback) rather than
//   internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { ChatBubbleLab } from "./ChatBubbleLab.tsx"

// `text` is drawn, `sender` appears in a group-chat bubble, and children replace the text with your own content.
test("metin, gönderen ve kendi içerik çizilir", () => {
  const s = renderTest(() => <ChatBubbleLab />)
  expect(s.sees("Merhaba!")).toBe(true)
  expect(s.get(".lab-other")?.textContent).toContain("Elif")
  expect(s.get(".lab-kids")?.textContent).toContain("Kendi içeriğim")
})

// formatTime writes the time in the format you give (hours.minutes here) instead of the locale's short time.
test("formatTime saati kendi biçiminde yazar", () => {
  const s = renderTest(() => <ChatBubbleLab />)
  expect(s.get(".lab-mine")?.textContent).toContain("9.41")
})

// A reaction chip is a button: pressing it calls onReact with the emoji, and the Lab writes it to its log line.
test("tepki çipine basınca onReact çağrılır", async () => {
  const s = renderTest(() => <ChatBubbleLab />)
  await s.click(s.get(".lab-other button")!)
  expect(s.get(".lab-log")?.textContent).toContain("tepki")
})

// `reply` draws the quoted message above the text. On a failed message the retry line (its text comes from
// labels.retry) is a button, and pressing it calls onRetry.
test("alıntı çizilir, onRetry yeniden dener", async () => {
  const s = renderTest(() => <ChatBubbleLab />)
  expect(s.get(".lab-fail")?.textContent).toContain("Elif")
  await s.click("Gitmedi · Yeniden dene")
  expect(s.get(".lab-log")?.textContent).toBe("yeniden")
})
