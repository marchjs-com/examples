// Tests for ToastLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ToastLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click("Bilgi") finds the button with that text and clicks it like a user, then waits until the view has updated
//   (that is why each test is async and awaits the click). s.get(selector) returns the first match.
// - The tests read the visible result (the count text, the text inside the host) rather than internal state, so they
//   keep passing when the component's internals change. Toasts live in one shared list, so every test starts by pressing
//   "Hepsini temizle" to begin from an empty stack.
// To adapt them: copy one test, change the button text or the expected value.
import { test, expect, renderTest } from "march/testing"
import { ToastLab } from "./ToastLab.tsx"

// toast() adds one notification per call and toast.clear() removes them all; the Lab prints toast.list().length in
// the element with class lab-count.
test("toast() bir bildirim ekler, clear() hepsini kaldırır", async () => {
  const s = renderTest(() => <ToastLab />)
  await s.click("Hepsini temizle")
  await s.click("Bilgi")
  await s.click("Başarı")
  expect(s.get(".lab-count")?.textContent).toBe("2 bildirim")
  await s.click("Hepsini temizle")
  expect(s.get(".lab-count")?.textContent).toBe("0 bildirim")
})

// The ToastHost (class lab-host) draws the stack: after pressing the warning button its text contains the toast's message.
test("ToastHost bildirimi metniyle çizer", async () => {
  const s = renderTest(() => <ToastLab />)
  await s.click("Hepsini temizle")
  await s.click("Uyarı")
  expect(s.get(".lab-host")?.textContent).toContain("Dikkat")
})
