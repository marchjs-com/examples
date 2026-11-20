import { test, expect, renderTest } from "march/testing"
import { AlertLab } from "./AlertLab.tsx"

// AlertLab'in testleri: kaydedince Testler sekmesinde çalışır
test("warn ve danger role=alert, diğerleri role=status; role prop'u üstün gelir", () => {
  const s = renderTest(() => <AlertLab />)
  expect(s.find("Ton: danger")?.closest(".m-alert")?.getAttribute("role")).toBe("alert")
  expect(s.find("Ton: info")?.closest(".m-alert")?.getAttribute("role")).toBe("status")
  expect(s.get(".lab-alert")?.getAttribute("role")).toBe("note")
})

test("kapat düğmesi uyarıyı gizler ve onDismiss çağrılır", async () => {
  const s = renderTest(() => <AlertLab />)
  await s.click("Başarı mesajını kapat")
  expect(s.sees("Kapatınca sayaç artar.")).toBe(false)
  expect(s.sees("Kapatılan: 1")).toBe(true)
})

test("action() nesnesi düğme olur ve çalışır", async () => {
  const s = renderTest(() => <AlertLab />)
  await s.click("Kaydet")
  await s.flush()
  expect(s.sees("kaydedilen: 1")).toBe(true)
})

test("partClass parçalara, class köke eklenir; icon={null} ikonu kaldırır", () => {
  const s = renderTest(() => <AlertLab />)
  const lab = s.get(".lab-alert")
  expect(lab?.querySelector(".lab-body")).not.toBe(null)
  expect(lab?.querySelector(".lab-x")).not.toBe(null)
  expect(s.find("İkonsuz")?.closest(".m-alert")?.querySelector(".m-alert-icon")).toBe(null)
})
