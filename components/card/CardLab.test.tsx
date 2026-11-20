import { test, expect, renderTest } from "march/testing"
import { CardLab } from "./CardLab.tsx"

// CardLab'in testleri: kaydedince Testler sekmesinde çalışır
test("as kök etiketini, class ve id kartı belirler", () => {
  const s = renderTest(() => <CardLab />)
  const card = s.get(".lab-card")!
  expect(card.tagName).toBe("ARTICLE")
  expect(card.id).toBe("lab-card")
  expect(card.querySelector(".m-card-title")!.textContent).toBe("Başlık")
})

test("eylemdeki Sil düğmesi alt bilgiyi günceller", async () => {
  const s = renderTest(() => <CardLab />)
  await s.click("Sil")
  expect(s.get(".lab-card footer")!.textContent).toBe("Silme sayısı: 1")
})

test("plain anahtarla açılır, flush sınıfı yazılır", async () => {
  const s = renderTest(() => <CardLab />)
  expect(s.get(".lab-card")!.classList.contains("m-card-plain")).toBe(false)
  await s.click("Çerçevesiz")
  expect(s.get(".lab-card")!.classList.contains("m-card-plain")).toBe(true)
  expect(s.find("Liste kartı")!.classList.contains("m-card-flush")).toBe(true)
})
