import { test, expect, renderTest } from "march/testing"
import { NotForYouLab } from "./NotForYouLab.tsx"

// NotForYouLab'in testleri: kaydedince Testler sekmesinde çalışır
test("iki başlık ve kendi sonuç metni", () => {
  const s = renderTest(() => <NotForYouLab />)
  const titles = s.all(".lab-nfy .m-nfy-title").map((e: Element) => e.textContent)
  expect(titles).toEqual(["Kulübe göre değilsin, eğer…", "Kulüp seni bekliyor, eğer…"])
  expect(s.get(".m-nfy-verdict")?.textContent).toBe("0 / 3 çizildi")
})

test("bir satıra basınca üstü çizilir, onCheck sırayı yazar", async () => {
  const s = renderTest(() => <NotForYouLab />)
  await s.click("Yalnız çalışmak istiyorsun")
  const boxes = s.all('.lab-nfy [role="checkbox"]')
  expect(boxes[1]!.getAttribute("aria-checked")).toBe("true")
  expect(s.get(".lab-marked")?.textContent).toBe("Çizilenler: 1")
  expect(s.text()).toContain("Değilmişsin")
})

test("hepsi çizilince hoş geldin", async () => {
  const s = renderTest(() => <NotForYouLab />)
  for (const t of ["Gece yarısı kod yazmayı sevmiyorsun", "Yalnız çalışmak istiyorsun", "Hazır cevap arıyorsun"]) await s.click(t)
  expect(s.get(".m-nfy-verdict")?.textContent).toBe("Hoş geldin, kulüp senin!")
})

test("liste görünümü ve kart etiketi", async () => {
  const s = renderTest(() => <NotForYouLab />)
  expect(s.all(".m-nfy-me-label").length).toBe(3)
  expect(s.get(".m-nfy-me-label")?.textContent).toBe("Bu benim")
  await s.click("liste")
  expect(s.get(".lab-nfy")?.classList.contains("m-nfy-v-list")).toBe(true)
})
