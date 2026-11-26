// Tests for KeyValueEditorLab. They run in MarchIDE's Tests tab every time you save.
//
// How these tests are written (march/testing):
// - renderTest(() => <KeyValueEditorLab />) mounts the component in a fresh, isolated root and returns a handle `s`.
// - s.type("label", value) finds an input by its accessible name (aria-label, placeholder or label text), types into
//   it and waits for the view to update; given an element instead of a label it types into that element. It returns
//   the input, so a test can check attributes afterwards. s.click("text") clicks a button the same way.
// - s.find("text") looks an element up by visible text or aria-label; s.all("selector") returns every match of a CSS
//   selector and s.get("selector") the first one.
// - Every action awaits the view update, so the tests that act are async.
// - The tests check what a user or a screen reader can observe (the JSON shown in the CodeView, aria-invalid,
//   readonly) rather than internal state, so they keep passing when the component's internals change.
// To adapt them: copy one test, change the label or the expected JSON.
import { test, expect, renderTest } from "march/testing"
import { KeyValueEditorLab } from "./KeyValueEditorLab.tsx"

// The edited value shows in the CodeView labelled "Kota" (with line numbers), so the tests search its text for the JSON.
// With `numbers`, typing "3" into the first row's value stores the number 3 (no quotes), and onChange counted once.
test("numbers ile yazılan değer sayı olur, onChange sayar", async () => {
  const s = renderTest(() => <KeyValueEditorLab />)
  await s.type("Koltuk", "3")
  expect(s.find("Kota")?.textContent).toContain('{"free":3,"team":10}')
  expect(s.text().includes("Değişiklik: 1")).toBe(true)
})

// "Plan ekle" adds an empty row (three rows now). An empty key is skipped in the object, so the object only changes
// once both the name and the value are typed.
test("Plan ekle yeni bir satır açar; ad ve değer yazılınca nesneye girer", async () => {
  const s = renderTest(() => <KeyValueEditorLab />)
  await s.click("Plan ekle")
  const keys = s.all('input[aria-label="Plan"]')
  expect(keys.length).toBe(3)
  await s.type(keys[2]!, "pro")
  await s.type(s.all('input[aria-label="Koltuk"]')[2]!, "25")
  expect(s.find("Kota")?.textContent).toContain('{"free":1,"team":10,"pro":25}')
})

// Renaming the second row's key to an existing one is a duplicate: the row is marked invalid (aria-invalid and the
// "duplicate" message), and the object keeps only the first "free" (the second row is not in it).
test("yinelenen anahtar işaretlenir ve nesneye girmez", async () => {
  const s = renderTest(() => <KeyValueEditorLab />)
  const second = await s.type(s.all('input[aria-label="Plan"]')[1]!, "free")
  expect(s.text().includes("Bu plan zaten var")).toBe(true)
  expect(second.getAttribute("aria-invalid")).toBe("true")
  expect(s.find("Kota")?.textContent).toContain('{"free":1}')
})

// Four things in one test: the custom remove button works; without `numbers` the typed value stays a string ("100");
// readonly puts the readonly attribute on the field; labelledby points the group at the visible heading's id.
test("Planı sil satırı kaldırır; numbers olmadan değer metin kalır; salt okunurda düğme yok", async () => {
  const s = renderTest(() => <KeyValueEditorLab />)
  await s.click("Planı sil")
  expect(s.find("Kota")?.textContent).toContain('{"team":10}')
  await s.type("Başlık değeri", "100")
  expect(s.find("Başlıklar")?.textContent).toContain('{"Accept":"100"}')
  expect(s.find("Salt okunur anahtar")?.hasAttribute("readonly")).toBe(true)
  expect(s.get(".lab-plans")?.getAttribute("aria-labelledby")).toBe("lab-plans")
})
