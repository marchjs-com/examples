// Tests for TestimonialsLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <TestimonialsLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all find elements by CSS selector, s.find(text) by visible text; s.click(text) clicks the Segmented option or
//   toggle with that label like a user and waits until the view has updated (so a test that clicks is async and awaits it).
// - The tests check what a user or a screen reader can observe (the cards, the star rating's accessible name, which parts are
//   drawn, the carousel's name) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the selector or the label. .lab-tm is the class given to Testimonials in the Lab; the
// parts (.m-tm-list, .m-tm-rating ...) are Testimonials' own classes.
import { test, expect, renderTest } from "march/testing"
import { TestimonialsLab } from "./TestimonialsLab.tsx"

// The Lab starts as a grid with two columns and seven items, each a <figure>. The star rating is read through our own
// `labels.rating` text, so a card with 4 stars is named with that Turkish text ("4 out of 5").
test("ızgarada yedi kart, iki sütun; yıldızlar kendi adıyla", () => {
  const s = renderTest(() => <TestimonialsLab />)
  expect(s.all(".lab-tm figure").length).toBe(7)
  expect(s.get(".lab-tm .m-tm-list")?.classList.contains("m-tm-cols-2")).toBe(true)
  expect(s.get('.lab-tm [aria-label="5 üzerinden 4"]')).not.toBe(null)
})

// In the "wall" layout the list starts folded; "show more" (our own text) opens it and the button turns into the "fold" text,
// and the folded state class goes away.
test("duvarda 'Hepsini göster' açar, 'Daralt' kapatır", async () => {
  const s = renderTest(() => <TestimonialsLab />)
  await s.click("wall")
  await s.click("Hepsini göster")
  expect(s.find("Daralt")).not.toBe(null)
  expect(s.get(".lab-tm .m-tm-list")?.classList.contains("is-closed")).toBe(false)
})

// The three toggles switch the stars, the avatars and the quotation marks off: those parts are no longer drawn, and the
// root gets the "plain" class when the quotation marks are off.
test("yıldız, avatar ve tırnaklar anahtarlarla kapanır", async () => {
  const s = renderTest(() => <TestimonialsLab />)
  await s.click("Yıldızlar")
  await s.click("Avatarlar")
  await s.click("Tırnaklar")
  expect(s.get(".lab-tm .m-tm-rating")).toBe(null)
  expect(s.get(".lab-tm .m-avatar")).toBe(null)
  expect(s.get(".lab-tm")?.classList.contains("m-tm-plain")).toBe(true)
})

// The "slider" layout is a carousel, named with our own `labels.slider` text.
test("kaydırmalı düzen kendi adıyla bir carousel", async () => {
  const s = renderTest(() => <TestimonialsLab />)
  await s.click("slider")
  expect(s.get('.lab-tm [aria-label="Yorumlar"]')).not.toBe(null)
})
