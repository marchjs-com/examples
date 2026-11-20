import { test, expect, renderTest } from "march/testing"
import { FeedLab } from "./FeedLab.tsx"

// FeedLab'in testleri: kaydedince Testler sekmesinde çalışır. Akış sanal bir liste: yalnız ekrana yakın gönderileri
// çizer; gönderi arayan testler görünmez ama ekranda duran bir kutuda çizilir
const onScreen = () => {
  const box = document.body.appendChild(document.createElement("div"))
  box.style.cssText = "position:fixed;inset:0 auto auto 0;inline-size:600px;opacity:0;pointer-events:none"
  return { container: box, root: box }
}
test("bekleyen gönderi hapı kendi içeriğiyle görünür; basınca gönderiler akışa katılır", async () => {
  const s = renderTest(() => <FeedLab />)
  await s.click("Yeni gelsin")
  expect(s.sees("⬆ 1 taze gönderi")).toBe(true)
  await s.click("⬆ 1 taze gönderi")
  await s.wait(() => s.sees("yeniler eklendi"))
  expect(s.sees("yeniler eklendi")).toBe(true)
})

test("akış boşalınca empty içeriği görünür", async () => {
  const s = renderTest(() => <FeedLab />)
  await s.click("Boşalt")
  expect(s.sees("Burada henüz kimse yazmadı")).toBe(true)
})

test("postProps her gönderiye gider: Beğen düğmesi onLike'ı çalıştırır", async () => {
  const s = renderTest(() => <FeedLab />, onScreen())
  await s.wait(() => s.find("Beğen"), { timeout: 5000 })   // gönderiler kare kare çizilir
  await s.click("Beğen")
  await s.wait(() => s.sees("beğeni: Üye"))
  expect(s.sees("beğeni: Üye")).toBe(true)
})

test("renderPost ile çizilen gönderi PostCard değil, kendi içeriği", async () => {
  const s = renderTest(() => <FeedLab />, onScreen())
  await s.wait(() => s.sees("Kendi çizimin"), { timeout: 5000 })
  expect(s.sees("Kendi çizimin: renderPost")).toBe(true)
})
