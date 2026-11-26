// Tests for ReplyQuoteLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ReplyQuoteLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - The quote carries the class set in the Lab (.lab-q), and the Lab writes the last event into .lab-log.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { ReplyQuoteLab } from "./ReplyQuoteLab.tsx"

// The name and the quoted text are drawn as plain text inside the quote.
test("ad ve metin çizilir", () => {
  const s = renderTest(() => <ReplyQuoteLab />)
  expect(s.get(".lab-q")?.textContent).toContain("Elif")
  expect(s.get(".lab-q")?.textContent).toContain("Uzun bir mesaj metni")
})

// The cancel button is found by the accessible name given in `closeLabel`; pressing it calls onClose.
test("kapat düğmesi closeLabel adıyla onClose'u çağırır", async () => {
  const s = renderTest(() => <ReplyQuoteLab />)
  await s.click("Kaldır")
  expect(s.get(".lab-log")?.textContent).toBe("vazgeçildi")
})
