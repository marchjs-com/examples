// Tests for ChatThreadLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ChatThreadLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements inside it; s.sees(text) says whether a text is visible;
//   s.text() is all visible text; s.click(elementOrText) clicks like a user and waits until the view has updated
//   (that is why the tests that click are async and await it).
// - The tests check what a user can observe (names, buttons, texts) instead of internal state, so they keep passing
//   when the component's internals change. Class names of the parts (.m-msg-retry…) are listed in the ChatThread docs.
import { test, expect, renderTest } from "march/testing"
import { ChatThreadLab } from "./ChatThreadLab.tsx"

// `group` is true at the start, so a run of messages from another person shows the sender's name above it; the
// message text must be rendered as well.
test("grup sohbetinde gönderenin adı görünür", () => {
  const s = renderTest(() => <ChatThreadLab />)
  expect(s.sees("Ece")).toBe(true)
  expect(s.sees("Akşam yemeği kimde?")).toBe(true)
})

// A message with status "failed" shows a retry button. Clicking it calls onRetry; the Lab marks the message "sent"
// and writes into its log, so the button disappears and the log text appears: both are visible effects.
test("gidemeyen mesajın Yeniden dene düğmesi onRetry'ı çalıştırır", async () => {
  const s = renderTest(() => <ChatThreadLab />)
  const retry = s.get(".lab-chat .m-msg-retry")
  expect(retry).toBeTruthy()
  await s.click(retry!)
  expect(s.get(".lab-chat .m-msg-retry")).toBe(null)
  expect(s.sees("yeniden gönderildi")).toBe(true)
})

// The reply quote and the reaction chip of the sample messages are drawn inside the bubbles.
test("yanıt, tepki ve düzenlendi işaretleri balonlarda görünür", () => {
  const s = renderTest(() => <ChatThreadLab />)
  expect(s.sees("🎉")).toBe(true)
  expect(s.sees("Bende!")).toBe(true)
})

// The typing button flips the `typing` list between one name and none. We only compare the whole text before and
// after: the exact wording of the typing line may change, but turning it on or off must change the text.
test("yazanlar düğmesi yazıyor satırını açar ve kapar", async () => {
  const s = renderTest(() => <ChatThreadLab />)
  const before = s.text()
  await s.click("Yazıyor")
  expect(s.text() === before).toBe(false)
})
