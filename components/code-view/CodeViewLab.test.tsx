// Tests for CodeViewLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CodeViewLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.get / s.all find elements by CSS selector; s.find(text) finds the element carrying a text or an accessible
//   name; s.sees(text) says whether a text is visible; s.click(textOrElement) clicks like a user, waits until the
//   view has updated and returns the clicked element (so those tests are async and await it).
// - The tests check observable things: aria-pressed, the state class is-wrapped, the text of the code area, and which
//   parts (tokens, line numbers, language label, buttons) exist.
import { test, expect, renderTest } from "march/testing"
import { CodeViewLab } from "./CodeViewLab.tsx"

// The wrap toggle is a button with aria-pressed; pressing it turns the soft wrap on, which marks the code block with
// is-wrapped. The button text comes from wrapLabel.
test("Satırları kaydır'a basınca kod kayar ve düğme basılı durur", async () => {
  const s = renderTest(() => <CodeViewLab />)
  const wrap = await s.click("Satırları kaydır")
  expect(wrap.getAttribute("aria-pressed")).toBe("true")
  expect(s.get(".lab-main")?.classList.contains("is-wrapped")).toBe(true)
})

// `code` can be a function (an accessor): when the signal it reads changes, the code area updates. The `tools` slot
// holds extra toolbar controls; here its Run button counts clicks.
test("code bir erişimci: başlangıç değişince kod da değişir; tools içindeki Çalıştır sayar", async () => {
  const s = renderTest(() => <CodeViewLab />)
  expect(s.find("Sayaç kodu")?.textContent).toContain("let $n = 0")
  await s.click("Başlangıcı artır")
  expect(s.find("Sayaç kodu")?.textContent).toContain("let $n = 1")
  await s.click("Çalıştır")
  await s.click("Çalıştır")
  expect(s.sees("2 kez çalıştı")).toBe(true)
})

// buttons="icon" draws icon buttons whose text is the tooltip and the accessible name; wrap starts the block wrapped,
// so the wrap button starts pressed.
test("simge düğmeler: wrap ile kayık başlar, adları ipucu olur", () => {
  const s = renderTest(() => <CodeViewLab />)
  expect(s.find("Kaydır")?.getAttribute("aria-pressed")).toBe("true")
  expect(s.get(".lab-icons")?.classList.contains("is-wrapped")).toBe(true)
  expect(s.find("Kopyala")).not.toBe(null)
})

// A plain block: no colour tokens (highlight={false}), no line numbers, no language label and no buttons; toolbar={false}
// removes the whole bar. A block with a known language does have colour tokens.
test("düz blok: renk, satır numarası, dil etiketi ve düğme yok; toolbar={false} çubuğu kaldırır", () => {
  const s = renderTest(() => <CodeViewLab />)
  expect(s.get(".lab-plain [class^='m-tok-']")).toBe(null)
  expect(s.get(".lab-plain .m-code-ln")).toBe(null)
  expect(s.get(".lab-plain .m-code-lang")).toBe(null)
  expect(s.all(".lab-plain button").length).toBe(0)
  expect(s.get(".lab-bare .m-code-bar")).toBe(null)
  expect(s.get(".lab-main .m-tok-kw")).not.toBe(null)
})
