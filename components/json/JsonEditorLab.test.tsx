import { test, expect, renderTest } from "march/testing"
import { JsonEditorLab } from "./JsonEditorLab.tsx"

// JsonEditorLab'in testleri: kaydedince Testler sekmesinde çalışır
test("şema sorunu ilk sorunla ve kendi 'more' metniyle yazılır", () => {
  const s = renderTest(() => <JsonEditorLab />)
  expect(s.sees("/port")).toBe(true)
  expect(s.sees("(+1 sorun daha)")).toBe(true)
  expect(s.find("Kaynak")?.getAttribute("role")).toBe("tab")
})

test("bozuk JSON kendi invalid metnini gösterir", async () => {
  const s = renderTest(() => <JsonEditorLab />)
  await s.type("Sunucu ayarı", '{ "name": ')
  expect(s.sees("Bozuk JSON")).toBe(true)
  expect(s.sees("1 değişiklik")).toBe(true)
})

test("düzeltilince validate çalışır, sonra Sorun yok", async () => {
  const s = renderTest(() => <JsonEditorLab />)
  await s.type("Sunucu ayarı", '{"name":"root","port":8080}')
  expect(s.sees("root adı ayrılmış")).toBe(true)
  await s.type("Sunucu ayarı", '{"name":"api","port":8080}')
  expect(s.sees("Sorun yok")).toBe(true)
})

test("Toparla 4 boşlukla biçimlendirir", async () => {
  const s = renderTest(() => <JsonEditorLab />)
  await s.type("Sunucu ayarı", '{"name":"api","port":8080}')
  await s.click("Toparla")
  expect((s.find("Sunucu ayarı") as HTMLTextAreaElement | null)?.value).toContain('\n    "port": 8080')
})
