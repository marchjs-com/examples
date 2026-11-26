// Tests for NotForYouLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <NotForYouLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) finds one element by CSS selector, s.all(selector) all of them, s.text() is all visible text, and
//   s.click(textOrElement) clicks like a user and waits until the view has updated, which is why the tests that click
//   are async and await it.
// - The tests check what a user or a screen reader can observe (headings, aria-checked, the verdict text) rather than
//   internal state, so they keep passing when the component's internals change. The part class names (.m-nfy-title,
//   .m-nfy-verdict...) are listed in the NotForYou docs.
// To adapt them: copy one test, change the selector or the expected text.
import { test, expect, renderTest } from "march/testing"
import { NotForYouLab } from "./NotForYouLab.tsx"

// title and forYouTitle give the two column headings, and the custom `verdict` function writes the text under the list:
// nothing is struck out at the start, so it reads "0 of 3".
test("iki başlık ve kendi sonuç metni", () => {
  const s = renderTest(() => <NotForYouLab />)
  const titles = s.all(".lab-nfy .m-nfy-title").map((e: Element) => e.textContent)
  expect(titles).toEqual(["Kulübe göre değilsin, eğer…", "Kulüp seni bekliyor, eğer…"])
  expect(s.get(".m-nfy-verdict")?.textContent).toBe("0 / 3 çizildi")
})

// Clicking a line strikes it out: its checkbox gets aria-checked="true" (the accessible state), onCheck reports the
// struck-out indexes (the Lab prints how many), and the markedHint text appears.
test("bir satıra basınca üstü çizilir, onCheck sırayı yazar", async () => {
  const s = renderTest(() => <NotForYouLab />)
  await s.click("Yalnız çalışmak istiyorsun")
  const boxes = s.all('.lab-nfy [role="checkbox"]')
  expect(boxes[1]!.getAttribute("aria-checked")).toBe("true")
  expect(s.get(".lab-marked")?.textContent).toBe("Çizilenler: 1")
  expect(s.text()).toContain("Değilmişsin")
})

// When every line is struck out (n equals the total), the custom verdict switches to its welcome sentence.
test("hepsi çizilince hoş geldin", async () => {
  const s = renderTest(() => <NotForYouLab />)
  for (const t of ["Gece yarısı kod yazmayı sevmiyorsun", "Yalnız çalışmak istiyorsun", "Hazır cevap arıyorsun"]) await s.click(t)
  expect(s.get(".m-nfy-verdict")?.textContent).toBe("Hoş geldin, kulüp senin!")
})

// meLabel shows on each of the three cards. Choosing the "list" option of the Segmented control re-draws the block with
// variant="list", which adds the list modifier class to the root.
test("liste görünümü ve kart etiketi", async () => {
  const s = renderTest(() => <NotForYouLab />)
  expect(s.all(".m-nfy-me-label").length).toBe(3)
  expect(s.get(".m-nfy-me-label")?.textContent).toBe("Bu benim")
  await s.click("liste")
  expect(s.get(".lab-nfy")?.classList.contains("m-nfy-v-list")).toBe(true)
})
