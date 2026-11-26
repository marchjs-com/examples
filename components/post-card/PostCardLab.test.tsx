// Tests for PostCardLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <PostCardLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all(selector) find elements, s.find(text) finds an element by its text, s.sees(text) says whether the
//   page (portals included) shows that text; s.click(textOrElement) clicks like a user and waits for the view to
//   update,
//   so a test that clicks is async and awaits it. s.flush(n) lets pending updates run for n ticks.
// - The tests check what a user or a screen reader can observe (visible text, aria attributes, classes of the
//   parts) rather than internal state, so they keep passing when the component's internals change.
// - Labels are customised in the Lab (the `labels` prop), so the tests find buttons by those custom texts.
// To adapt them: copy one test, change the selector or the expected value.

import { test, expect, renderTest } from "march/testing"
import { PostCardLab } from "./PostCardLab.tsx"

// Pressing the like button calls onLike: the Lab logs it, the count grows from 41 to 42 and aria-pressed turns true
// (that attribute is how assistive technology learns the state).
test("Beğen'e basınca onLike sayıyı bir artırır ve düğme basılı durur", async () => {
  const s = renderTest(() => <PostCardLab />)
  const like = await s.click("Beğen")
  expect(s.sees("beğenildi")).toBe(true)
  expect(like.getAttribute("aria-pressed")).toBe("true")
  expect(s.sees("42")).toBe(true)
})

// Custom `labels`: the "view all" line and the share button use the functions given in labels (n => text), and
// each press reaches its callback; the share count goes from 2 to 3.
test("kendi metinler: tüm yorumlar satırı ve paylaşım düğmesinin adı", async () => {
  const s = renderTest(() => <PostCardLab />)
  await s.click("8 yorumun hepsi")
  expect(s.sees("yorumlar")).toBe(true)
  await s.click("2 paylaşım")
  expect(s.sees("paylaşıldı")).toBe(true)
  expect(s.find("3 paylaşım")).not.toBe(null)
})

// Giving onAuthor turns the author name into a button; pressing it passes the post to the callback.
test("yazara basınca onAuthor çalışır", async () => {
  const s = renderTest(() => <PostCardLab />)
  await s.click("Fotoğraf Atölyesi")
  expect(s.sees("yazar: Fotoğraf Atölyesi")).toBe(true)
})

// The second card is built with avatar={false}, viewAll={false} and so on: it still shows its text, there are two
// cards on the page and the second has no avatar element at all.
test("ikinci kartta avatar, zaman ve tüm yorumlar satırı yok", () => {
  const s = renderTest(() => <PostCardLab />)
  expect(s.sees("Ayın kitabı oylamada.")).toBe(true)
  expect(s.all(".m-post").length).toBe(2)
  expect(s.all(".m-post")[1]?.querySelector(".m-avatar")).toBe(null)
})
