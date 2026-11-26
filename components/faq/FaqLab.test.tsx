// Tests for FaqLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <FaqLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements; s.sees(text) says whether the page shows a text; s.find(text) returns the
//   element that shows it; s.click(target) clicks like a user (a visible text, a toggle's label or an element) and
//   waits for the view to update, so tests that click are async.
// - s.type(label, text) types into a field found by its label; s.wait(fn) waits until fn() is truthy (the search
//   narrows the list a moment after typing).
// - The tests check what a user or a screen reader can see (headings, links, classes, visible text), not internal
//   state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { FaqLab } from "./FaqLab.tsx"

// Five questions become five Accordion items. The split layout puts the heading (here a function title that counts the
// items) and the contact button in a column of their own, next to the questions.
test("beş soru; iki sütunda başlık ve iletişim satırı", () => {
  const s = renderTest(() => <FaqLab />)
  expect(s.all(".lab-faq .m-acc-item").length).toBe(5)
  expect(s.get(".lab-faq")?.classList.contains("m-faq-split")).toBe(true)
  expect(s.sees("Sık sorulanlar (5)")).toBe(true)
  expect(s.find("Bize yaz")).not.toBe(null)
})

// Typing in the search box narrows the list (a fuzzy search over the question, the answer and `keywords`) and the
// count line uses our own `labels.count` text. A query that matches nothing shows our `labels.empty` text.
test("arama listeyi daraltır ve sayıyı kendi metniyle yazar", async () => {
  const s = renderTest(() => <FaqLab />)
  await s.type("Soru ara", "iptal")
  await s.wait(() => s.sees("5 sorudan"))
  expect(s.all(".lab-faq .m-acc-item").length).toBeGreaterThan(0)
  expect(s.get(".lab-faq .m-acc-item")?.textContent).toContain("İptal olursa ne olur?")
  await s.type("Soru ara", "zzzqqq")
  await s.wait(() => s.sees("Hiçbir soru tutmadı."))
})

// The `contact` node is ordinary content: its button changes the `lead` line, which is a function, so it updates on its own.
test("iletişim düğmesi açıklamayı günceller", async () => {
  const s = renderTest(() => <FaqLab />)
  await s.click("Bize yaz")
  expect(s.sees("1 kişi bize yazdı")).toBe(true)
})

// The Lab's switches change the props: layout "center" drops the split class and the heading column, and with search off the
// search box is not rendered at all.
test("ortada düzende başlık sütunu, arama kapanınca kutu gider", async () => {
  const s = renderTest(() => <FaqLab />)
  await s.click("ortada")
  await s.click("Arama")
  expect(s.get(".lab-faq")?.classList.contains("m-faq-split")).toBe(false)
  expect(s.get(".lab-faq .m-faq-search")).toBe(null)
})
