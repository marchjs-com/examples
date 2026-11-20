import { test, expect, renderTest } from "march/testing"
import { DialogLab } from "./DialogLab.tsx"

// DialogLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Aç pencereyi başlığıyla gösterir", async () => {
  const s = renderTest(() => <DialogLab startOpen={false} />)
  await s.click("Aç")
  await s.flush(2)
  expect(s.sees("Ayarlar")).toBe(true)
})

test("kendi kapat düğmesi closeLabel adıyla onClose'u çağırır", async () => {
  const s = renderTest(() => <DialogLab startOpen={false} />)
  await s.click("Aç")
  await s.flush(2)
  await s.click("Geri dön")
  expect(s.get(".lab-closed")?.textContent).toBe("1 kez kapandı")
})

test("footer düğmesi de kapatır", async () => {
  const s = renderTest(() => <DialogLab startOpen={false} />)
  await s.click("Aç")
  await s.flush(2)
  await s.click("Kaydet")
  expect(s.get(".lab-closed")?.textContent).toBe("1 kez kapandı")
})

test("başlıksız kipsiz pencere label adını alır, aria-modal yok", async () => {
  const s = renderTest(() => <DialogLab startOpen={false} />)
  await s.click("Not")
  await s.flush(2)
  const d = document.querySelector("[aria-label='Hızlı not']")
  expect(d).not.toBe(null)
  expect(d?.getAttribute("aria-modal")).toBe(null)
  await s.click("Not")
  await s.flush(2)
})
