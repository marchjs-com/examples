// Tests for CardLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CardLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns one element, s.find(text) finds an element by its visible text or accessible name, and
//   s.click(text) clicks like a user and waits until the view has updated (so the tests that click are async).
// - The tests check what a user or a screen reader can observe (the root's tag and id, visible text, state classes)
//   rather than internal state. Part classes (.m-card-title, .m-card-plain, .m-card-flush) are in the Card docs.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { CardLab } from "./CardLab.tsx"

// `as` chooses the root element, `class` and `id` land on it, and `title` is drawn in the title part.
test("as kök etiketini, class ve id kartı belirler", () => {
  const s = renderTest(() => <CardLab />)
  const card = s.get(".lab-card")!
  expect(card.tagName).toBe("ARTICLE")
  expect(card.id).toBe("lab-card")
  expect(card.querySelector(".m-card-title")!.textContent).toBe("Başlık")
})

// A Button passed in `actions` is a normal, live button: pressing Sil raises a counter that the footer shows.
test("eylemdeki Sil düğmesi alt bilgiyi günceller", async () => {
  const s = renderTest(() => <CardLab />)
  await s.click("Sil")
  expect(s.get(".lab-card footer")!.textContent).toBe("Silme sayısı: 1")
})

// `plain` given as a function is live: the toggle switches the frame off and the card gets the plain class. `flush`
// (the second card, found by its aria-label) adds its own class and removes the body padding.
test("plain anahtarla açılır, flush sınıfı yazılır", async () => {
  const s = renderTest(() => <CardLab />)
  expect(s.get(".lab-card")!.classList.contains("m-card-plain")).toBe(false)
  await s.click("Çerçevesiz")
  expect(s.get(".lab-card")!.classList.contains("m-card-plain")).toBe(true)
  expect(s.find("Liste kartı")!.classList.contains("m-card-flush")).toBe(true)
})
