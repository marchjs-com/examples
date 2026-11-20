import { test, expect, renderTest } from "march/testing"
import { StoryViewerLab } from "./StoryViewerLab.tsx"

// StoryViewerLab'in testleri: kaydedince Testler sekmesinde çalışır
test("Baştan aç ilk kişinin ilk hikâyesini gösterir ve görüldü olarak işaretler", async () => {
  const s = renderTest(() => <StoryViewerLab startOpen={false} />)
  await s.click("Baştan aç")
  expect(s.sees("Tepede gün batımı")).toBe(true)
  await s.wait(() => s.sees("görülen: e1"))
  expect(s.sees("görülen: e1")).toBe(true)
})

test("start bir id de olabilir: Can'dan açar", async () => {
  const s = renderTest(() => <StoryViewerLab startOpen={false} />)
  await s.click("Can'dan aç")
  expect(s.sees("Gece turu")).toBe(true)
})

test("kendi metinli kalp onLike'ı çalıştırır", async () => {
  const s = renderTest(() => <StoryViewerLab startOpen={false} />)
  await s.click("Baştan aç")
  await s.click("Hikâyeyi beğen")
  expect(s.sees("beğenildi")).toBe(true)
})

test("kapat düğmesi onClose'u çalıştırır", async () => {
  const s = renderTest(() => <StoryViewerLab startOpen={false} />)
  await s.click("Baştan aç")
  await s.click("Hikâyeyi kapat")
  await s.wait(() => s.sees("kapandı"))
  expect(s.sees("kapandı")).toBe(true)
})
