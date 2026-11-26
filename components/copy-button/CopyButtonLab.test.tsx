// Tests for CopyButtonLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CopyButtonLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.click(text) clicks like a user, waits until the view has updated and returns the clicked element (so the tests
//   are async and await it); s.sees(text) says whether a text is visible; s.get(selector) finds one element.
// - The tests check what a user can observe (the copied text, the button's text and accessible name, the colour
//   token, the counter text) rather than internal state.
// - The real clipboard asks the user for permission, so each test puts a fake one in place and puts the real one back
//   when it is finished (the try / finally below).
import { test, expect, renderTest } from "march/testing"
import { CopyButtonLab } from "./CopyButtonLab.tsx"

// A fake clipboard: writeText stores the text in `box.text` (or throws when `fail` is true, like a refused permission);
// restore() removes the fake so the real clipboard is used again.
const fakeClipboard = (fail = false) => {
  const box = { text: "", restore: () => { delete (navigator as { clipboard?: unknown }).clipboard } }
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (t: string) => { if (fail) throw new Error("izin yok"); box.text = t } } })
  return box
}

// A text button copies its `text`, then shows its own copiedLabel and the is-copied class; onCopy runs (the Lab counts).
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

// `text` as a function is read at click time: after the counter button raised the number to 8, the copy is "8".
test("canlı değer tıklama anındaki değeri kopyalar", async () => {
  const pano = fakeClipboard()
  try {
    const s = renderTest(() => <CopyButtonLab />)
    await s.click("Sayı: 7")
    await s.click("Sayıyı kopyala")
    expect(pano.text).toBe("8")
  } finally { pano.restore() }
})

// An icon-only button is named by its label and, after the copy, by copiedLabel (aria-label changes); copiedColor
// is applied as the colour token of the button.
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

// When the clipboard refuses, errorText={false} switches the failure toast off (no .m-toast on the page) and onError
// receives the error, which the Lab prints.
test("pano reddederse errorText={false} bildirim açmaz, onError çalışır", async () => {
  const pano = fakeClipboard(true)
  try {
    const s = renderTest(() => <CopyButtonLab />)
    await s.click("Sessizce dene")
    expect(s.sees("Pano reddetti")).toBe(true)
    expect(s.get(".m-toast")).toBe(null)
  } finally { pano.restore() }
})
