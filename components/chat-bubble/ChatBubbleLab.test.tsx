import { test, expect, renderTest } from "march/testing"
import { ChatBubbleLab } from "./ChatBubbleLab.tsx"

// ChatBubbleLab'in testleri: kaydedince Testler sekmesinde çalışır
test("metin, gönderen ve kendi içerik çizilir", () => {
  const s = renderTest(() => <ChatBubbleLab />)
  expect(s.sees("Merhaba!")).toBe(true)
  expect(s.get(".lab-other")?.textContent).toContain("Elif")
  expect(s.get(".lab-kids")?.textContent).toContain("Kendi içeriğim")
})

test("formatTime saati kendi biçiminde yazar", () => {
  const s = renderTest(() => <ChatBubbleLab />)
  expect(s.get(".lab-mine")?.textContent).toContain("9.41")
})

test("tepki çipine basınca onReact çağrılır", async () => {
  const s = renderTest(() => <ChatBubbleLab />)
  await s.click(s.get(".lab-other button")!)
  expect(s.get(".lab-log")?.textContent).toContain("tepki")
})

test("alıntı çizilir, onRetry yeniden dener", async () => {
  const s = renderTest(() => <ChatBubbleLab />)
  expect(s.get(".lab-fail")?.textContent).toContain("Elif")
  await s.click("Gitmedi · Yeniden dene")
  expect(s.get(".lab-log")?.textContent).toBe("yeniden")
})
