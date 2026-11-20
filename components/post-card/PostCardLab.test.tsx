import { test, expect, renderTest } from "march/testing"
import { PostCardLab } from "./PostCardLab.tsx"

// PostCardLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Beğen'e basınca onLike sayıyı bir artırır ve düğme basılı durur", async () => {
  const s = renderTest(() => <PostCardLab />)
  const like = await s.click("Beğen")
  expect(s.sees("beğenildi")).toBe(true)
  expect(like.getAttribute("aria-pressed")).toBe("true")
  expect(s.sees("42")).toBe(true)
})

test("kendi metinler: tüm yorumlar satırı ve paylaşım düğmesinin adı", async () => {
  const s = renderTest(() => <PostCardLab />)
  await s.click("8 yorumun hepsi")
  expect(s.sees("yorumlar")).toBe(true)
  await s.click("2 paylaşım")
  expect(s.sees("paylaşıldı")).toBe(true)
  expect(s.find("3 paylaşım")).not.toBe(null)
})

test("yazara basınca onAuthor çalışır", async () => {
  const s = renderTest(() => <PostCardLab />)
  await s.click("Fotoğraf Atölyesi")
  expect(s.sees("yazar: Fotoğraf Atölyesi")).toBe(true)
})

test("ikinci kartta avatar, zaman ve tüm yorumlar satırı yok", () => {
  const s = renderTest(() => <PostCardLab />)
  expect(s.sees("Ayın kitabı oylamada.")).toBe(true)
  expect(s.all(".m-post").length).toBe(2)
  expect(s.all(".m-post")[1]?.querySelector(".m-avatar")).toBe(null)
})
