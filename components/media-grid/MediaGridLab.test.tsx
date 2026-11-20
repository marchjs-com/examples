import { test, expect, renderTest } from "march/testing"
import { MediaGridLab } from "./MediaGridLab.tsx"

// MediaGridLab'in testleri: kaydedince Testler sekmesinde çalışır
test("ızgara adını label'dan alır, fazlası kendi metniyle", () => {
  const s = renderTest(() => <MediaGridLab />)
  expect(s.get(".lab-grid")?.getAttribute("aria-label")).toBe("Gezi")
  expect(s.get(".lab-grid")?.textContent).toContain("daha")
})

test("tileLabel kutuların adını verir, basınca onOpen", async () => {
  const s = renderTest(() => <MediaGridLab />)
  await s.click("Fotoğraf 1 / 5")
  await s.flush(3)
  expect(s.get(".lab-log")?.textContent).toContain("0")
})
