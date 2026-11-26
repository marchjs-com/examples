// Tests for ComboboxLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <ComboboxLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.find(labelOrName) finds the real input by its label or accessible name; s.type(field, text) types into it like a
//   user and returns the element; s.click(textOrElement) clicks like a user; s.wait(fn) waits until fn returns true
//   (used for the debounced async search); s.text() is all visible text. Tests that type or click are async and
//   await them, so the view has updated before the next line runs.
// - The tests check what a user or a screen reader can observe (aria-expanded, value, disabled, readOnly, aria-invalid,
//   the printed summary) rather than internal state.
import { test, expect, renderTest } from "march/testing"
import { ComboboxLab } from "./ComboboxLab.tsx"

// Typing the start of a town name filters the static list, the list opens
// (aria-expanded), choosing a row sets the value and calls onSelect (the Lab prints both), and the input shows the label.
test("yazınca liste süzülür, seçilen satır değer olur ve onSelect çağrılır", async () => {
  const s = renderTest(() => <ComboboxLab />)
  const input = await s.type("İlçe", "beş") as HTMLInputElement
  expect(input.getAttribute("aria-expanded")).toBe("true")
  await s.click("Beşiktaş")
  expect(s.text().includes("İlçe: Beşiktaş · seçilen: Beşiktaş")).toBe(true)
  expect(input.value).toBe("Beşiktaş")
})

// The async example: `labelOf` gives a name ("Member #104") to a value that is not in any list yet; typing fewer letters
// than minChars shows the `labels.typeToSearch` text instead of searching; with enough letters the (debounced)
// search runs, and picking a row stores its value.
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

// With `multiple` the value is an array shown as chips; each chip has a remove button whose accessible name comes from
// labels.remove. Pressing it removes the value and calls onChange (the Lab counts), and the chip disappears.
test("çoklu seçimde chip'in kaldır düğmesi değeri diziden çıkarır ve onChange çağrılır", async () => {
  const s = renderTest(() => <ComboboxLab />)
  expect(s.text().includes("Beceriler: TypeScript, CSS · değişiklik: 0")).toBe(true)
  await s.click("CSS kaldır")
  expect(s.text().includes("Beceriler: TypeScript · değişiklik: 1")).toBe(true)
  expect(s.find("CSS kaldır")).toBe(null)
})

// States are exposed on the real input: disabled, readOnly (value kept), aria-invalid with aria-describedby pointing at
// the error text; name and class go where expected.
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
