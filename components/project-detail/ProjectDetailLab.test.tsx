import { test, expect, renderTest } from "march/testing"
import { ProjectDetailLab } from "./ProjectDetailLab.tsx"

// ProjectDetailLab'in testleri: kaydedince Testler sekmesinde çalışır
test("başlık h1, kapağın paylaşılan adı ve kendi metinler", () => {
  const s = renderTest(() => <ProjectDetailLab />)
  expect(s.get(".lab-detail h1")?.textContent).toContain("Atlas Banka")
  expect(s.get(".m-pd-cover")?.getAttribute("data-m-shared")).toBe("lab-0")
  expect(s.find("Müşteri")).not.toBe(null)
  expect(s.get('[aria-label="Hizmetler"]')).not.toBe(null)
  expect(s.find("2. görseli büyüt")).not.toBe(null)
})

test("geri düğmesi onBack'i çağırır", async () => {
  const s = renderTest(() => <ProjectDetailLab />)
  await s.click("Listeye dön")
  expect(s.find("Geri basıldı: 1")).not.toBe(null)
})

test("sonraki proje kartı bir sonrakini açar", async () => {
  const s = renderTest(() => <ProjectDetailLab />)
  expect(s.get(".m-pd-next")?.textContent).toContain("Sıradaki iş")
  await s.click(s.get(".m-pd-next")!)
  expect(s.get(".lab-detail h1")?.textContent).toContain("Kite uygulaması")
})

test("künye kapanınca rol satırı gider", async () => {
  const s = renderTest(() => <ProjectDetailLab />)
  expect(s.find("Rol")).not.toBe(null)
  await s.click("Künye")
  expect(s.find("Rol")).toBe(null)
})
