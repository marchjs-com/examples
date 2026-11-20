import { test, expect, renderTest } from "march/testing"
import { ProgressRingLab } from "./ProgressRingLab.tsx"

// ProgressRingLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ekran okuyucu adı değeri ve tam puanı söyler; biçim ortada", () => {
  const s = renderTest(() => <ProgressRingLab />)
  const ring = s.get(".lab-score svg")!
  expect(ring.getAttribute("aria-label")).toBe("Puan: 4/10 of 10")
  expect(ring.querySelector(".m-ring-text")!.textContent).toBe("4/10")
})

test("eşikler düzeyi belirler: 40'ta orta, artınca yüksek", async () => {
  const s = renderTest(() => <ProgressRingLab />)
  expect(s.get(".lab-score svg")!.getAttribute("class")).toContain("m-ring-mid")
  await s.click(".lab-up")
  expect(s.get(".lab-score svg")!.getAttribute("class")).toContain("m-ring-high")
})

test("renk tek renge boyar; HADİ renkleri boya katmanı ekler", () => {
  const s = renderTest(() => <ProgressRingLab />)
  expect(s.get(".lab-color svg")!.getAttribute("data-m-color")).toBe("brand-blue")
  expect(s.get(".lab-brand .m-ring-paint")).toBeTruthy()
})
