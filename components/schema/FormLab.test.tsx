import { test, expect, renderTest } from "march/testing"
import { FormLab } from "./FormLab.tsx"

// FormLab'in testleri: kaydedince Testler sekmesinde çalışır
test("şemadaki alanlar bölümleriyle çizilir; başlangıç değerleri dolu", () => {
  const s = renderTest(() => <FormLab />)
  expect(s.sees("Kimlik")).toBe(true)
  expect(s.sees("Profilinde gösterilir")).toBe(true)
  expect((s.get(".lab-form [name=name]") as HTMLInputElement).value).toBe("Ece")
  expect(s.sees("hazır: evet")).toBe(true)
})

test("değişmeden kaydedilemez (requireDirty); değişince kaydedilir", async () => {
  const s = renderTest(() => <FormLab />)
  const save = s.find("Kaydet")!.closest("button") as HTMLButtonElement
  expect(save.disabled).toBe(true)
  await s.type(s.get(".lab-form [name=name]")!, "Deniz")
  expect(s.sees("değişiklik: 0")).toBe(false)
  await s.click(save)
  await s.wait(() => s.sees("Kaydedilen: Deniz · İzmir"))
  expect(s.sees("Kaydedilen: Deniz · İzmir")).toBe(true)
})

test("zorunlu alan boşalınca hata gösterir (validateOn change)", async () => {
  const s = renderTest(() => <FormLab />)
  await s.type(s.get(".lab-form [name=name]")!, "")
  expect(s.get(".lab-form [name=name]")!.getAttribute("aria-invalid")).toBe("true")
})

test("actions={false}: düğme yok", () => {
  const s = renderTest(() => <FormLab />)
  expect(s.get(".lab-plain button[type=submit]")).toBe(null)
})
