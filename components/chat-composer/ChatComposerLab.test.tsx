import { test, expect, renderTest } from "march/testing"
import { ChatComposerLab } from "./ChatComposerLab.tsx"

// ChatComposerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("yazıp Enter'a basınca onSend metni alır, yanıt satırı kapanır", async () => {
  const s = renderTest(() => <ChatComposerLab />)
  const box = await s.type("Mesaj kutusu", "Saat yedide")
  await s.press("Enter", box)
  await s.wait(() => s.sees("gönderildi: Saat yedide"))
  expect(s.sees("gönderildi: Saat yedide")).toBe(true)
  expect(s.sees("Ece kişisine yanıt")).toBe(false)
})

test("yazarken onTyping sinyali gider", async () => {
  const s = renderTest(() => <ChatComposerLab />)
  await s.type("Mesaj kutusu", "m")
  expect(s.sees("yazıyor sinyali: 1")).toBe(true)
})

test("yanıt satırı kendi metniyle görünür; kapatma düğmesi onCancelReply'ı çalıştırır", async () => {
  const s = renderTest(() => <ChatComposerLab />)
  expect(s.sees("Ece kişisine yanıt")).toBe(true)
  await s.click("Yanıtı kapat")
  expect(s.sees("Ece kişisine yanıt")).toBe(false)
})

test("disabled: kutu yazılamaz olur, yer tutucu değişir", async () => {
  const s = renderTest(() => <ChatComposerLab />)
  await s.click("Kapat")
  const box = s.find("Mesaj kutusu") as HTMLTextAreaElement | null
  expect(box?.getAttribute("placeholder")).toBe("Sohbet kapalı")
  expect(!!box?.disabled || box?.getAttribute("readonly") != null || box?.getAttribute("disabled") != null).toBe(true)
})
