import { test, expect, renderTest } from "march/testing"
import { PanelHeaderLab } from "./PanelHeaderLab.tsx"

// PanelHeaderLab'in testleri: kaydedince Testler sekmesinde çalışır
test("titleAs ve titleId başlık öğesini belirler", () => {
  const s = renderTest(() => <PanelHeaderLab />)
  const t = s.get("#lab-title")
  expect(t?.tagName).toBe("H2")
  expect(t?.textContent).toBe("Ayarlar")
})

test("kapat düğmesi closeLabel adıyla onClose'u çağırır", async () => {
  const s = renderTest(() => <PanelHeaderLab />)
  await s.click("Paneli kapat")
  await s.click("Küçült")
  expect(s.get(".lab-closed")?.textContent).toBe("2 kez kapatıldı")
})

test("as=footer bir footer çizer", () => {
  const s = renderTest(() => <PanelHeaderLab />)
  expect(s.get(".lab-foot")?.tagName).toBe("FOOTER")
})

test("partClass parçalara kendi sınıfını ekler", () => {
  const s = renderTest(() => <PanelHeaderLab />)
  expect(s.get(".lab-own .lab-own-title")?.textContent).toBe("Kendi kapat ikonum")
  expect(s.get(".lab-own .lab-own-titles")).not.toBe(null)
})
