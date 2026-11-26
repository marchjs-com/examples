// Tests for ChatComposerLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ChatComposerLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(name, text) finds a field by its accessible name, types into it and returns it; s.press(key, element) sends
//   a key press; s.click(text) clicks like a user; s.find(text) finds an element by its name; s.sees(text) says
//   whether text is on screen; s.wait(condition) polls until a condition is true (used where an effect is not
//   instant). They wait until the view has updated, so the tests that use them are async and await them.
// - The tests find parts by the accessible names set through `labels`, which also checks those names. They look at
//   what a user can observe (the log line, the reply row, the placeholder, the disabled state) rather than internals.
// To adapt them: copy one test, change the name you type into or the expected text.
import { test, expect, renderTest } from "march/testing"
import { ChatComposerLab } from "./ChatComposerLab.tsx"

// Typing and pressing Enter sends: onSend receives the text (the Lab writes it to its log), and the reply row closes
// because the Lab clears its reply after a send.
test("yazıp Enter'a basınca onSend metni alır, yanıt satırı kapanır", async () => {
  const s = renderTest(() => <ChatComposerLab />)
  const box = await s.type("Mesaj kutusu", "Saat yedide")
  await s.press("Enter", box)
  await s.wait(() => s.sees("gönderildi: Saat yedide"))
  expect(s.sees("gönderildi: Saat yedide")).toBe(true)
  expect(s.sees("Ece kişisine yanıt")).toBe(false)
})

// Typing calls onTyping (the component limits it to about once a second), so one burst of typing counts once.
test("yazarken onTyping sinyali gider", async () => {
  const s = renderTest(() => <ChatComposerLab />)
  await s.type("Mesaj kutusu", "m")
  expect(s.sees("yazıyor sinyali: 1")).toBe(true)
})

// `replyTo` draws a reply row whose text comes from labels.replyingTo; its close button (named by labels.cancelReply)
// calls onCancelReply, and the row goes away.
test("yanıt satırı kendi metniyle görünür; kapatma düğmesi onCancelReply'ı çalıştırır", async () => {
  const s = renderTest(() => <ChatComposerLab />)
  expect(s.sees("Ece kişisine yanıt")).toBe(true)
  await s.click("Yanıtı kapat")
  expect(s.sees("Ece kişisine yanıt")).toBe(false)
})

// `disabled` (a function here) locks the field, and `placeholder` (also a function) changes with it. The last check
// accepts any of the ways a field can be locked, so the test does not depend on how the component locks it.
test("disabled: kutu yazılamaz olur, yer tutucu değişir", async () => {
  const s = renderTest(() => <ChatComposerLab />)
  await s.click("Kapat")
  const box = s.find("Mesaj kutusu") as HTMLTextAreaElement | null
  expect(box?.getAttribute("placeholder")).toBe("Sohbet kapalı")
  expect(!!box?.disabled || box?.getAttribute("readonly") != null || box?.getAttribute("disabled") != null).toBe(true)
})
