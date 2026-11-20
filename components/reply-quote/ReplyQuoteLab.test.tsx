import { test, expect, renderTest } from "march/testing"
import { ReplyQuoteLab } from "./ReplyQuoteLab.tsx"

// ReplyQuoteLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ad ve metin çizilir", () => {
  const s = renderTest(() => <ReplyQuoteLab />)
  expect(s.get(".lab-q")?.textContent).toContain("Elif")
  expect(s.get(".lab-q")?.textContent).toContain("Uzun bir mesaj metni")
})

test("kapat düğmesi closeLabel adıyla onClose'u çağırır", async () => {
  const s = renderTest(() => <ReplyQuoteLab />)
  await s.click("Kaldır")
  expect(s.get(".lab-log")?.textContent).toBe("vazgeçildi")
})
