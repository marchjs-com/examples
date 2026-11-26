// Tests for CodeInputLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <CodeInputLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type(label, text) types into the box with that accessible name; typing (or pasting) into the first box fills the
//   following ones. s.find(label) finds a box by its accessible name, s.get(selector) uses CSS, s.text() is all visible
//   text, s.click(...) clicks like a user and waits until the view has updated (so that test is async).
// - The tests check what a user or a screen reader can observe (values, ARIA attributes, element types) rather than
//   internal state.
import { test, expect, renderTest } from "march/testing"
import { CodeInputLab } from "./CodeInputLab.tsx"

// A code typed into the first box spreads over all boxes, and onComplete runs once with the full code.
test("ilk kutuya yapıştırılan kod bütün kutuları doldurur ve onComplete bir kez çağrılır", async () => {
  const s = renderTest(() => <CodeInputLab />)
  await s.type("Kod 1/6", "482915")
  expect(s.text().includes("Değer: 482915 · tamamlanan: 482915")).toBe(true)
  expect((s.find("Kod 6/6") as HTMLInputElement).value).toBe("5")
})

// pattern="alpha" drops the digits and turns the letters into capitals.
test("pattern: harf alanı rakamları atar ve büyük harfe çevirir", async () => {
  const s = renderTest(() => <CodeInputLab />)
  await s.type("Harf 1", "m4rch")
  expect(s.text().includes("Harfler: MRCH")).toBe(true)
})

// groups: a list or a number makes group separators, a text separator is drawn as given, and separator={false} draws none.
test("gruplar ve ayraç: sayı grup başına kutu; metin ayraç; separator={false} yalnız boşluk", () => {
  const s = renderTest(() => <CodeInputLab />)
  const inside = (root: string, sel: string) => s.get(root)!.querySelectorAll(sel)
  expect(inside(".lab-otp", ".m-otp-sep").length).toBe(1)
  // groups={4} on eight boxes: two groups, so one separator line
  expect(inside(".lab-alnum", ".m-otp-sep").length).toBe(1)
  expect(inside(".lab-dot", ".m-otp-sep-own")[0]?.textContent).toBe("•")
  expect(inside(".lab-nosep", ".m-otp-sep").length + inside(".lab-nosep", ".m-otp-sep-own").length).toBe(0)
})

// Accessibility and states: the group role and its links to the title and the hint, hidden digits for a mask, readonly, disabled and invalid.
test("erişilebilirlik ve durumlar: grup adı, gizli kutular, salt okunur, devre dışı, geçersiz", () => {
  const s = renderTest(() => <CodeInputLab />)
  const group = s.get(".lab-otp") as HTMLElement
  expect(group.getAttribute("role")).toBe("group")
  expect(group.getAttribute("aria-labelledby")).toBe("lab-otp-title")
  expect(group.getAttribute("aria-describedby")).toBe("lab-otp-hint")
  expect(s.find("PIN 1")?.getAttribute("type")).toBe("password")
  expect(s.find("Salt okunur 1")?.hasAttribute("readonly")).toBe(true)
  expect(s.find("Kilitli 4")?.hasAttribute("disabled")).toBe(true)
  expect(s.find("Hatalı 1")?.getAttribute("aria-invalid")).toBe("true")
})

// The older names still work: numeric={false} accepts letters, and masked as a function switches the boxes between hidden and shown.
test("eski adlar: numeric={false} harf kabul eder, masked işlevi düğmeyle açılır", async () => {
  const s = renderTest(() => <CodeInputLab />)
  expect((s.find("Eski 1") as HTMLInputElement).value).toBe("A")
  expect(s.find("Gizli 1")?.getAttribute("type")).toBe("password")
  await s.click("Göster")
  expect(s.find("Gizli 1")?.getAttribute("type")).toBe("text")
})
