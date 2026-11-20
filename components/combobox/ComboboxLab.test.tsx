import { test, expect, renderTest } from "march/testing"
import { ComboboxLab } from "./ComboboxLab.tsx"

// ComboboxLab'in testleri: kaydedince Testler sekmesinde çalışır
test("yazınca liste süzülür, seçilen satır değer olur ve onSelect çağrılır", async () => {
  const s = renderTest(() => <ComboboxLab />)
  const input = await s.type("İlçe", "beş") as HTMLInputElement
  expect(input.getAttribute("aria-expanded")).toBe("true")
  await s.click("Beşiktaş")
  expect(s.text().includes("İlçe: Beşiktaş · seçilen: Beşiktaş")).toBe(true)
  expect(input.value).toBe("Beşiktaş")
})

test("labelOf listede olmayan değeri adlandırır; minChars'tan kısa yazı labels.typeToSearch'ü gösterir", async () => {
  const s = renderTest(() => <ComboboxLab />)
  const member = s.get("#member") as HTMLInputElement
  expect(member.value).toBe("Üye #104")
  await s.type(member, "a")
  expect(s.text().includes("En az iki harf yaz")).toBe(true)
  await s.type(member, "ayş")
  await s.wait(() => s.text().includes("Ayşe Yılmaz"))
  await s.click("Ayşe Yılmaz")
  expect(s.text().includes("Üye: 101")).toBe(true)
})

test("çoklu seçimde chip'in kaldır düğmesi değeri diziden çıkarır ve onChange çağrılır", async () => {
  const s = renderTest(() => <ComboboxLab />)
  expect(s.text().includes("Beceriler: TypeScript, CSS · değişiklik: 0")).toBe(true)
  await s.click("CSS kaldır")
  expect(s.text().includes("Beceriler: TypeScript · değişiklik: 1")).toBe(true)
  expect(s.find("CSS kaldır")).toBe(null)
})

test("devre dışı, salt okunur ve geçersiz alanlar aria ve özniteliklerle söylenir", () => {
  const s = renderTest(() => <ComboboxLab />)
  expect((s.find("Kapalı alan") as HTMLInputElement).disabled).toBe(true)
  const locked = s.find("Kilitli alan") as HTMLInputElement
  expect(locked.readOnly).toBe(true)
  expect(locked.value).toBe("Sarıyer")
  const bad = s.find("Hatalı alan") as HTMLInputElement
  expect(bad.getAttribute("aria-invalid")).toBe("true")
  expect(bad.getAttribute("aria-describedby")).toBe("town-error")
  expect(bad.name).toBe("town")
  expect(bad.closest(".lab-combo") !== null).toBe(true)
})
