import { test, expect, renderTest } from "march/testing"
import { CopyButtonLab } from "./CopyButtonLab.tsx"

// CopyButtonLab'in testleri: kaydedince Testler sekmesinde çalışır
// gerçek pano izin ister: testte yerine sahte bir pano konur, test bitince eskisi döner
const fakeClipboard = (fail = false) => {
  const box = { text: "", restore: () => { delete (navigator as { clipboard?: unknown }).clipboard } }
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (t: string) => { if (fail) throw new Error("izin yok"); box.text = t } } })
  return box
}

test("metinli düğme yazar, kendi Kopyalandı metnini gösterir ve onCopy sayar", async () => {
  const pano = fakeClipboard()
  try {
    const s = renderTest(() => <CopyButtonLab />)
    const btn = await s.click("Komutu kopyala")
    expect(pano.text).toBe("npm i github:marchjs-com/march")
    expect(btn.textContent).toBe("Kopyalandı!")
    expect(btn.className.includes("is-copied")).toBe(true)
    expect(s.sees("1 kez kopyalandı")).toBe(true)
  } finally { pano.restore() }
})

test("canlı değer tıklama anındaki değeri kopyalar", async () => {
  const pano = fakeClipboard()
  try {
    const s = renderTest(() => <CopyButtonLab />)
    await s.click("Sayı: 7")
    await s.click("Sayıyı kopyala")
    expect(pano.text).toBe("8")
  } finally { pano.restore() }
})

test("yalnız ikon: ad copiedLabel'a döner, copiedColor rengi verir", async () => {
  const pano = fakeClipboard()
  try {
    const s = renderTest(() => <CopyButtonLab />)
    const n = await s.click("Kırk ikiyi kopyala")
    expect(pano.text).toBe("42")
    expect(n.getAttribute("aria-label")).toBe("42 panoda")
    const l = await s.click("Bağlantıyı kopyala")
    expect(l.getAttribute("data-m-color")).toBe("brand-purple")
  } finally { pano.restore() }
})

test("pano reddederse errorText={false} bildirim açmaz, onError çalışır", async () => {
  const pano = fakeClipboard(true)
  try {
    const s = renderTest(() => <CopyButtonLab />)
    await s.click("Sessizce dene")
    expect(s.sees("Pano reddetti")).toBe(true)
    expect(s.get(".m-toast")).toBe(null)
  } finally { pano.restore() }
})
