// Tests for CarouselLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CarouselLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get(selector) returns one element, s.find(text) finds an element by its accessible name or text (null when
//   absent), s.click(text) clicks like a user, and s.flush() / s.flush(n) wait for pending updates (the carousel is
//   built in parts, so the tests flush before they look at it). Tests that wait are async and await.
// - The tests check what a user or a screen reader can observe (the carousel role description and name, the buttons'
//   names, state classes such as .m-carousel-4) rather than internal state.
// To adapt them: copy one test, change the selector or the expected value.
import { test, expect, renderTest } from "march/testing"
import { CarouselLab } from "./CarouselLab.tsx"

// The root is announced as a carousel with the name from `label`, and `labels` gives the previous / next buttons
// their own accessible names.
test("carousel kendi adıyla; kendi düğme adları (labels)", async () => {
  const s = renderTest(() => <CarouselLab />)
  await s.flush()
  const main = s.get(".lab-main")
  expect(main?.getAttribute("aria-roledescription")).toBe("carousel")
  expect(main?.getAttribute("aria-label")).toBe("Renkli kartlar")
  expect(s.find("Geri")).not.toBe(null)
  expect(s.find("İleri")).not.toBe(null)
})

// perView starts at 2 (a class says so); the Lab's button sets it to 4 and the class follows.
test("perView düğmeyle değişir", async () => {
  const s = renderTest(() => <CarouselLab />)
  expect(s.get(".lab-main")?.classList.contains("m-carousel-2")).toBe(true)
  await s.click("4 görünen")
  await s.flush()
  expect(s.get(".lab-main")?.classList.contains("m-carousel-4")).toBe(true)
})

// The second carousel turns parts off: arrows={false} draws no buttons, dots={false} no dots, and smooth={false}
// makes scrolling instant (a class). Plain text children each become a slide box.
test("arrows={false} dots={false}: düğme yok; metin slaytları kutu olur; smooth={false} anında", async () => {
  const s = renderTest(() => <CarouselLab />)
  await s.flush()
  const bare = s.get(".lab-bare")
  expect(bare?.querySelectorAll(".m-carousel-btn").length).toBe(0)
  expect(bare?.querySelector(".m-carousel-dots")).toBe(null)
  expect(bare?.querySelectorAll(".m-carousel-text").length).toBe(4)
  expect(bare?.classList.contains("is-instant")).toBe(true)
})

// The `swipe` choice reaches the carousel: true lets the mouse drag too (a class), false turns swiping off.
test("kaydırma seçimi carousel'e geçer", async () => {
  const s = renderTest(() => <CarouselLab />)
  await s.click("Fareyle de")
  await s.flush(2)
  expect(s.get(".lab-main")?.classList.contains("is-swipe")).toBe(true)
  await s.click("Kapalı")
  await s.flush(2)
  expect(s.get(".lab-main")?.classList.contains("is-noswipe")).toBe(true)
})
