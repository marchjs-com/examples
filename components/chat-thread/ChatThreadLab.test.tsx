import { test, expect, renderTest } from "march/testing"
import { ChatThreadLab } from "./ChatThreadLab.tsx"

// ChatThreadLab'in testleri: kaydedince Testler sekmesinde çalışır
test("grup sohbetinde gönderenin adı görünür", () => {
  const s = renderTest(() => <ChatThreadLab />)
  expect(s.sees("Ece")).toBe(true)
  expect(s.sees("Akşam yemeği kimde?")).toBe(true)
})

test("gidemeyen mesajın Yeniden dene düğmesi onRetry'ı çalıştırır", async () => {
  const s = renderTest(() => <ChatThreadLab />)
  const retry = s.get(".lab-chat .m-msg-retry")
  expect(retry).toBeTruthy()
  await s.click(retry!)
  expect(s.get(".lab-chat .m-msg-retry")).toBe(null)
  expect(s.sees("yeniden gönderildi")).toBe(true)
})

test("yanıt, tepki ve düzenlendi işaretleri balonlarda görünür", () => {
  const s = renderTest(() => <ChatThreadLab />)
  expect(s.sees("🎉")).toBe(true)
  expect(s.sees("Bende!")).toBe(true)
})

test("yazanlar düğmesi yazıyor satırını açar ve kapar", async () => {
  const s = renderTest(() => <ChatThreadLab />)
  const before = s.text()
  await s.click("Yazıyor")
  expect(s.text() === before).toBe(false)
})
