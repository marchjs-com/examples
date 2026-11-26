// Tests for PeriodNavLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PeriodNavLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(name) looks up an element by its accessible name (null when missing), s.get(selector) uses a CSS selector,
//   s.sees(text) says whether text is visible, and s.click(name) clicks like a user and waits until the view has updated,
//   which is why the tests that click are async and await it.
// - The tests look buttons up by the accessible names the Lab sets through `labels`, so they also prove that a screen
//   reader hears those names. They check roles, classes and disabled states rather than internal state.
// To adapt them: copy one test, change the name or the expected value.
import { test, expect, renderTest } from "march/testing"
import { PeriodNavLab } from "./PeriodNavLab.tsx"

// The arrows call onPrev / onNext and the today button calls onToday: the Lab prints the week offset in a title, so the
// test follows it from 0 to +2 and back to 0. labels.group becomes the accessible name of a group.
test("Oklar onPrev / onNext'i, bugün düğmesi onToday'i çağırır; labels adları verir", async () => {
  const s = renderTest(() => <PeriodNavLab />)
  await s.click("Sonraki hafta")
  await s.click("Sonraki hafta")
  expect(s.sees("hafta +2")).toBe(true)
  await s.click("Bu hafta")
  expect(s.sees("hafta +0")).toBe(true)
  expect(s.find("Hafta seçici")?.getAttribute("role")).toBe("group")
})

// `title` is a function, so it is live: the month name changes after a click. partClass puts our classes on the previous
// arrow and the today button.
test("title okların arasında ve canlı; partClass ve class parçalarda", async () => {
  const s = renderTest(() => <PeriodNavLab />)
  const title = s.get(".lab-month .lab-title")
  const before = title?.textContent
  await s.click("Sonraki ay")
  expect(title?.textContent).not.toBe(before)
  expect(s.find("Önceki ay")?.classList.contains("lab-prev")).toBe(true)
  expect(s.find("● Şimdi")?.closest("button")?.classList.contains("lab-today")).toBe(true)
})

// prevDisabled turns the back arrow off on the first page and nextDisabled turns the forward arrow off on the last; with
// today={false} the group has only the two arrow buttons (no today button).
test("prevDisabled / nextDisabled uçlarda okları kapatır; today={false} düğmeyi kaldırır", async () => {
  const s = renderTest(() => <PeriodNavLab />)
  expect(s.find("Geri sayfa")?.hasAttribute("disabled")).toBe(true)
  await s.click("İleri sayfa")
  await s.click("İleri sayfa")
  expect(s.sees("Sayfa 3 / 3")).toBe(true)
  expect(s.find("İleri sayfa")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Sayfa seçici")?.querySelectorAll("button").length).toBe(2)
})

// arrows={false} removes both arrows; the group then holds only the today button.
test("arrows={false} okları kaldırır, bugün düğmesi kalır", () => {
  const s = renderTest(() => <PeriodNavLab />)
  expect(s.find("Oksuz dönem")?.querySelectorAll("button").length).toBe(1)
  expect(s.find("Sıfırla")).not.toBe(null)
})
