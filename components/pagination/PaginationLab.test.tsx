// Tests for PaginationLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PaginationLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) / s.all(selector) find elements by CSS selector (each example of the Lab has its own class),
//   s.find(name) by accessible name (null when missing), and s.click(name) clicks like a user and waits until the view has
//   updated, which is why the tests that click are async and await it.
// - The tests look buttons up by the accessible names the Lab sets through `labels`, so they also prove that a screen
//   reader hears those names. Part class names (.m-page-btn, .m-page-nav, .m-page-gap, .m-page-info, .m-page-status)
//   are listed in the Pagination docs.
// To adapt them: copy one test, change the name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { PaginationLab } from "./PaginationLab.tsx"

// A page button is found by the name that labels.page builds. Clicking it makes it the current page (aria-current), and
// onPage reports it (the Lab prints the last chosen page). `label` names the <nav>.
test("labels.page ile adlanan sayfaya basınca geçerli sayfa olur, onPage çağrılır", async () => {
  const s = renderTest(() => <PaginationLab />)
  await s.click("Sayfa 4")
  expect(s.get('.lab-numbers [aria-current="page"]')?.textContent).toBe("4")
  expect(s.find("Son seçilen: 4")).not.toBe(null)
  expect(s.get(".lab-numbers")?.getAttribute("aria-label")).toBe("Sonuç sayfaları")
})

// `prev` / `next` replace the button content and labels.previous / labels.next the accessible names. On page 1 the
// Previous button is disabled. After "next" the current page is 2, and the `gap` text we gave is what marks skipped pages.
test("Önceki / Sonraki: kendi adı ve metni, başta Önceki kapalı", async () => {
  const s = renderTest(() => <PaginationLab />)
  const prev = s.find("Önceki sayfa") as HTMLButtonElement | null
  expect(prev?.textContent).toBe("‹ Geri")
  expect(prev?.disabled).toBe(true)
  await s.click("Sonraki sayfa")
  expect(s.get('.lab-numbers [aria-current="page"]')?.textContent).toBe("2")
  expect(s.get(".lab-numbers .m-page-gap")?.textContent).toBe("·")
})

// controls={false} and gap={false} leave no Previous / Next and no gap mark. `total` + `size` give the page count: 45 rows
// at 10 per page are five pages.
test("controls / gap kapalı; total + size sayfa sayısını verir", () => {
  const s = renderTest(() => <PaginationLab />)
  expect(s.all(".lab-bare .m-page-nav").length).toBe(0)
  expect(s.get(".lab-bare .m-page-gap")).toBe(null)
  expect(s.all(".lab-total .m-page-btn").map((b: Element) => b.textContent)).toEqual(["1", "2", "3", "4", "5"])
})

// The simple variant writes our own range text (info), page text (status) and select name (labels.sizes). Cursor mode
// has no page count: hasPrev is false at the start so "Daha yeni" is disabled, and a click on "Daha eski" calls onNext,
// which moves the Lab's batch number on.
test("yalın görünüm kendi metinlerini yazar; imleç kipi hasNext / onNext ile ilerler", async () => {
  const s = renderTest(() => <PaginationLab />)
  expect(s.get(".lab-simple .m-page-info")?.textContent).toBe("21–40 / 134 satır")
  expect(s.get(".lab-simple .m-page-status")?.textContent).toBe("Sayfa 2 / 7")
  expect(s.get('.lab-simple select')?.getAttribute("aria-label")).toBe("Satır sayısı")
  expect((s.find("Daha yeni") as HTMLButtonElement | null)?.disabled).toBe(true)
  await s.click("Daha eski")
  expect(s.find("Yığın 2")).not.toBe(null)
})
