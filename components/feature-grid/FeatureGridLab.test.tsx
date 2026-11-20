import { test, expect, renderTest } from "march/testing"
import { FeatureGridLab } from "./FeatureGridLab.tsx"

// FeatureGridLab'in testleri: kaydedince Testler sekmesinde çalışır
test("altı özellik, her biri bir h3; bağlantılı olan bir a", () => {
  const s = renderTest(() => <FeatureGridLab />)
  expect(s.all(".lab-fg h3").length).toBe(6)
  expect(s.get('.lab-fg a[href="#bilet"]')?.textContent).toBe("Bilet sat")
})

test("kartlar görünümünde medya yok; bento'da boyutlar ve medya gelir", async () => {
  const s = renderTest(() => <FeatureGridLab />)
  expect(s.get(".m-fg-media")).toBe(null)
  await s.click("bento")
  expect(s.get(".m-fg-bento")).not.toBe(null)
  expect(s.get(".m-fg-span-big")?.textContent).toContain("1.200+")
  expect(s.get(".m-fg-span-wide")?.textContent).toContain("Bilet sat")
})

test("imleç ışığı anahtarla kapanır", async () => {
  const s = renderTest(() => <FeatureGridLab />)
  expect(s.get(".lab-fg")?.classList.contains("is-spotlight")).toBe(true)
  await s.click("İmleç ışığı")
  expect(s.get(".lab-fg")?.classList.contains("is-spotlight")).toBe(false)
})

test("liste görünümünde kart yok, satırlar var", async () => {
  const s = renderTest(() => <FeatureGridLab />)
  await s.click("list")
  expect(s.get(".lab-fg")?.classList.contains("m-fg-v-list")).toBe(true)
  expect(s.get(".lab-fg .m-card")).toBe(null)
})
